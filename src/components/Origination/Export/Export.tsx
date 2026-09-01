import React, { useEffect, useState } from 'react'
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { originationApi } from '../../../api/origination.api'
import { setCurrentProject } from '../../../redux/Slices/Origination/projectSlice'

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

// Note: this is a plain read-only rendering of the finalized case, not the
// VerraPDF-styled export the plan called for reusing (VerraPDF.tsx reads
// from the legacy draftPDDCompilationV2 Redux shape internally — wiring the
// new CaseDocument model into it needs its own pass, not attempted here to
// avoid shipping an unverified adaptation). Functionally complete for
// getting a case in front of Kosher Climate/FCF; visually plain by design.
const Export: React.FC = () => {
  const dispatch = useAppDispatch()
  const currentProject = useAppSelector((s) => s.originationProject.currentProject)
  const caseDocument = useAppSelector((s) => s.originationProject.caseDocument)

  const [coverNote, setCoverNote] = useState<string | null>(null)
  const [loadingNote, setLoadingNote] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const projectId = currentProject?._id
  const status = currentProject?.status

  useEffect(() => {
    if (!projectId || coverNote || loadingNote) return
    ;(async () => {
      setLoadingNote(true)
      try {
        const result = await originationApi.generateCoverNote({ projectId })
        setCoverNote(result?.data?.coverNote || null)
      } catch (err: any) {
        setError(err?.response?.data?.error || 'Could not generate the verifier cover note.')
      } finally {
        setLoadingNote(false)
      }
    })()
    // Deliberately excludes coverNote/loadingNote — they're read only to
    // guard against re-firing, not to trigger the effect.
  }, [projectId])

  const handleTransition = async (toStatus: string) => {
    if (!projectId) return
    setTransitioning(true)
    setError(null)
    try {
      const result = await originationApi.transition({ projectId, toStatus })
      dispatch(setCurrentProject(result?.data))
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Could not advance the project status.')
    } finally {
      setTransitioning(false)
    }
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Export
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          Verifier cover note
        </Typography>
        {loadingNote ? (
          <CircularProgress size={16} />
        ) : (
          <Typography variant="body2">{coverNote}</Typography>
        )}
      </Paper>

      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        {status === 'CASE_DRAFT_READY' && (
          <Button
            variant="contained"
            disabled={transitioning}
            onClick={() => handleTransition('ISSUER_FINALIZED')}
          >
            Finalize project
          </Button>
        )}
        {status === 'ISSUER_FINALIZED' && (
          <Button
            variant="contained"
            color="success"
            disabled={transitioning}
            onClick={() => handleTransition('EXPORTED_FOR_VERIFICATION')}
          >
            Export for verification
          </Button>
        )}
        {status === 'EXPORTED_FOR_VERIFICATION' && (
          <Alert severity="success">Exported and ready for the verifier (VVB).</Alert>
        )}
      </Stack>

      <Divider sx={{ mb: 3 }} />

      <Stack spacing={3}>
        {(caseDocument?.sections || []).map((section: any) => (
          <Box key={section.key}>
            <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
              {section.key.replace(/_/g, ' ')}
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
              {sectionText(section)}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}

export default Export
