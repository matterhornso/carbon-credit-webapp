import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { TablePagination, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { SliderTableProps } from './SliderTable.interface'

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#BCE2D2',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))
const TrimmedStyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#BCE2D2',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: 'left',
  },
  [`&.${tableCellClasses.root}`]: {},
}))

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#E1EEE8',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const SliderTable = (props: SliderTableProps) => {
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const [page, setPage] = useState<number>(0)
  const [tableRowData, setTableRowData] = useState<any>()

  const [showBorder, setShowBorder] = useState<boolean>(false)

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    if (
      event.currentTarget.scrollLeft < 474 &&
      event.currentTarget.scrollLeft >= 2
    ) {
      setShowBorder(true)
    } else if (event.currentTarget.scrollLeft < 2) {
      setShowBorder(false)
    }
  }

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

  return (
    <>
      <TableContainer
        onScroll={handleScroll}
        component={Paper}
        sx={{ mt: 1, minWidth: 700, maxWidth: props.maxWidth, ...props.sx }}
      >
        <Table
          sx={{ minWidth: 700, maxWidth: props.maxWidth, ...props.tableSx }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow data-testid={'cc-table-heading'}>
              {props?.headings &&
                props?.headings?.length > 0 &&
                props?.headings?.map((heading, index) => (
                  <StyledTableCell
                    sx={
                      index === 0
                        ? {
                            // minWidth: 150,
                            // position: 'sticky',
                            // top: 0,
                            // left: 0,
                            // zindex: 1999,
                            // background: '#CCE8E1',
                            // height: props.tileHeight,
                            // display: 'flex',
                            // justifyContent: 'center',
                            // alignItems: 'center',
                            // boxShadow: showBorder ? 5 : 0,
                            // overflow: 'hidden',
                            // textOverflow: 'ellipsis',
                            // whiteSpace: 'nowrap',
                          }
                        : {
                            maxHeight: props.tileHeight,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }
                    }
                    key={index}
                    align="center"
                  >
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
                  {/* {row?.length > 0 &&
                    row.map((tdValue: any, tdIndex: number) => (
                      <StyledTableCell
                        sx={
                          tdIndex === 0
                            ? {
                                minWidth: 150,
                                position: 'sticky',
                                top: 0,
                                left: 0,
                                zindex: 1999,
                                background:
                                  index % 2 === 0 ? '#E1EEE8' : '#FFF',
                                height: props.tileHeight,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxShadow: showBorder ? 5 : 0,
                              }
                            : { maxHeight: props.tileHeight }
                        }
                        key={tdIndex}
                        align="center"
                      >
                        {tdValue}
                      </StyledTableCell>
                    ))} */}

                  {row?.length > 0 &&
                    row.map((tdValue: any, tdIndex: number) => {
                      return typeof tdValue === 'string' &&
                        !tdValue.includes('/') ? (
                        <TrimmedStyledTableCell
                          // sx={
                          //   tdIndex === 0
                          //     ? {
                          //         minWidth: 150,
                          //         position: 'sticky',
                          //         top: 0,
                          //         left: 0,
                          //         zindex: 1999,
                          //         background:
                          //           index % 2 === 0 ? '#E1EEE8' : '#FFF',
                          //         height: props.tileHeight,
                          //         display: 'flex',
                          //         justifyContent: 'center',
                          //         alignItems: 'center',
                          //         boxShadow: showBorder ? 5 : 0,
                          //       }
                          //     : { maxHeight: props.tileHeight }
                          // }
                          key={tdIndex}
                          align="center"
                        >
                          <Tooltip title={tdValue}>
                            <Box
                              sx={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: '70px',
                              }}
                            >
                              {tdValue}
                            </Box>
                          </Tooltip>
                        </TrimmedStyledTableCell>
                      ) : (
                        <StyledTableCell
                          // sx={
                          //   tdIndex === 0
                          //     ? {
                          //         minWidth: 150,
                          //         position: 'sticky',
                          //         top: 0,
                          //         left: 0,
                          //         zindex: 1999,
                          //         background:
                          //           index % 2 === 0 ? '#E1EEE8' : '#FFF',
                          //         height: props.tileHeight,
                          //         display: 'flex',
                          //         justifyContent: 'center',
                          //         alignItems: 'center',
                          //         boxShadow: showBorder ? 5 : 0,
                          //       }
                          //     : { maxHeight: props.tileHeight }
                          // }
                          key={tdIndex}
                          align="center"
                        >
                          {tdValue}
                        </StyledTableCell>
                      )
                    })}
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
        <Box sx={{ borderBottom: '1px solid rgba(0, 0, 2, 0.3)' }}></Box>
        {props?.pagination && props?.rows && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            labelRowsPerPage={
              <Typography
                sx={{ color: '#1D4B44', fontSize: 12, fontWeight: 400 }}
              >
                Rows per page:
              </Typography>
            }
            component="div"
            count={props?.rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              '.MuiTablePagination-actions': {
                //next icons
                color: '1F1F1F',
              },
              '.MuiTablePagination-selectIcon': {
                //rows per page arrows
                color: '#1F1F1F',
                //<check />
              },
              '.MuiTablePagination-select': {
                //color of numbers in rows per page
                color: '#1D4B44',
              },
              '.MuiTablePagination-displayedRows': {
                color: '#1d4B44',
              },
            }}
          />
        )}
      </TableContainer>
    </>
  )
}
export default SliderTable
