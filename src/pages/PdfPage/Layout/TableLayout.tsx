import React from 'react'
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
  } from '@mui/material'

type TableLayoutProps = {
    tableHeaderRow:[]
    tableBodyRow:[]
}

function TableLayout({tableHeaderRow, tableBodyRow}:TableLayoutProps) {
  console.log("🚀 ~ file: TableLayout.tsx ~ line 19 ~ TableLayout ~ tableBodyRow", tableBodyRow)
  return (
    <TableContainer
            component={Paper}
            sx={{ boxShadow: 'none', border: '1px solid #C4C7C5', mb: 5 }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ background: '#DAF7F0' }}>
                <TableRow>
                    {tableHeaderRow.map((row:any, index:number)=>{
                        return  <TableCell key={index.toString()} className="table-header-cell">
                       {row}
                      </TableCell>
                    })

                    }
                  {/* <TableCell className="table-header-cell">
                    Party involved ((host) indicates a host Party)
                  </TableCell>
                  <TableCell className="table-header-cell">
                    Private and/or public entity(ies) project participants (as
                    applicable)
                  </TableCell>
                  <TableCell className="table-header-cell">
                    Indicate if the Party involved wishes to be considered as
                    project participant
                  </TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {data?.step3?.party_and_project_participants.map((row: any) => ( */}
                {tableBodyRow.map((row: any, index:number) => {
                    console.log("🚀 ~ file: TableLayout.tsx ~ line 50 ~ {tableBodyRow.map ~ row", row)
                    return (
                  <TableRow
                    key={index.toString()}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    {row.map((rowItem:any, index:number)=>{
                         console.log("🚀 ~ file: TableLayout.tsx ~ line 62 ~ {row.map ~ rowItem", rowItem)

                         return <TableCell key={index.toString()} className="table-body-cell">
                         {rowItem}
                       </TableCell>
                    })}
                    {/* <TableCell className="table-body-cell">
                      {row[0]}
                    </TableCell>
                    <TableCell className="table-body-cell">
                      {row[1]}
                    </TableCell>
                    <TableCell className="table-body-cell">
                      {row[2]}
                    </TableCell> */}
                  </TableRow>
                )})}
              </TableBody>
            </Table>
          </TableContainer>
  )
}

export default TableLayout