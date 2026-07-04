import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { TablePagination, Typography,TableCellProps } from '@mui/material'
import { Box } from '@mui/system'
import { useAppSelector } from '../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import CCTableSkeleton from '../CCTableSkeleton'

interface CWTableProps {
  headings: string[]
  rows?: any[]
  maxWidth?: any
  pagination?: boolean
  tableSx?: any
  sx?: any
  loading?: boolean
  data?: boolean
}


interface CWTableCellProps extends TableCellProps{
  isLight?: boolean
} 

const StyledTableCell = styled(TableCell)<CWTableCellProps>(({theme, isLight}) => ({
  [`&.${tableCellClasses.head}`]: {
    background: isLight ? theme.palette?.bgColor3?.main:'linear-gradient(180deg, #111E17, #02362f)' ,
    padding: isLight ? 5:0,
    fontWeight: '600',
    color: isLight ? theme.palette.textColor?.main:'#E1E3E1' ,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    backgroundColor: theme?.palette?.bgColor?.main,
    color: theme.palette.textColor2?.main,
  },
}))

const StyledTableRow = styled(TableRow)(({theme}) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme?.palette?.bgColor2?.main,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 8,
  },
}))

const CWTable = (props: CWTableProps) => {
  const [rowsPerPage, setRowsPerPage] = useState<number>(3)
  const [page, setPage] = useState<number>(0)
  const [tableRowData, setTableRowData] = useState<any>()

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  useEffect(() => {
    if (props?.rows && props?.rows?.length) {
      if (!props?.pagination) {
        setTableRowData(props?.rows)
      } else if (props?.pagination) {
        setTableRowData(
          props?.rows.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
          )
        )
      }
    }
  }, [props?.rows, page, rowsPerPage])

  const onWebApp = useAppSelector(({ app }) => !app.throughIFrame, shallowEqual)

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ mt: 1, minWidth: 700, maxWidth: props.maxWidth, ...props.sx }}
      >
        {props.loading && <CCTableSkeleton height={16} items={3} sx={onWebApp ? null : {filter: 'grayscale(1) brightness(0.1)'}}/>}
     { !props.loading && <>
       <Table
          sx={{ minWidth: 700, maxWidth: props.maxWidth, ...props.tableSx }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow data-testid={'cc-table-heading'}>
              {props?.headings &&
                props?.headings?.length > 0 &&
                props?.headings?.map((heading, index) => (
                  <StyledTableCell key={index} align="center" isLight={onWebApp}>
                    {heading}
                  </StyledTableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRowData &&
              tableRowData?.length > 0 &&
              tableRowData.map((row: any, index: number) => (
                <StyledTableRow key={index} data-testid={'cc-table-row'}>
                  {row?.length > 0 &&
                    row.map((tdValue: any, tdIndex: number) => (
                      <StyledTableCell key={tdIndex} align="center">
                        {tdValue}
                      </StyledTableCell>
                    ))}
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
        <Box sx={{ borderBottom: '1px solid bgColor.main' }}></Box>
        {props?.pagination && props?.rows && (
          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={props?.rows.length}
            rowsPerPage={3}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              backgroundColor: 'bgColor.main',
              color: 'textColor2.main',
              border: 'none',
            }}
          />
        )}</>}
      </TableContainer>
    </>
  )
}
export default CWTable
