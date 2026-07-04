import millify from 'millify'
import { fileUploadCalls } from '../api/fileUpload.api'
import { STATUSWISE_TEXT } from '../config/constants.config'
import { getLocalItem } from './Storage'

export const deleteIndexInArray = (array: Array<any>, index: number) => {
  const modifiedArray = array.filter((item: any, i: number) => i !== index)

  return modifiedArray
}

export const stringExtractor = (array: any[], fieldName: string) => {
  const modifiedArray = array.map((item) => {
    if (typeof item === 'string') {
      return item
    } else {
      return item[fieldName]
    }
  })

  return modifiedArray
}

export const limitTitle = (title: string, limit: number) => {
  const newTitle: Array<any> = []
  if (title?.length > limit) {
    title.split('').reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur)
      }
      return acc + cur.length
    }, 0)

    // return the result
    return `${newTitle.join('')}...`
  }
  return title
}

export const capitaliseFirstLetter = (sentence: string) => {
  const words = sentence.split(' ')

  const capitaliseSentence = words
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1)
    })
    .join(' ')
  return capitaliseSentence
}

export const limitTitleFromMiddle = (title: string) => {
  if (title?.length) {
    return title.substring(0, 6) + '...' + title.substring(title.length - 6)
  }
  return title
}

export const downloadFile = async (fileName: any) => {
  const File = await fileUploadCalls.getFile(
    fileName,
    getLocalItem('userDetails')?.jwtToken
  )
  const objectURL = URL.createObjectURL(File)

  const link = document.createElement('a')
  link.href = objectURL
  link.setAttribute('download', fileName)

  // Append to html link element page
  document.body.appendChild(link)

  // Start download
  link.click()

  // Clean up and remove the link
  link?.parentNode?.removeChild(link)
}

export const getUrlVars = (url: string) => {
  const urlVarObj: any = {}
  const queryParams: any = new URLSearchParams(location?.search)
  for (const [key, value] of queryParams) {
    urlVarObj[key] = value
  }
  return urlVarObj
}

export const roundUp = (value: number, places = 2) => {
  if (value) {
    return Math.round(Number(value) * 10 ** places) / 10 ** places
  }
}

export const convertToInternationalCurrencySystem = (value: number) => {
  // 12 Zeroes and higher
  // return Math.abs(Number(value)) >= 1.0e12
  //   ? Number(value).toExponential()
  //   : //Nine Zeores for Billions
  //   Math.abs(Number(value)) >= 1.0e9
  //   ? (Math.abs(Number(value)) / 1.0e9).toFixed(2) + 'B'
  //   : // Six Zeroes for Millions
  //   Math.abs(Number(value)) >= 1.0e6
  //   ? (Math.abs(Number(value)) / 1.0e6).toFixed(2) + 'M'
  //   : // : // Three Zeroes for Thousands
  //     // Math.abs(Number(value)) >= 1.0e3
  //     // ? (Math.abs(Number(value)) / 1.0e3).toFixed(2) + 'K'
  //     Math.abs(Number(value))

  //Display Million or Billion if value > 999999
  if (value) {
    return Math.abs(Number(value)) >= 1.0e12
      ? Number(value).toExponential()
      : //Nine Zeores for Billions
      Math.abs(Number(value)) >= 1.0e9
      ? Math.round((Math.abs(Number(value)) / 1.0e9) * 100) / 100 + 'B'
      : // Six Zeroes for Millions
      Math.abs(Number(value)) >= 1.0e6
      ? Math.round((Math.abs(Number(value)) / 1.0e6) * 100) / 100 + 'M'
      : // : // Three Zeroes for Thousands
        // Math.abs(Number(value)) >= 1.0e3
        // ? (Math.abs(Number(value)) / 1.0e3)+ 'K'
        Math.abs(Number(value))
  } else {
    return 0
  }
}

export const formatNumberMinify = (value: number, precision = 3) => {
  const max = Math.min(value, Number.MAX_SAFE_INTEGER)
  const min = Math.max(max, Number.MIN_SAFE_INTEGER)
  const safeInt = Math.round(min)
  // console.log(
  //   'file: commonFunctions.ts ~ line 94 ~ formatNumberMinify ~ value',
  //   value
  // )
  const val = millify(Number(safeInt), {
    precision: precision,
    // lowercase: true
  })
  // console.log(
  //   ':rocket: ~ file: commonFunctions.ts ~ line 98 ~ formatNumberMinify ~ val',
  //   val
  // )
  return val
}

export function downloadText(text: string, downloadFileName = 'file.txt') {
  // const fileData = JSON.stringify(p);
  const blob = new Blob([text], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.download = downloadFileName
  link.href = url
  link.click()
}

export const downloadPdfFile = async (fileName: any) => {
  const File = await fileUploadCalls.getPdfFile(
    fileName,
    getLocalItem('userDetails')?.jwtToken
  )
  const objectURL = URL.createObjectURL(File)

  const link = document.createElement('a')
  link.href = objectURL
  link.setAttribute('download', fileName)

  // Append to html link element page
  document.body.appendChild(link)

  // Start download
  link.click()

  // Clean up and remove the link
  link?.parentNode?.removeChild(link)
}

export function randomIntFromInterval(min = 10000, max= 900000000) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const getTextAccordingToStatus = (projectStatus: number) => {
  const status = STATUSWISE_TEXT[projectStatus]
  return status || '-'
}

export const getInitialLetter = (name: string) => {
  let initialLetter = ''
  if (name.length) {
    initialLetter = name?.slice(0, 1).toUpperCase()
  }
  return initialLetter
}
