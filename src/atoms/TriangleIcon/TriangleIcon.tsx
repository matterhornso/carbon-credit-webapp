import React from 'react'
import { TriangleIconProps } from './TriangleIcon.interface'
const TriangleIcon = (props: TriangleIconProps) => {
  return (
    <svg
      width="22"
      height="16"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      data-testid="triangle-icon"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 0L14 12H0L7 0Z"
        fill="#001F25"
      />
    </svg>
  )
}
export default TriangleIcon
