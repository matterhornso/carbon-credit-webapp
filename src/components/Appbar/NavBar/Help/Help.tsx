import { Button, Menu, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import HelpContent from './HelpContent'
import { useLocation } from 'react-router-dom'
import { pathNames } from '../../../../routes/pathNames'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import { setShowPopUp } from '../../../../redux/Slices/issuanceDataCollection'
import HelpPopUp from './HelpPopUp'
import { DashboardHelpSectionFAQ } from './SectionA/helpContentData'
import { Images } from '../../../../theme'

const Help = () => {
  const location = useLocation()
  const dispatch: any = useAppDispatch()
  const showPopUp = useAppSelector(
    ({ issuanceDataCollection }) => issuanceDataCollection.showPopUp,
    shallowEqual
  )

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (item: any) => {
    // if (location.pathname === pathNames.ISSUANCE_DATA_COLLECTION)
    //   setAnchorEl(event.currentTarget)
    dispatch(setShowPopUp(item))
  }

  const handleClose = () => {
    dispatch(setShowPopUp(false))
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: { xs: 'none', md: 'flex' },
      }}
    >
      <Button
        color="primary"
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          display: 'flex',
          textTransform: 'none',
        }}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={() => handleClick(true)}
      >
        <img alt="help_icon_chainflux" src={Images.help} width="24px" height="24px"/>
        <Typography sx={{ mx: 1, fontWeight: 700, fontSize:14 }}>Help</Typography>
      </Button>
      {showPopUp && (
        <HelpPopUp
          modal={showPopUp}
          setModal={(item: any) => handleClick(item)}
          data={DashboardHelpSectionFAQ}
          dashboardVisible={true}
        />
      )}
    </Box>
  )
}

export default Help
