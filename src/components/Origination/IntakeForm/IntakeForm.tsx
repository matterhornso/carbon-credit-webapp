import React, { useEffect, useState } from 'react'
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { methodologyApi } from '../../../api/methodology.api'
import { originationApi } from '../../../api/origination.api'
import { attachmentApi } from '../../../api/attachment.api'
import {
  setMethodologyList,
  setMethodologyLoading,
  setSelectedMethodology,
} from '../../../redux/Slices/Origination/methodologySlice'
import {
  setApplicability,
  setCurrentProject,
} from '../../../redux/Slices/Origination/projectSlice'

// Renders purely from Methodology.requiredInputs — this is the actual
// genericity acceptance test for the whole architecture. Adding a third
// methodology should never require a new field component here, only new
// seed data. If it does, the architecture isn't done.
interface IRequiredInput {
  key: string
  label: string
  dataType: string
  unit?: string
  required: boolean
  options?: string[]
  helpText?: string
}

interface IntakeFormProps {
  onIntakeSubmitted: () => void
}

const IntakeForm: React.FC<IntakeFormProps> = ({ onIntakeSubmitted }) => {
  const dispatch = useAppDispatch()
  const currentProject = useAppSelector(
    (state) => state.originationProject.currentProject
  )
  const methodologyList = useAppSelector(
    (state) => state.originationMethodology.list
  )
  const selectedMethodology = useAppSelector(
    (state) => state.originationMethodology.selected
  )
  const applicability = useAppSelector(
    (state) => state.originationProject.applicability
  )

  const [intake, setIntake] = useState<Record<string, any>>(
    currentProject?.intake || {}
  )
  const [uploadingKey, setUploadingKey] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)

  // getProjectById returns methodologyId POPULATED (the whole methodology
  // document); selectMethodology returns it as a bare id string. Normalise
  // both shapes — comparing a string id against a populated object silently
  // never matches, which previously left the form blank on any deep link or
  // page refresh.
  const rawMethodologyId: any = currentProject?.methodologyId
  const populatedMethodology =
    rawMethodologyId && typeof rawMethodologyId === 'object' ? rawMethodologyId : undefined
  const currentMethodologyId = populatedMethodology?._id ?? rawMethodologyId
  const methodologySelected = Boolean(currentMethodologyId)
  // A project loaded fresh (deep link, page refresh) has methodologyId on
  // currentProject but nothing in originationMethodology.selected yet — that
  // Redux slice is otherwise only populated by the in-session Select click.
  const needsSelectedMethodology =
    methodologySelected && selectedMethodology?._id !== currentMethodologyId

  useEffect(() => {
    if (!currentProject?.sector) return
    if (methodologySelected && !needsSelectedMethodology) return
    // When the project came back with its methodology already populated we
    // have everything the form needs — no second round-trip required.
    if (needsSelectedMethodology && populatedMethodology?.requiredInputs) {
      dispatch(setSelectedMethodology(populatedMethodology))
      return
    }
    let cancelled = false
    ;(async () => {
      try {
        dispatch(setMethodologyLoading(true))
        const result = await methodologyApi.list(currentProject.sector)
        const list = result?.data || []
        if (cancelled) return
        dispatch(setMethodologyList(list))
        if (needsSelectedMethodology) {
          const match = list.find((m: any) => m._id === currentMethodologyId)
          if (match) dispatch(setSelectedMethodology(match))
        }
      } catch (err: any) {
        if (!cancelled) {
          setLocalError(
            err?.response?.data?.error || 'Could not load methodologies for this sector.'
          )
        }
      } finally {
        if (!cancelled) dispatch(setMethodologyLoading(false))
      }
    })()
    return () => {
      cancelled = true
    }
  }, [
    currentProject?.sector,
    methodologySelected,
    needsSelectedMethodology,
    populatedMethodology,
    currentMethodologyId,
    dispatch,
  ])

  const handleSelectMethodology = async (methodologyId: string) => {
    if (!currentProject?._id) return
    setSubmitting(true)
    setLocalError(null)
    try {
      const result = await originationApi.selectMethodology({
        projectId: currentProject._id,
        methodologyId,
      })
      dispatch(setCurrentProject(result?.data))
      const chosen = methodologyList.find((m: any) => m._id === methodologyId)
      dispatch(setSelectedMethodology(chosen))
    } catch (err: any) {
      setLocalError(
        err?.response?.data?.error || 'Could not select that methodology.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  const handleFieldChange = (key: string, value: any) => {
    setIntake((prev) => ({ ...prev, [key]: value }))
  }

  const handleFileUpload = async (key: string, file: File) => {
    if (!currentProject?._id) return
    setUploadingKey(key)
    setLocalError(null)
    try {
      const result = await attachmentApi.upload(currentProject._id, file, [])
      const doc = result?.data
      if (doc?._warning) {
        setLocalError(doc._warning)
      }
      handleFieldChange(key, doc?._id || file.name)
    } catch (err: any) {
      setLocalError(err?.response?.data?.error || 'Upload failed.')
    } finally {
      setUploadingKey(null)
    }
  }

  const handleSubmitIntake = async () => {
    if (!currentProject?._id) return
    setSubmitting(true)
    setLocalError(null)
    try {
      const result = await originationApi.submitIntake({
        projectId: currentProject._id,
        intake,
      })
      dispatch(setCurrentProject(result?.data))
      const applicabilityResult = await originationApi.checkApplicability(
        currentProject._id
      )
      dispatch(setApplicability(applicabilityResult?.data))
      onIntakeSubmitted()
    } catch (err: any) {
      setLocalError(
        err?.response?.data?.error || 'Could not submit intake — check required fields.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  const renderField = (field: IRequiredInput) => {
    const value = intake[field.key] ?? ''
    const commonLabel = `${field.label}${field.unit ? ` (${field.unit})` : ''}`

    switch (field.dataType) {
      case 'boolean':
        return (
          <FormControlLabel
            key={field.key}
            control={
              <Checkbox
                checked={Boolean(value)}
                onChange={(e) => handleFieldChange(field.key, e.target.checked)}
              />
            }
            label={commonLabel}
          />
        )
      case 'select':
        return (
          <FormControl key={field.key} fullWidth size="small">
            <InputLabel>{commonLabel}</InputLabel>
            <Select
              value={value}
              label={commonLabel}
              onChange={(e) => handleFieldChange(field.key, e.target.value)}
            >
              {(field.options || []).map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )
      case 'multiselect': {
        // A multiselect with no seeded `options` is open-ended, not broken —
        // e.g. VM0047's "species planted", which can be any species and so has
        // no fixed list a global methodology could enumerate. Render those as
        // free-entry (type a value, press Enter) instead of an empty dropdown
        // the user could never satisfy. Both branches produce a string[].
        const selected: string[] = Array.isArray(value) ? value : []
        if (!field.options || field.options.length === 0) {
          return (
            <Autocomplete
              key={field.key}
              multiple
              freeSolo
              options={[] as string[]}
              value={selected}
              onChange={(_, next) => handleFieldChange(field.key, next)}
              renderTags={(tags: readonly string[], getTagProps) =>
                tags.map((tag: string, index: number) => (
                  <Chip size="small" label={tag} {...getTagProps({ index })} key={tag} />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  label={commonLabel}
                  helperText={field.helpText || 'Type a value and press Enter to add it.'}
                />
              )}
            />
          )
        }
        return (
          <FormControl key={field.key} fullWidth size="small">
            <InputLabel>{commonLabel}</InputLabel>
            <Select
              multiple
              value={selected}
              label={commonLabel}
              onChange={(e) => handleFieldChange(field.key, e.target.value)}
              renderValue={(picked: any) => (
                <Stack direction="row" spacing={0.5} flexWrap="wrap">
                  {picked.map((v: string) => (
                    <Chip key={v} label={v} size="small" />
                  ))}
                </Stack>
              )}
            >
              {field.options.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )
      }
      case 'file':
        return (
          <Box key={field.key}>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              {commonLabel}
              {field.required ? ' *' : ''}
            </Typography>
            <Button
              variant="outlined"
              component="label"
              size="small"
              disabled={uploadingKey === field.key}
              startIcon={
                uploadingKey === field.key ? (
                  <CircularProgress size={14} />
                ) : undefined
              }
            >
              {intake[field.key] ? 'Replace file' : 'Upload file'}
              <input
                type="file"
                hidden
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleFileUpload(field.key, file)
                }}
              />
            </Button>
            {intake[field.key] && (
              <Chip
                sx={{ ml: 1 }}
                size="small"
                color="success"
                label="Uploaded"
              />
            )}
          </Box>
        )
      case 'date':
        return (
          <TextField
            key={field.key}
            label={commonLabel}
            type="date"
            size="small"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={value}
            onChange={(e) => handleFieldChange(field.key, e.target.value)}
          />
        )
      case 'number':
        return (
          <TextField
            key={field.key}
            label={commonLabel}
            type="number"
            size="small"
            fullWidth
            value={value}
            helperText={field.helpText}
            onChange={(e) => handleFieldChange(field.key, e.target.value === '' ? '' : Number(e.target.value))}
          />
        )
      default:
        return (
          <TextField
            key={field.key}
            label={commonLabel}
            size="small"
            fullWidth
            value={value}
            helperText={field.helpText}
            onChange={(e) => handleFieldChange(field.key, e.target.value)}
          />
        )
    }
  }

  if (!methodologySelected) {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Choose a methodology
        </Typography>
        {localError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {localError}
          </Alert>
        )}
        <Stack spacing={2}>
          {methodologyList.length === 0 && (
            <Typography variant="body2" color="text.secondary">
              {`No methodologies available for sector "${currentProject?.sector}" yet.`}
            </Typography>
          )}
          {methodologyList.map((methodology: any) => (
            <Box
              key={methodology._id}
              sx={{
                border: '1px solid #e0e0e0',
                borderRadius: 1,
                p: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box>
                <Typography variant="subtitle1">{methodology.title}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {methodology.code} v{methodology.version} — {methodology.standard}
                </Typography>
              </Box>
              <Button
                variant="contained"
                disabled={submitting}
                onClick={() => handleSelectMethodology(methodology._id)}
              >
                Select
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
    )
  }

  const requiredInputs: IRequiredInput[] = selectedMethodology?.requiredInputs || []

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Project intake — {selectedMethodology?.title}
      </Typography>
      {localError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {localError}
        </Alert>
      )}
      {applicability && !applicability.eligible && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          One or more applicability conditions failed — see below after submitting.
        </Alert>
      )}
      <Stack spacing={2.5} sx={{ maxWidth: 480 }}>
        {requiredInputs.map(renderField)}
      </Stack>
      <Button
        variant="contained"
        sx={{ mt: 3 }}
        disabled={submitting}
        onClick={handleSubmitIntake}
        startIcon={submitting ? <CircularProgress size={16} /> : undefined}
      >
        Submit intake
      </Button>

      {applicability && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="subtitle1" gutterBottom>
            Applicability check
          </Typography>
          <Stack spacing={1}>
            {(applicability.results || []).map((r: any) => (
              <Alert
                key={r.key}
                severity={
                  r.result === 'pass'
                    ? 'success'
                    : r.result === 'fail'
                    ? 'error'
                    : 'info'
                }
              >
                {r.statement} — <strong>{r.result}</strong>
                {r.guidance ? ` (${r.guidance})` : ''}
              </Alert>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  )
}

export default IntakeForm
