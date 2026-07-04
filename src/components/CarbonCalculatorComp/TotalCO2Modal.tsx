import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CCModalHeaderWithCloseIcon from '../../atoms/CCModalHeaderWithCloseIcon/CCModalHeaderWithCloseIcon'
import { useAppSelector } from '../../hooks/reduxHooks'
import CCButton from '../../atoms/CCButton'
import LoderOverlay from '../LoderOverlay'

const TotalCO2Modal = ({ loader, onClose, data, totalCo2 }: any) => {
  const selectedProjectType = useAppSelector(
    ({ carbonCreditCalculator }) => carbonCreditCalculator.selectedProjectType
  )

  return (
    <>
      <LoderOverlay show={loader} />
      <Box
        sx={{
          background: '#FFFFFF',
          width: '80%',
          height: '80%',
          mx: 'auto',
          mt: 5,
          borderRadius: 1,
          pt: 2,
          pb: 5,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CCModalHeaderWithCloseIcon
          // title={`Total CO2 Sequested for ${selectedProjectType?.value}  is ${
          //   totalCo2 || ''
          // }`}
          title={totalCo2}
          noOfYears={data?.length - 3}
          closeModal={onClose}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 4,
            maxHeight: '90%',
            overflowY: 'scroll',
          }}
        >
          <table
            style={{ borderCollapse: 'collapse', border: '1px solid #FFFFFF' }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: '#8BD3DC',
                  color: '#000000',
                }}
              >
                <th
                  style={{
                    padding: '10px 16px',
                    border: '1px solid #FFFFFF',
                    fontSize: '14px',
                    fontWeight: 500,
                    width: '250px',
                  }}
                >
                  Year
                </th>
                <th
                  style={{
                    padding: '10px 16px',
                    border: '1px solid #FFFFFF',
                    fontSize: '14px',
                    fontWeight: 500,
                  }}
                >
                  Estimated GHG emission <br /> reductions or removals (tCO2e)
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((row: any, rowIndex: number) => (
                <tr key={rowIndex} style={{ backgroundColor: '#E6F5F7' }}>
                  {row.map((cellValue: string, cellIndex: number) => (
                    <td
                      key={cellIndex}
                      style={{
                        padding: '8px 24px',
                        color: '#000000',
                        border: '1px solid #FFFFFF',
                        fontSize:
                          data?.length - 3 < rowIndex + 1 ? '14px' : '14px',
                        fontWeight: data?.length - 3 < rowIndex + 1 ? 600 : 400,
                        textAlign: 'center',
                      }}
                    >
                      {cellValue}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Box>
    </>
  )
}

export default TotalCO2Modal

// const ModalSkeleton = () => {
//     return (

//     )
// }
