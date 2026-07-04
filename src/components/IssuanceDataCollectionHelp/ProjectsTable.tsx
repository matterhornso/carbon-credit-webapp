import { Box } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import CCTable from '../../atoms/CCTable'
import { useAppSelector } from '../../hooks/reduxHooks'
import { Colors, Images } from '../../theme'
import { data, headings } from './data'

const ProjectsTable = () => {
  const [rows, setRows] = useState<any>(null)

  const filteredRows = useAppSelector(
    ({ issuanceDataCollectionHelp }) => issuanceDataCollectionHelp.filteredRows,
    shallowEqual
  )

  useEffect(() => {
    if (filteredRows) makeRows()
  }, [filteredRows])

  const makeRows = () => {
    const rowsData = filteredRows.map((row: any, index: number) => {
      return [
        row?.ref,
        row?.title,
        row?.projectType,
        row?.country,
        <PdfTd key={index} pdfLoc={row?.pdfLoc} />,
        row?.methodology,
        row?.standard,
        row?.status,
      ]
    })
    setRows(rowsData)
  }
  return (
    <Box>
      <Box
        sx={{
          color: Colors.darkPrimary1,
          fontSize: 22,
          borderBottom: '1px solid #BFC9C6',
          px: 3,
          py: 2,
        }}
      >
        Projects
      </Box>
      <Box sx={{ px: 3, py: 2 }}>
        {rows && rows.length ? (
          <CCTable headings={headings} rows={rows} />
        ) : (
          <Box
            sx={{
              bgcolor: Colors.darkPrimary2,
              color: Colors.darkPrimary1,
              fontWeight: 500,
              fontSize: 16,
              p: 2,
              textAlign: 'center',
              borderRadius: '4px',
            }}
          >
            No row fulfils the searched terms
          </Box>
        )}
      </Box>
    </Box>
  )
}
export default ProjectsTable

interface PdfTdProps {
  pdfLoc?: string
}

const PdfTd: FC<PdfTdProps> = ({ pdfLoc }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <img
        src={Images.FileIcon}
        width="20px"
        height={'20px'}
        style={{ cursor: 'pointer' }}
      />
      <a
        href={pdfLoc}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: '#000',
          textDecoration: 'none',
          fontSize: 14,
          paddingLeft: 4,
          paddingRight: 4,
        }}
      >
        Monitoring Report
      </a>
      <img
        src={Images.OpenExternallyIcon}
        width="20px"
        height={'20px'}
        style={{ cursor: 'pointer' }}
      />
    </Box>
  )
}
