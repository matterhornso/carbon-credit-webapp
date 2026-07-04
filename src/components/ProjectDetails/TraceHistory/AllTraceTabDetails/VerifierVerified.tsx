import { Box, Typography } from '@mui/material'
import moment from 'moment'
import React, { FC } from 'react'
import CCFileViewer from '../../../../atoms/CCFileViewer/CCFileViewer'
import { convertToInternationalCurrencySystem } from '../../../../utils/commonFunctions'
import TitleValue from './TitleValue'

interface VerifierVerifiedProps {
  tabData?: any
}

const VerifierVerified: FC<VerifierVerifiedProps> = (props) => {
  const { tabData } = props

  return (
    <>
      <TitleValue
        title="Date of Project verification report submit"
        value={moment(tabData?.createdAt).format(`DD/MM/YY`)}
      />
      <TitleValue
        title="Next Submission Date"
        value={moment(tabData?.data?.next_date).format(`DD/MM/YY`)}
      />
      <TitleValue
        title="Tokens for Month"
        value={moment(tabData?.data?.current_month).format('MMMM')}
      />
      <TitleValue
        bolder
        title="Number of VCOT authorised"
        value={
          convertToInternationalCurrencySystem(tabData?.data?.quantity) || '-'
        }
      />
      <TitleValue
        bolder
        title="Monthly Carbon Tokens"
        value={
          convertToInternationalCurrencySystem(
            tabData?.data?.monthly_carbon_tokens
          ) || '-'
        }
      />
      <TitleValue
        bolder
        title="Lifetime Carbon Tokens"
        value={
          convertToInternationalCurrencySystem(
            tabData?.data?.lifetime_carbon_tokens
          ) || '-'
        }
      />
      <TitleValue
        title="GHG Reduction Explanation"
        value={tabData?.data?.ghg_reduction_explanation}
        fullWidth
      />

      <Box sx={{ fontSize: 14, fontWeight: 500, px: 3 }}>
        <Typography
          sx={{
            color: '#006B5E',
            fontSize: 16,
            fontWeight: 500,
            mt: '20px',
          }}
        >
          {'Relevant docs'}
        </Typography>
        {tabData?.data?.file_attach &&
          tabData?.data?.file_attach.length > 0 &&
          tabData?.data?.file_attach.map((file: string, index: number) => (
            <CCFileViewer key={index} title={file} fileSize={0} />
          ))}
      </Box>
    </>
  )
}
export default VerifierVerified
