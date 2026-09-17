import React, { useCallback, useEffect, useState } from 'react'
import { Alert, Box, Chip, CircularProgress, Collapse, Stack, Typography } from '@mui/material'
import { originationApi } from '../../../api/origination.api'

// Shows what a project still has to prove, before the money is spent proving
// it. The backend computes this from the methodology's own declarations rather
// than from a model, so it is fast, deterministic, and available the moment a
// methodology is chosen.

interface IGap {
  category: string
  severity: 'blocking' | 'required' | 'advisory'
  key: string
  summary: string
  whatToProvide: string
}

interface IReport {
  methodologyCode: string
  readyToGenerate: boolean
  counts: { blocking: number; required: number; advisory: number }
  gaps: IGap[]
}

// Deliberately not a traffic-light: "required" is not a warning to be dismissed,
// it is the difference between a case that passes validation and one that does
// not. Only "advisory" is soft.
const SEVERITY: Record<
  IGap['severity'],
  { label: string; color: 'error' | 'warning' | 'info'; blurb: string }
> = {
  blocking: { label: 'Blocking', color: 'error', blurb: 'Drafting cannot start until this is supplied.' },
  required: { label: 'Required', color: 'warning', blurb: 'The case is unlikely to survive validation without this.' },
  advisory: { label: 'Advisory', color: 'info', blurb: 'Worth having; its absence weakens the case.' },
}

const ORDER: IGap['severity'][] = ['blocking', 'required', 'advisory']

const EvidenceGaps = ({ projectId, refreshKey }: { projectId?: string; refreshKey?: number }) => {
  const [report, setReport] = useState<IReport | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const load = useCallback(async () => {
    if (!projectId) return
    setLoading(true)
    setError(null)
    try {
      const res = await originationApi.evidenceGaps(projectId)
      setReport(res?.data ?? null)
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Could not check what this project still needs.')
    } finally {
      setLoading(false)
    }
  }, [projectId])

  useEffect(() => {
    void load()
  }, [load, refreshKey])

  if (!projectId) return null

  if (loading && !report) {
    return (
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
        <CircularProgress size={16} />
        <Typography variant="body2" color="text.secondary">
          Checking what this project still needs…
        </Typography>
      </Stack>
    )
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    )
  }

  if (!report) return null

  const { counts } = report
  const total = counts.blocking + counts.required + counts.advisory

  return (
    <Box sx={{ border: '1px solid #e0e0e0', borderRadius: 1, p: 2, mb: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
        <Typography variant="subtitle1">Evidence still needed</Typography>
        <Stack direction="row" spacing={1}>
          {ORDER.filter((s) => counts[s] > 0).map((s) => (
            <Chip key={s} size="small" color={SEVERITY[s].color} label={`${counts[s]} ${SEVERITY[s].label.toLowerCase()}`} />
          ))}
        </Stack>
      </Stack>

      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
        {total === 0
          ? `Nothing outstanding against ${report.methodologyCode}.`
          : `Checked against ${report.methodologyCode}. ` +
            (report.readyToGenerate
              ? 'Drafting can start — the items below still need to be closed before submission.'
              : 'Drafting cannot start until the blocking items are supplied.')}
      </Typography>

      <Stack spacing={1}>
        {report.gaps.map((gap, i) => {
          const meta = SEVERITY[gap.severity]
          const id = `${gap.category}-${gap.key}-${i}`
          const open = !!expanded[id]
          return (
            <Box
              key={id}
              onClick={() => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))}
              sx={{
                p: 1.25,
                borderLeft: '3px solid',
                borderLeftColor: `${meta.color}.main`,
                backgroundColor: '#fafafa',
                cursor: 'pointer',
              }}
            >
              <Stack direction="row" spacing={1} alignItems="flex-start">
                <Chip size="small" color={meta.color} label={meta.label} sx={{ mt: 0.25 }} />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2">{gap.summary}</Typography>
                  <Collapse in={open}>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
                      {gap.whatToProvide}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                      {meta.blurb}
                    </Typography>
                  </Collapse>
                </Box>
              </Stack>
            </Box>
          )
        })}
      </Stack>
    </Box>
  )
}

export default EvidenceGaps
