import { Box } from '@mui/material'
import React from 'react'
import { shallowEqual, useDispatch } from 'react-redux'
import isMobilePhone from 'validator/lib/isMobilePhone'
import CCInputField from '../../atoms/CCInputField'
import { useAppSelector } from '../../hooks/reduxHooks'
import { setUpdateUserPayload } from '../../redux/Slices/profileCompletionSlice'

interface IsssuerCompleteProfileProps {
  updateUser: any
}

const IsssuerCompleteProfile = () => {
  const dispatch = useDispatch()

  const updateUserPayload = useAppSelector(
    ({ profileCompletion }) => profileCompletion.updateUserPayload,
    shallowEqual
  )

  const handleChange = (e: any) => {
    const key = e.target.name
    const value = e.target.value
    const temp = { ...updateUserPayload }
    temp[key] = value
    dispatch(setUpdateUserPayload(temp))
  }

  return (
    <Box sx={{ mt: 2 }}>
      <CCInputField
        label="Participant Name"
        placeholder="Enter Participant Name"
        sx={{ mb: 1.5, zIndex: 20 }}
        value={updateUserPayload?.fullName}
        name="fullName"
        // onChange={(e) => setFullName(e.target.value)}
        onChange={handleChange}
        InputLabelProps={{
          style: { color: '#141D1B' },
        }}
      />

      <CCInputField
        label="Email ID"
        placeholder="Enter Email ID"
        sx={{ mb: 1.5, zIndex: 20 }}
        value={updateUserPayload?.email}
        name="email"
        // onChange={(e) => setEmail(e.target.value)}
        onChange={handleChange}
        disabled
        required={false}
        InputLabelProps={{
          style: { color: '#141D1B' },
        }}
      />
      <CCInputField
        label="Contact Number"
        placeholder="Enter Contact Number"
        sx={{ mb: 1.5, zIndex: 20 }}
        value={updateUserPayload?.phone}
        name="phone"
        onChange={(e) => {
          const telephone = e.target.value
          const regexp = /^[0-9\b]+$/
          if (telephone === '' || regexp.test(telephone)) {
            // setPhone(e.target.value)
            handleChange(e)
          }
        }}
        inputProps={{
          maxLength: 10,
        }}
        error={
          updateUserPayload?.phone &&
          !isMobilePhone(updateUserPayload?.phone?.toString(), 'en-IN')
        }
        helperText={
          updateUserPayload?.phone &&
          !isMobilePhone(updateUserPayload?.phone?.toString(), 'en-IN') &&
          'Enter valid Mobile Number'
        }
        InputLabelProps={{
          style: { color: '#141D1B' },
        }}
      />
      <CCInputField
        label="Organisation Name"
        placeholder="Enter Organisation Name"
        sx={{ mb: 1.5, zIndex: 20 }}
        value={updateUserPayload?.organisationName}
        name="organisationName"
        // onChange={(e) => setOrganisationName(e.target.value)}
        onChange={handleChange}
        InputLabelProps={{
          style: { color: '#141D1B' },
        }}
      />
      <CCInputField
        label="Headquarters"
        placeholder="Enter Headquarters"
        sx={{ mb: 1.5, zIndex: 20 }}
        value={updateUserPayload?.address}
        name="address"
        // onChange={(e) => setAddress(e.target.value)}
        onChange={handleChange}
        InputLabelProps={{
          style: { color: '#141D1B' },
        }}
      />
    </Box>
  )
}

export default IsssuerCompleteProfile
