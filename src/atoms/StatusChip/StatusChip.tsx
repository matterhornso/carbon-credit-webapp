import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { PROJECT_STATUS_FILTER } from '../../config/projectDraft.config'

const StatusChip: React.FC<{ projectStatus: number }> = ({ projectStatus }) => {
  const [statusObj, setStatusObj] = useState<any>({})

  const getStatusKey = () => {
    const getCurrentStatusArr = PROJECT_STATUS_FILTER.filter((i: any) => {
      return i.status.includes(projectStatus)
    })
    // const
    if (!getCurrentStatusArr.length) {
      setStatusObj({})
      return
    }
    const { backgroundColor, color, name } = getCurrentStatusArr[0]
    setStatusObj({
      statusName: name,
      backgroundColor,
      color,
    })
  }

  useEffect(() => {
    getStatusKey()
  }, [projectStatus])

  return (
    <Box
      sx={{
        borderRadius: '24px',
        p: '9px 24px',
        color: statusObj?.color,
        textAlign: 'center',
        backgroundColor: statusObj?.backgroundColor,
        fontSize: '14px',
        fontWeight: 700,
        whiteSpace: 'nowrap',
      }}
    >
      {statusObj?.statusName || '-'}
    </Box>
  )
}

export default StatusChip
