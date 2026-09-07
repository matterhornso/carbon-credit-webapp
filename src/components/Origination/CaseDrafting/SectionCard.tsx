import React, { useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Collapse,
  Divider,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

interface ICitation {
  claim: string
  source: 'source_document' | 'methodology_reference' | 'none'
  sourceDetail: string
  verified?: boolean
}

interface SectionCardProps {
  section: any
  focused: boolean
  generating: boolean
  onGenerate: () => void
  onRefine: (message: string) => void
  onFinalize: () => void
  onFocus: () => void
}

// Confidence signal: not a formal score, just enough to let a reviewer
// triage instead of reading every section linearly (accepted CEO-plan
// expansion #1). 'needs_review' beats false confidence — anything
// unverified or flagged surfaces as risk, never silently as green.
function computeConfidence(section: any): 'high' | 'medium' | 'needs_review' {
  const warnings = section.warnings || []
  const citations: ICitation[] = extractCitations(section)
  const hasUnverified = citations.some(
    (c) => c.source === 'source_document' && c.verified === false
  )
  if (
    section.status === 'not_started' ||
    section.status === 'ai_drafting' ||
    section.status === 'generation_failed'
  ) {
    return 'needs_review'
  }
  if (warnings.length > 0 || hasUnverified) return 'needs_review'
  if (section.status === 'finalized') return 'high'
  return 'medium'
}

// Citations live in different shapes depending on section content type
// (additionality: nested under tiers; baseline: under variables; generic
// structured / narrative: flat) — normalize for display.
function extractCitations(section: any): ICitation[] {
  const content = section.content
  if (!content) return []
  if (Array.isArray(content.tiers)) {
    return content.tiers.flatMap((t: any) => t.citations || [])
  }
  if (Array.isArray(content.variables)) {
    return content.variables.flatMap((v: any) => v.citations || [])
  }
  return content.citations || []
}

function sectionText(section: any): string {
  const content = section.content
  if (!content) return ''
  if (typeof content === 'string') return content
  if (typeof content.text === 'string') return content.text
  if (typeof content.narrative === 'string') return content.narrative
  if (typeof content.overallAssessment === 'string') return content.overallAssessment
  if (typeof content.summary === 'string') return content.summary
  return JSON.stringify(content, null, 2)
}

const CONFIDENCE_META = {
  high: { color: 'success' as const, icon: <CheckCircleIcon fontSize="small" />, label: 'Ready' },
  medium: { color: 'warning' as const, icon: <WarningAmberIcon fontSize="small" />, label: 'Review suggested' },
  needs_review: { color: 'error' as const, icon: <ErrorOutlineIcon fontSize="small" />, label: 'Needs review' },
}

const SectionCard: React.FC<SectionCardProps> = ({
  section,
  focused,
  generating,
  onGenerate,
  onRefine,
  onFinalize,
  onFocus,
}) => {
  const [expanded, setExpanded] = useState(false)
  const [refineMessage, setRefineMessage] = useState('')
  const [citationDetail, setCitationDetail] = useState<ICitation | null>(null)

  const confidence = computeConfidence(section)
  const meta = CONFIDENCE_META[confidence]
  const citations = extractCitations(section)
  const isNarrative = typeof section.content?.text === 'string' || section.status === 'not_started'

  return (
    <Box
      onClick={onFocus}
      sx={{
        border: '2px solid',
        borderColor: focused ? 'primary.main' : '#e0e0e0',
        borderRadius: 1,
        p: 2,
        mb: 2,
        cursor: 'pointer',
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
          {section.key.replace(/_/g, ' ')}
        </Typography>
        <Chip
          size="small"
          color={meta.color}
          icon={meta.icon}
          label={`${meta.label} · ${section.status}`}
        />
      </Stack>

      {section.lastError && (
        <Alert severity="error" sx={{ mt: 1 }}>
          Generation failed: {section.lastError}
        </Alert>
      )}

      {(section.warnings || []).length > 0 && (
        <Stack spacing={0.5} sx={{ mt: 1 }}>
          {section.warnings.map((w: string, i: number) => (
            <Alert key={i} severity="warning" sx={{ py: 0 }}>
              {w}
            </Alert>
          ))}
        </Stack>
      )}

      {section.status !== 'not_started' && section.content && (
        <Typography
          variant="body2"
          sx={{
            mt: 1,
            whiteSpace: 'pre-wrap',
            maxHeight: expanded ? 'none' : 96,
            overflow: 'hidden',
          }}
        >
          {sectionText(section)}
        </Typography>
      )}

      {sectionText(section).length > 200 && (
        <Button size="small" onClick={() => setExpanded((e) => !e)}>
          {expanded ? 'Show less' : 'Show more'}
        </Button>
      )}

      {citations.length > 0 && (
        <Stack direction="row" spacing={0.5} flexWrap="wrap" sx={{ mt: 1 }}>
          {citations.map((c, i) => (
            <Tooltip key={i} title="Explain why — click for the rule/source behind this claim">
              <Chip
                size="small"
                variant="outlined"
                color={c.source === 'source_document' && c.verified === false ? 'error' : 'default'}
                label={c.sourceDetail || c.source}
                onClick={(e) => {
                  e.stopPropagation()
                  setCitationDetail(c)
                }}
              />
            </Tooltip>
          ))}
        </Stack>
      )}

      <Collapse in={Boolean(citationDetail)}>
        {citationDetail && (
          <Alert
            severity="info"
            sx={{ mt: 1 }}
            onClose={() => setCitationDetail(null)}
          >
            <strong>{citationDetail.claim}</strong>
            <br />
            Source: {citationDetail.source} — {citationDetail.sourceDetail}
            {citationDetail.source === 'source_document' && (
              <>
                {' '}
                (
                {citationDetail.verified ? 'verified against uploaded document' : 'UNVERIFIED — could not confirm this excerpt was actually supplied'}
                )
              </>
            )}
          </Alert>
        )}
      </Collapse>

      <Divider sx={{ my: 1.5 }} />

      <Stack direction="row" spacing={1} alignItems="center">
        <Button
          size="small"
          variant={
            section.status === 'not_started' || section.status === 'generation_failed'
              ? 'contained'
              : 'outlined'
          }
          disabled={generating}
          startIcon={generating ? <CircularProgress size={14} /> : undefined}
          onClick={(e) => {
            e.stopPropagation()
            onGenerate()
          }}
        >
          {section.status === 'not_started'
            ? 'Generate (g)'
            : section.status === 'generation_failed'
            ? 'Retry (g)'
            : 'Regenerate (g)'}
        </Button>
        {section.status === 'draft_ready' && (
          <Button
            size="small"
            color="success"
            onClick={(e) => {
              e.stopPropagation()
              onFinalize()
            }}
          >
            Finalize (f)
          </Button>
        )}
      </Stack>

      {isNarrative && section.status === 'draft_ready' && (
        <Stack direction="row" spacing={1} sx={{ mt: 1 }} onClick={(e) => e.stopPropagation()}>
          <TextField
            size="small"
            fullWidth
            placeholder="Ask for a change — e.g. 'be more specific about the planting density'"
            value={refineMessage}
            onChange={(e) => setRefineMessage(e.target.value)}
          />
          <Button
            size="small"
            disabled={!refineMessage.trim() || generating}
            onClick={() => {
              onRefine(refineMessage)
              setRefineMessage('')
            }}
          >
            Refine
          </Button>
        </Stack>
      )}
    </Box>
  )
}

export default SectionCard
