import { Box } from '@mui/system'
import React, { FC } from 'react'
import TitleValue from './TitleValue'
import TransactionHash from './TransactionHash'

interface TokenDeployedProps {
  tabData?: any
  tokenAddress?: any
}

const TokenDeployed: FC<TokenDeployedProps> = (props) => {
  const { tabData, tokenAddress } = props

  return (
    <>
      {tabData?.transactionId ? (
        <TransactionHash txID={tabData?.transactionId} />
      ) : (
        ''
      )}
      <Box sx={{ px: 3, mt: 2, fontSize: 14, fontWeight: 500 }}>
        <Box sx={{ color: '#006B5E' }}>Token Address</Box>
        <Box
          sx={{
            wordBreak: 'break-all',
          }}
        >
          <a
            href={`${process.env.REACT_APP_BLOCKCHAIN_EXPLORER}address/${tokenAddress}`}
            target="_blank"
            rel="noreferrer"
            style={{ color: '#1A8EF5' }}
          >
            {tokenAddress}
          </a>
        </Box>
      </Box>
      <TitleValue title="Token Name" value={tabData?.data?._tokenName} />
      <TitleValue title="Token Symbol" value={tabData?.data?._tokenSymbol} />
      <TitleValue title="Token Type" value={tabData?.data?._tokenType} />
    </>
  )
}
export default TokenDeployed
