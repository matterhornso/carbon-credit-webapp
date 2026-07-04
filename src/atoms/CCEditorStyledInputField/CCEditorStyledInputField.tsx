import React from 'react'

interface CCEditorStyledInputFieldProps {
  value: any
  onChange: any
  placeholder: string
}

const CCEditorStyledInputField = ({
  value,
  onChange,
}: CCEditorStyledInputFieldProps) => {
  return (
    <input
      placeholder="Type Your Answer Here..."
      value={value}
      onChange={onChange}
      style={{
        padding: '5px',
        paddingBottom: '15px',
        outline: 'none',
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        borderBottom: '1px solid #B6BDBE',
        width: '100%',
        fontSize: '36px',
        fontWeight: 400,
        color: '#01717F99',
        marginLeft: '10px',
      }}
    />
  )
}

export default CCEditorStyledInputField
