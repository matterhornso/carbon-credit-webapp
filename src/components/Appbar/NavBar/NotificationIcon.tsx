// React Imports
import React, { FC, useState, useEffect } from 'react'

// MUI Imports
import { Box, Typography, Paper, IconButton, Badge, Modal } from '@mui/material'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'

// Functional Imports
import { NOTIFICATION } from '../../../api/notifications.api'
import { getLocalItem } from '../../../utils/Storage'

// Local Imports
import NotificationList from '../../../atoms/NotificationList'
import { Colors, Images } from '../../../theme'

interface NotificationIconProps {}

const NotificationIcon = (props: NotificationIconProps) => {
  const [showNotifications, setShowNotifications] = useState(false)
  const [notificationCount, setNotificationCount] = useState(0)

  useEffect(() => {
    // updateNotificationCount()
  }, [])

  const updateNotificationCount = () => {
    setInterval(() => {
      NOTIFICATION.getNotification(getLocalItem('userDetails')?.email).then(
        (response) => {
          let count: any = 0

          response.data?.data?.map((item: any) => {
            if (!item.inAppRead) {
              count++
            }
          })

          setNotificationCount(count)
        }
      )
    }, 10000)
  }

  return (
    <>
      <IconButton
        size="large"
        aria-label="show 17 new notifications"
        color="primary"
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <Badge
          badgeContent={notificationCount > 0 ? notificationCount : null}
          color="error"
        >
          {/* <NotificationsOutlinedIcon /> */}
          <img alt="bell_icon_chainflux" src={Images.bell} width="24px" height="24px"/>
        </Badge>
      </IconButton>

      {showNotifications && (
        <Modal
          open={showNotifications}
          onClose={() => setShowNotifications(false)}
          sx={{
            display: 'flex',
            flexDirection: 'row-reverse',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            // background: 'rgba(56, 142, 129, 0.4)',
            backgroundColor: Colors.white,
            marginLeft: '55%',
            mt: 8,
            width: '40%',
            height: '20%',
          }}
        >
          <NotificationList />
        </Modal>
      )}
    </>
  )
}

export default NotificationIcon
