import React from 'react'
import login_sign_illustration from '../../assets/Images/illustrations/login_signup_illustration.svg'
import tree_icon from '../../assets/Images/Icons/tree_icon.svg'
import leaf_icons from '../../assets/Images/Icons/leaf_icon.svg'
import { Box, Stack, Typography } from '@mui/material'

const LoginAndSignupSideInfo = () => {
  return (
    <Box sx={{position:'relative', height:'100%'}}>
        <Box sx={{p:'52px 30px 0px 74px'}}>
            <Typography sx={{color:'#FFFACA', fontWeight:700, fontSize:'48px'}}>Join us in achieving net-zero by 2050</Typography>
            <Typography sx={{color:'#D9FBFF', fontWeight:500, fontSize:'16px', pt:1}}>Unlock access to a powerful platform designed to monitor, offset, and report your organizations sustainability efforts.</Typography>
            <Typography sx={{textAlign:'left', color:'#FFFFFF', fontWeight:500, fontSize:'20px', pt:4, pb:3}}>What to expect:</Typography>
            <Box>{carbonServices.map((i:any, index:number) => (
              <Box key={index} sx={{width:'100%',display:'flex',justifyContent:'flex-start', alignItems:'start', columnGap:'2px' }}>
                <Box sx={{pt:'3px', pr:'4px'}}>
                 <img src={tree_icon} />
                </Box>
                <Box  sx={{fontWeight:500, fontSize:"16px", pb:2}}><span style={{color:'#FFFACA'}}>{`${i.serviceName} : `}</span>  <span style={{color:'#D9FBFF'}}>{i?.serviceDesc}</span></Box>
              </Box>
            ))}</Box>
            <Stack flexDirection={'row'} justifyContent={'flex-start'} columnGap={'4px'} sx={{pt:4}}>
              <Typography sx={{color:'#D9FBFF', fontWeight:500, fontSize:'18px'}}>Together lets create a Greener Future</Typography>
              <img src={leaf_icons} alt=''/>
            </Stack>
        </Box>
        <Box sx={{position:'absolute', bottom:0, left:'10%'}}>
            <img src={login_sign_illustration} alt={''}/>
        </Box>
    </Box>
  )
}

export default LoginAndSignupSideInfo

const carbonServices = [
  {serviceName:'Climat.Report', serviceDesc:'Automated sustainability reports as per GRI, TCFD, SASB, BRSR, CBAM with Climat AI.'},
  {serviceName:'Climat.Carbon Marketplace', serviceDesc:'Voluntary carbon credit marketplace'},
  {serviceName:'Climat.carbon', serviceDesc:'AI based simplified carbon credit origination.'}
]