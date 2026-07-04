import { TextareaAutosize } from '@mui/material'
import React from 'react'
import { CCTextareaProps } from './CCTextarea.interface'
const CCTextarea = (props: CCTextareaProps) => {
  return (
    <TextareaAutosize
      // aria-label="empty textarea"
      // placeholder="(Brief description of the installed technology and equipment, its purpose for installation)"
      style={{
        width: '100%',
        borderRadius: 4,
        border: '2px solid #1D4B44',
        padding: '8px',
      }}
      minRows={6}
      {...props}
    />
  )
}
export default CCTextarea
