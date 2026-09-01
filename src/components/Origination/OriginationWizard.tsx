import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  MenuItem,
  Paper,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { originationApi } from '../../api/origination.api'
import { setCurrentProject } from '../../redux/Slices/Origination/projectSlice'
import IntakeForm from './IntakeForm/IntakeForm'
import CaseDrafting from './CaseDrafting/CaseDrafting'
import Review from './Review/Review'
import Export from './Export/Export'

// Available sectors are whatever Methodology documents actually exist for —
// this list is a starting-point convenience for the create-project form,
// not a source of truth (the methodology picker in IntakeForm queries by
// sector and shows only what's real).
const SECTORS = [
  { value: 'AFOLU', label: 'AFOLU (afforestation / reforestation / revegetation)' },
  { value: 'ENERGY', label: 'Energy (grid-connected renewables)' },
]

type WizardStep = 'intake' | 'drafting' | 'review' | 'export'

function deriveStep(status: string | undefined, reviewApproved: boolean): WizardStep {
  if (!status) return 'intake'
  if (['DRAFT_INTAKE', 'METHODOLOGY_SELECTED'].includes(status)) {
    return 'intake'
  }
  // INPUTS_SUBMITTED groups with drafting, not intake — generation itself
  // drives INPUTS_SUBMITTED -> CASE_GENERATING (GenerationService.
  // ensureGeneratingStatus), so the drafting screen's Generate button has to
  // be reachable *before* that transition happens, not after.
  if (['INPUTS_SUBMITTED', 'CASE_GENERATING', 'CASE_DRAFT_READY'].includes(status)) {
    return reviewApproved ? 'review' : 'drafting'
  }
  return 'export' // ISSUER_FINALIZED, EXPORTED_FOR_VERIFICATION, and beyond
}

const STEP_LABELS: Record<WizardStep, string> = {
  intake: 'Intake',
  drafting: 'Case drafting',
  review: 'Review',
  export: 'Export',
}

const OriginationWizard: React.FC = () => {
  const dispatch = useAppDispatch()
  const params = useParams<{ projectId?: string }>()
  const currentProject = useAppSelector((s) => s.originationProject.currentProject)

  const [reviewApproved, setReviewApproved] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [newName, setNewName] = useState('')
  const [newSector, setNewSector] = useState(SECTORS[0].value)

  useEffect(() => {
    const idToLoad = params.projectId
    if (!idToLoad || currentProject) return
    ;(async () => {
      setLoading(true)
      try {
        const result = await originationApi.getProjectById(idToLoad)
        dispatch(setCurrentProject(result?.data))
      } catch (err: any) {
        setError(err?.response?.data?.error || 'Could not load project.')
      } finally {
        setLoading(false)
      }
    })()
    // Deliberately excludes currentProject/dispatch — currentProject is
    // read only as a guard against re-fetching an already-loaded project.
  }, [params.projectId])

  const handleCreateProject = async () => {
    if (!newName.trim()) return
    setLoading(true)
    setError(null)
    try {
      const result = await originationApi.createProject({
        name: newName.trim(),
        sector: newSector,
      })
      dispatch(setCurrentProject(result?.data))
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Could not create project.')
    } finally {
      setLoading(false)
    }
  }

  if (!currentProject) {
    return (
      <Paper sx={{ p: 4, maxWidth: 480 }}>
        <Typography variant="h6" gutterBottom>
          Start a new project
        </Typography>
        {error && (
          <Typography variant="body2" color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Project name"
            size="small"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <Select
            size="small"
            value={newSector}
            onChange={(e) => setNewSector(e.target.value)}
          >
            {SECTORS.map((s) => (
              <MenuItem key={s.value} value={s.value}>
                {s.label}
              </MenuItem>
            ))}
          </Select>
          <Button
            variant="contained"
            disabled={loading || !newName.trim()}
            onClick={handleCreateProject}
          >
            Create project
          </Button>
        </Box>
      </Paper>
    )
  }

  const step = deriveStep(currentProject.status, reviewApproved)

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {currentProject.name}
      </Typography>

      <Stepper activeStep={Object.keys(STEP_LABELS).indexOf(step)} sx={{ mb: 4 }}>
        {Object.values(STEP_LABELS).map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {step === 'intake' && (
        <IntakeForm onIntakeSubmitted={() => {/* status flips to INPUTS_SUBMITTED; wizard re-derives on next currentProject update */}} />
      )}
      {step === 'drafting' && (
        <CaseDrafting onAllSectionsFinalized={() => setReviewApproved(true)} />
      )}
      {step === 'review' && (
        <Box>
          <Review />
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button variant="outlined" onClick={() => setReviewApproved(false)}>
              Back to drafting
            </Button>
            <Button
              variant="contained"
              disabled={loading}
              onClick={async () => {
                // The lifecycle state machine only allows single-step hops
                // (CASE_GENERATING -> CASE_DRAFT_READY -> ISSUER_FINALIZED).
                // generateAllSections auto-advances to CASE_DRAFT_READY, but
                // per-section Generate clicks don't — so status here could
                // be either. Walk whichever hops are needed so this button
                // reliably lands on ISSUER_FINALIZED (outside deriveStep's
                // drafting/review bucket) in one click either way.
                setLoading(true)
                setError(null)
                try {
                  let status = currentProject.status
                  let latest = currentProject
                  if (status === 'CASE_GENERATING') {
                    const r = await originationApi.transition({
                      projectId: currentProject._id,
                      toStatus: 'CASE_DRAFT_READY',
                    })
                    latest = r?.data
                    status = latest?.status
                  }
                  if (status === 'CASE_DRAFT_READY') {
                    const r = await originationApi.transition({
                      projectId: currentProject._id,
                      toStatus: 'ISSUER_FINALIZED',
                    })
                    latest = r?.data
                  }
                  dispatch(setCurrentProject(latest))
                } catch (err: any) {
                  setError(err?.response?.data?.error || 'Could not finalize the project.')
                } finally {
                  setLoading(false)
                }
              }}
            >
              Continue to export
            </Button>
          </Box>
        </Box>
      )}
      {step === 'export' && <Export />}
    </Box>
  )
}

export default OriginationWizard
