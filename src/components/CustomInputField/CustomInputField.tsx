import React, { useState, useRef } from 'react'
import { CustomInputFieldProps } from './CustomInputField.interface'
import './style.css'
import ClearIcon from '../../atoms/ClearIcon'
const CustomInputField: React.FC<CustomInputFieldProps<any>> = ({
  state: [value, setValue],
  labelName,
  requiredAsterisk,
  adornmentIcon,
  width,
  marginTop,
  type,
  error,
  name,
}) => {
  // console.log('error', error)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [hasError, setHasError] = useState(false)
  return (
    <div className="relative" style={{ marginTop }}>
      <input
        className={`input-cal input-base ${hasError ? 'invalid' : ''}`}
        id="input"
        placeholder=""
        type={type}
        value={value}
        ref={inputRef}
        onFocus={() => {
          setIsFocused(true)
        }}
        onBlur={(e) => {
          // Use setTimeout to delay the setting of isFocused to false
          setHasError(error(value))
          if (name === 'first-name') {
            console.log('error value', error(value), value)
          }
          setTimeout(() => {
            setIsFocused(false)
          }, 150)
        }}
        onChange={(e) => setValue(e.target.value)}
        required
        style={{ width: width }}
      />
      <label id="label-input">
        {/* First Name */}
        {labelName}
        {requiredAsterisk ? <span style={{ color: 'red' }}> * </span> : null}
      </label>
      {isFocused ? (
        <button
          className="adornment"
          style={{
            cursor: 'pointer',
            border: 'none',
            background: 'none',
          }}
          onClick={(e) => {
            e.stopPropagation()
            setValue('')
            // Programmatically refocus the input
            if (inputRef.current) {
              inputRef.current.focus()
            }
          }}
        >
          {adornmentIcon === 'clearIcon' ? <ClearIcon /> : null}
        </button>
      ) : null}
    </div>
  )
}

export default CustomInputField
