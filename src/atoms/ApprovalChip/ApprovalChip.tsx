// React Imports
import React, { FC } from 'react'

// MUI Imports
import { Chip } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'
import { Colors } from '../../theme'
import {Colors2} from '../../theme'

interface ApprovalChipProps {
  variant?: any
}

const ApprovalChip: FC<ApprovalChipProps> = (props) => {
  if (props.variant === 'Rejected') {
    return (
      <ApprovalChipTemplate
        title={'Rejected'}
        backgroundColor={Colors.darkRedBackground}
        // tintColor={'#FFF'}
        textColor={'#FFF'}
      />
    )
  } else if (props.variant === 'Approved') {
    return (
      <ApprovalChipTemplate
        title={'Approved'}
        backgroundColor={Colors2.SuccessContainer}
        // tintColor={Colors.lightBlueBackground2}
        textColor={Colors2.Success}
        height={'40px'}
        width={'120px'}
        padding={'9px 24px'}
      />
    )
  } else if (props.variant === 'Verified') {
    return (
      <ApprovalChipTemplate
        title={'Verified'}
        backgroundColor={Colors2.SuccessContainer}
        // tintColor={Colors.lightBlueBackground2}
        textColor={Colors2.Success}
        height={'40px'}
        width={'120px'}
        padding={'9px 24px'}
      />
    )
  } else if (props.variant === 'Finalised') {
    return (
      <ApprovalChipTemplate
        title={'Finalised'}
        backgroundColor={Colors.lightCyanBackground}
        // tintColor={Colors.lightBlueBackground2}
        textColor={'#000'}
      />
    )
  } else if (props.variant === 'In progress') {
    return (
      <ApprovalChipTemplate
        title={'In progress'}
        backgroundColor={Colors2.WarningContainer}
        // tintColor={Colors.darkOrangeBackground}
        textColor={Colors2.Warning}
        height={'40px'}
        width={'210px'}
        padding={'9px 24px'}
      />
    )
  } else if (props.variant === 'Pending') {
    return (
      <ApprovalChipTemplate
      title={'Pending'}
      backgroundColor={Colors2.WarningContainer}
      // tintColor={Colors.darkOrangeBackground}
      textColor={Colors2.Warning}
      height={'40px'}
      width={'210px'}
      padding={'9px 24px'}
      />
    )
  } else if (props.variant === 'Selected') {
    return (
      <ApprovalChipTemplate
        title={'Selected'}
        backgroundColor={Colors.lightCyanBackground}
        // tintColor={Colors.lightBlueBackground2}
        textColor={'#000'}
      />
    )
  } else if (props.variant === 'Yet to Select') {
    return (
      <ApprovalChipTemplate
        title={'Yet to Select'}
        backgroundColor={Colors.lightGreyBackground}
        // tintColor={Colors.mediumGreyBackground}
        textColor={'#000'}
      />
    )
  } else {
    return null
  }
}

export default ApprovalChip

interface ApprovalChipTemplateProps {
  title?: any
  backgroundColor?: any
  // tintColor?: any
  textColor?: any
  height?:any
  width?:any
  padding?:any
}

const ApprovalChipTemplate: FC<ApprovalChipTemplateProps> = (props) => {
  return (
    <Chip
      sx={{
        backgroundColor: props.backgroundColor,
        color: props.textColor,
        fontWeight: 700,
        fontSize: 14,
        width:props.width,
        height:props.height,
        padding:props.height
      }}
      // icon={<CircleIcon 
      //   style={{ color: props.tintColor, height:"8px",width:"8px"  }} 
      //   />}
      label={props.title}
    />
  )
}
