// React Imports
import React, { FC, useEffect, useState } from 'react'

// MUI Imports
import { Grid, Box, Typography, Paper, Divider } from '@mui/material'
import { Colors } from '../../theme'
import CircleIcon from '@mui/icons-material/Circle'
import ScheduleIcon from '@mui/icons-material/Schedule'
import NotificationTile from './NotificationTile'
import { NOTIFICATION } from '../../api/notifications.api'
import Spinner from '../Spinner'
import { getLocalItem } from '../../utils/Storage'
import NoData from '../NoData/NoData'

// Local Imports

interface NotificationListProps {}

const NotificationList: FC<NotificationListProps> = (props) => {
  const [loading, setLoading] = useState(false)
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    setLoading(true)

    NOTIFICATION.getNotification(getLocalItem('userDetails')?.email).then(
      (response) => {
        setLoading(false)
        setNotifications(response.data?.data)
      }
    )
  }, [])

  return (
    <Paper
      sx={{
        // position: 'absolute',
        // left: -240,
        // top: -30,
        width: '100%',
        // mt: 10,
      }}
    >
      <Typography sx={{ fontSize: 18, fontWeight: 400, p: 2 }}>
        Notifications
      </Typography>
      <Divider />

      <Box sx={{ width: '100%', maxHeight: '440px', overflow: 'scroll' }}>
        {loading && (
          <Box
            sx={{
              mt: 12,
              mb: 12,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
            }}
          >
            <Spinner />
          </Box>
        )}

        {!loading &&
          notifications.map((item: any, index: number) => (
            <NotificationTile
              key={index}
              status={item.extra_data?.action}
              title={'XYZ accepted the project for verification'}
              time={item.createdAt}
              read={item.inAppRead}
              id={item.id}
            />
          ))}

        {!loading && notifications.length === 0 && (
          <Box
            sx={{
              mt: 12,
              mb: 12,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
            }}
          >
            No Notifications
          </Box>
        )}
      </Box>
    </Paper>
  )
}

export default NotificationList
