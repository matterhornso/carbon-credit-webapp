import { omit } from 'lodash'
import React, { useState } from 'react'

// type Props = {
//     callback: any
// }

type IValues = {
  [key: string]: any
}

//Errors
type IErrors = {
  [key: string]: any
}

const useForm = (callback: any) => {
  //Form values
  const [values, setValues] = useState<IValues>({})
  const [errors, setErrors] = useState<IErrors>({})

  //A method to handle form inputs
  const handleChange = (event: any) => {
    //To stop default events

    event.persist()

    const name = event.target.name
    const val = event.target.value

    validate(event, name, val)
    //Let's set these values in state

    setValues({
      ...values,
      [name]: val,
    })
  }

  const resetField = (fieldName: any) => {
    setValues({
      ...values,
      [fieldName]: '',
    })
  }

  const handleSubmit = (event: any) => {
    if (event) event.preventDefault()
    // if (Object.keys(errors).length === 0 && Object.keys(values).length !== 0) {
    callback()
    // } else {
    // alert('There is an Error!')
    // }
  }

  const validate = (event: any, name: any, value: any) => {
    //A function to validate each input values

    let newObj: any
    switch (name) {
      case 'email':
        if (
          !new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ).test(value)
        ) {
          setErrors({
            ...errors,
            email: 'Enter a valid email address',
          })
        } else {
          newObj = omit(errors, 'email')
          setErrors(newObj)
        }
        break

      case 'password':
        if (
          !new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(value)
        ) {
          setErrors({
            ...errors,
            password:
              'Password should contains atleast 8 charaters and containing uppercase,lowercase and numbers',
          })
        } else {
          newObj = omit(errors, 'password')
          setErrors(newObj)
        }
        break

      default:
        setErrors({
          ...errors,
        })
        break
    }
  }
  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    resetField,
  }
}

export default useForm
