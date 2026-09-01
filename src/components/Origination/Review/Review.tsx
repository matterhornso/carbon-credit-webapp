import React from 'react'
import { Box, Chip, Divider, Stack, Typography } from '@mui/material'
import { useAppSelector } from '../../../hooks/reduxHooks'

function sectionText(section: any): string {
  const content = section.content
  if (!content) return '(not generated)'
  if (typeof content === 'string') return content
  if (typeof content.text === 'string') return content.text
  if (typeof content.narrative === 'string') return content.narrative
  if (typeof content.overallAssessment === 'string') return content.overallAssessment
  if (typeof content.summary === 'string') return content.summary
  return JSON.stringify(content, null, 2)
}

// Read-through of every section before the ISSUER commits to finalizing the
// project — a last linear pass, distinct from CaseDrafting's per-section
// triage view.
const Review: React.FC = () => {
  const caseDocument = useAppSelector((s) => s.originationProject.caseDocument)
  const sections = caseDocument?.sections || []

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Review — full case
      </Typography>
      <Stack spacing={3}>
        {sections.map((section: any) => (
          <Box key={section.key}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
                {section.key.replace(/_/g, ' ')}
              </Typography>
              <Chip
                size="small"
                color={section.status === 'finalized' ? 'success' : 'warning'}
                label={section.status}
              />
            </Stack>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', mt: 0.5 }}>
              {sectionText(section)}
            </Typography>
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </Stack>
    </Box>
  )
}

export default Review
