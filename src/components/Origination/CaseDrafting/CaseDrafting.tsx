import React, { useCallback, useEffect, useState } from 'react'
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { originationApi } from '../../../api/origination.api'
import { attachmentApi } from '../../../api/attachment.api'
import {
  setCaseDocument,
  setGeneratingSectionKey,
  setSourceDocuments,
} from '../../../redux/Slices/Origination/projectSlice'
import SectionCard from './SectionCard'

interface CaseDraftingProps {
  onAllSectionsFinalized: () => void
}

// Priority order matters for what the user sees first — additionality and
// baseline_scenario are the sections Kosher Climate/FCF specifically named
// as expensive/outsourced (see design doc). List them first regardless of
// the methodology's own sectionGuidance order.
const PRIORITY_SECTIONS = ['additionality', 'baseline_scenario']

const CaseDrafting: React.FC<CaseDraftingProps> = ({ onAllSectionsFinalized }) => {
  const dispatch = useAppDispatch()
  const currentProject = useAppSelector((s) => s.originationProject.currentProject)
  const caseDocument = useAppSelector((s) => s.originationProject.caseDocument)
  const sourceDocuments = useAppSelector((s) => s.originationProject.sourceDocuments)
  const generatingSectionKey = useAppSelector((s) => s.originationProject.generatingSectionKey)

  const [focusedIndex, setFocusedIndex] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [generatingAll, setGeneratingAll] = useState(false)

  const projectId = currentProject?._id

  const refresh = useCallback(async () => {
    if (!projectId) return
    const [caseDocResult, sourceDocsResult] = await Promise.all([
      originationApi.getCaseDocument(projectId),
      attachmentApi.listByProject(projectId),
    ])
    dispatch(setCaseDocument(caseDocResult?.data))
    dispatch(setSourceDocuments(sourceDocsResult?.data || []))
  }, [projectId, dispatch])

  useEffect(() => {
    refresh()
  }, [refresh])

  const orderedSections = React.useMemo(() => {
    const sections = caseDocument?.sections || []
    const priority = sections.filter((s: any) => PRIORITY_SECTIONS.includes(s.key))
    const rest = sections.filter((s: any) => !PRIORITY_SECTIONS.includes(s.key))
    return [...priority, ...rest]
  }, [caseDocument])

  const handleGenerate = useCallback(
    async (sectionKey: string) => {
      if (!projectId) return
      setError(null)
      dispatch(setGeneratingSectionKey(sectionKey))
      try {
        const result = await originationApi.generateSection({ projectId, sectionKey })
        dispatch(setCaseDocument(result?.data))
      } catch (err: any) {
        setError(err?.response?.data?.error || `Could not generate '${sectionKey}'.`)
      } finally {
        dispatch(setGeneratingSectionKey(null))
      }
    },
    [projectId, dispatch]
  )

  const handleRefine = useCallback(
    async (sectionKey: string, message: string) => {
      if (!projectId) return
      setError(null)
      dispatch(setGeneratingSectionKey(sectionKey))
      try {
        const result = await originationApi.refineSection({ projectId, sectionKey, message })
        dispatch(setCaseDocument(result?.data))
      } catch (err: any) {
        setError(err?.response?.data?.error || `Could not refine '${sectionKey}'.`)
      } finally {
        dispatch(setGeneratingSectionKey(null))
      }
    },
    [projectId, dispatch]
  )

  const handleFinalize = useCallback(
    async (sectionKey: string) => {
      if (!projectId) return
      const section = (caseDocument?.sections || []).find((s: any) => s.key === sectionKey)
      setError(null)
      try {
        const result = await originationApi.updateSection({
          projectId,
          sectionKey,
          content: section?.content,
          status: 'finalized',
        })
        dispatch(setCaseDocument(result?.data))
      } catch (err: any) {
        setError(err?.response?.data?.error || `Could not finalize '${sectionKey}'.`)
      }
    },
    [projectId, caseDocument, dispatch]
  )

  // onlyMissing resumes a partially failed run: the backend skips sections that
  // already produced content, so retrying after a rate limit costs only the
  // sections still outstanding rather than the whole case again.
  const handleGenerateAll = async (onlyMissing = false) => {
    if (!projectId) return
    setGeneratingAll(true)
    setError(null)
    try {
      const result = await originationApi.generateAll({ projectId, onlyMissing })
      dispatch(setCaseDocument(result?.data))
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Could not generate the full case.')
    } finally {
      setGeneratingAll(false)
    }
  }

  // Keyboard-driven review (accepted CEO-plan expansion #2): arrow keys move
  // focus between sections, g generates/regenerates the focused one, f
  // finalizes it. Disabled while typing in any input/textarea so shortcuts
  // never eat a keystroke meant for the refine box.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (target && ['INPUT', 'TEXTAREA'].includes(target.tagName)) return
      if (orderedSections.length === 0) return

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setFocusedIndex((i) => Math.min(i + 1, orderedSections.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setFocusedIndex((i) => Math.max(i - 1, 0))
      } else if (e.key === 'g') {
        const section = orderedSections[focusedIndex]
        if (section) handleGenerate(section.key)
      } else if (e.key === 'f') {
        const section = orderedSections[focusedIndex]
        if (section?.status === 'draft_ready') handleFinalize(section.key)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [orderedSections, focusedIndex, handleGenerate, handleFinalize])

  const allFinalized =
    orderedSections.length > 0 &&
    orderedSections.every((s: any) => s.status === 'finalized')

  // A run can now complete partially, so the page has to be able to say which
  // sections did not make it rather than silently looking finished.
  const failedSections = orderedSections.filter(
    (s: any) => s.status === 'generation_failed' || s.lastError
  )

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h6">Case drafting</Typography>
        <Button
          variant="contained"
          disabled={generatingAll}
          startIcon={generatingAll ? <CircularProgress size={16} /> : undefined}
          onClick={() => handleGenerateAll(false)}
        >
          Generate full case
        </Button>
      </Stack>

      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
        {sourceDocuments.length} source document{sourceDocuments.length === 1 ? '' : 's'} uploaded ·
        keyboard: ↑/↓ to move, g to generate, f to finalize
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {failedSections.length > 0 && (
        <Alert
          severity="warning"
          sx={{ mb: 2 }}
          action={
            <Button
              size="small"
              disabled={generatingAll}
              onClick={() => handleGenerateAll(true)}
            >
              Retry {failedSections.length}
            </Button>
          }
        >
          {failedSections.length} section{failedSections.length === 1 ? '' : 's'} did not
          generate: {failedSections.map((s: any) => s.key.replace(/_/g, ' ')).join(', ')}.
          Retrying regenerates only these.
        </Alert>
      )}

      {orderedSections.map((section: any, index: number) => (
        <SectionCard
          key={section.key}
          section={section}
          focused={index === focusedIndex}
          generating={generatingSectionKey === section.key || generatingAll}
          onFocus={() => setFocusedIndex(index)}
          onGenerate={() => handleGenerate(section.key)}
          onRefine={(message) => handleRefine(section.key, message)}
          onFinalize={() => handleFinalize(section.key)}
        />
      ))}

      {allFinalized && (
        <Button variant="contained" color="success" sx={{ mt: 2 }} onClick={onAllSectionsFinalized}>
          All sections finalized — continue to review
        </Button>
      )}
    </Box>
  )
}

export default CaseDrafting
