import React from 'react'
import { LogoProps } from './Logo.interface'
import { Images } from '../../theme'
import { useNavigate } from 'react-router-dom'
import { pathNames } from '../../routes/pathNames'
import './style.css'

const Logo = ({ width = 159.45 }: LogoProps) => {
  const navigate = useNavigate()
  return (
    <img
      data-testid="logo-img"
      className="logoImage"
      // src={Images.logo}
      src={Images.ClimatIconRevised}
      style={{ width }}
      onClick={() => navigate(pathNames.DASHBOARD)}
    />
  )
}
export default Logo
