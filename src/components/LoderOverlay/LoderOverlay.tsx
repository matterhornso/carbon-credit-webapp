import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import Spinner from '../../atoms/Spinner'
import { LoderOverlayProps } from './LoderOverlay.interface'
const LoderOverlay = (props: LoderOverlayProps) => {
  const {show = true} = props
  console.log("🚀 ~ file: LoderOverlay.tsx ~ line 7 ~ LoderOverlay ~ show", show)
  // document.body.style.overflow = 'hidden';
  useEffect(()=>{
   show?lockScroll():unlockScroll()
   return ()=> unlockScroll();
  },[show])

  const lockScroll = React.useCallback(() => {
    document.body.style.overflow = 'hidden';
  }, [])
  
  const unlockScroll = React.useCallback(() => {
    document.body.style.overflow = '';
  }, [])

  return show ?(
    <Box
      sx={{
        backgroundColor: 'rgb(218 247 240 / 0.5)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100000,
        overflow: 'hidden'
      }}
    >
      
      <Spinner />
    </Box>
  ): null
}
export default LoderOverlay
