// React Imports
import React, { FC } from 'react'

// MUI Imports
import { Grid, Box, Typography } from '@mui/material'

// Local Imports
import CCTable from '../../atoms/CCTable'
import { Colors } from '../../theme'

interface DocumentationListProps {}

const DocumentationList: FC<DocumentationListProps> = (props) => {
  return <CCTable headings={headings} rows={rows} maxWidth={'100%'} />
}

export default DocumentationList

const rowItem = [
  'Issuance',
  'Issuance',
  '17 July, 2021',
  <Typography
    key={1}
    sx={{
      fontSize: 16,
      fontWeight: 600,
      textDecoration: 'underline',
      color: Colors.textColorLightGreen,
    }}
  >
    View
  </Typography>,
]

const rows = [
  rowItem,
  rowItem,
  rowItem,
  rowItem,
]

const headings = [
  'Document Name',
  'Document Type',
  'Date of Upload',
  'Documents',
]
