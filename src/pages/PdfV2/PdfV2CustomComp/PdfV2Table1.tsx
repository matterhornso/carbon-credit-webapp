import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'
import Layout from '../Layout'

const PdfV2Table1 = () => {
  return (
    <Layout>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 'none',
          overflowX: 'hidden',
        }}
      >
        <Table sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              {tableHead?.map((th: string, index: number) => (
                <TableCell
                  key={`${index} + ${th}`}
                  sx={{
                    background: '#8BD3DC',
                    verticalAlign: 'top',
                    border: '2px solid #fff',
                    fontWeight: 600,
                    fontSize: '12px',
                  }}
                >
                  {th}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row: any, rowIdx: number) => (
              <TableRow key={`${row}+${rowIdx}`}>
                {row.map((cellData: any, cellIdx: number) => (
                  <TableCell
                    key={`${cellData} + ${cellIdx}`}
                    sx={{ background: '#E6F5F7', border: '2px solid #fff' }}
                  >
                    {cellData}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  )
}

export default PdfV2Table1

const tableData = [
  ['2020', '10', '7', '0', '0.0', '-7'],
  ['2021', '0', '7', '0', '0.0', '3'],
  ['2022', '0', '7', '0', '0.0', '3'],
  ['Total', '10', '21', '0', '0.0', '-1'],
]
const tableHead = [
  'Year',
  'Estimated project emissions or removals (tCO2e)',
  'Estimated baseline emissions or removals(tCO2e)',
  'Estimated leakage emissions(tCO2e)',
  'NonPermanence Risk Reduction (tCO2)',
  'Estimated net GHG emission reductions or removals (tCO2e)',
]
