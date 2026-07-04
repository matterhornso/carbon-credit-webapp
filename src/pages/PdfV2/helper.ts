//import { pdfSectionNames } from './constants'

import { fileUploadCalls } from '../../api/fileUpload.api'
import {
  nestedSubSectionNames,
  pdfSectionNames,
  pdfSubSectionNames,
} from '../../config/pdf.config'

// Structuring API data.

export const makePdfDataFromApiData = async (
  draftPDDCompilation: any,
  apiData: any
) => {
  //apiData - apiData will be used to know whether user has completed draftPDDCompilation step
  // for sections not having any sub-sections
  const exemptedSectionNameList1 = [
    'baseline_scenario',
    'management_data_quality',
  ]
  // exempted list for few section as the data structure is different when compared to other sections
  // for sections not having any sub-sections but having multiple editors in the section
  const exemptedSectionNameList2 = ['project_boundary']

  const exempetedSectionNameList3 = ['quantification_GHG_emission_mitigations']

  // getDataFromBlocks is used to get data from editor block and restructure it.
  const getDataFromBlocks = async (blockData: any) => {
    if (blockData?.blocks?.length === 0 || !blockData) {
      return
    }

    const dataArr = await Promise.all(
      blockData?.blocks?.map(async (i: any) => {
        if (i?.type === 'image') {
          const dataURI = await imgToDataUri(i?.data?.file?.imgName)
          return {
            type: i?.type,
            data: dataURI,
            imgCaption: i?.data?.caption ? i?.data?.caption : '',
          }
        } else {
          return {
            type: i?.type,
            data:
              i?.type === 'paragraph'
                ? i?.data?.text
                : i?.type === 'checkbox'
                ? i?.data?.items
                : i?.type === 'table'
                ? i?.data?.content
                : i?.type === 'list' && {
                    ordered: i?.data?.style === 'unordered' ? false : true,
                    listData: i?.data?.items,
                  },
          }
        }
      })
    )
    const filteredData = dataArr.filter((i: any) => {
      if (i?.type === 'table') {
        return i?.data.length !== 0
      } else return i?.data
    })
    return filteredData
  }

  // getStrucuturedDataFromNestedSubSections is used to send take editor block array from nested editors in sub-section
  const getStrucuturedDataFromNestedSubSections = async (
    nestedSubSectionsObj: any,
    sectionName: any,
    subSectionName: any
  ) => {
    const nestedSubSections = Object.keys(
      pdfSubSectionNames[sectionName][subSectionName]
    )
    const nestedSubSectionData = await Promise.all(
      nestedSubSections?.map(async (i: any) => {
        //use this for implementing validations based on API data
        //if (!apiData?.[sectionName]?.[subSectionName]?.data?.[i]) {
        //  return
        //}
        return {
          nestedObj: true,
          inStepSubSectionTitle:
            pdfSubSectionNames[sectionName][subSectionName][i],
          value: await getDataFromBlocks(nestedSubSectionsObj[i]),
        }
      })
    )
    const filterEmptyFields = nestedSubSectionData?.filter((i: any) => {
      return i
    })
    return filterEmptyFields
  }

  // getStructuredDataFromSubSections is used to grab editor block for subsections having single editor in sub-section
  const getStructuredDataFromSubSections = async (
    subSectionData: any,
    sectionName: string
  ) => {
    const subSectionNames = Object.keys(pdfSubSectionNames[sectionName])
    const subSectionArr = await Promise.all(
      subSectionNames.map(async (i: any) => {
        //use this for implementing validations based on API data
        //if (!apiData?.[sectionName]?.[i] || i ===) {
        //  return
        //}
        return {
          subSectionTitle: !subSectionData[i]?.data?.blocks
            ? nestedSubSectionNames[i]
            : pdfSubSectionNames[sectionName][i],
          subSectionData: !subSectionData[i]?.data?.blocks
            ? await getStrucuturedDataFromNestedSubSections(
                subSectionData[i]?.data,
                sectionName,
                i
              )
            : await getDataFromBlocks(subSectionData[i]?.data),
        }
      })
    )

    return subSectionArr.filter((i: any) => {
      return i
    })
  }

  const getStrucuturedDataFromProjectBoundary = async (
    projectBoundaryObj: any,
    sectionName: string
  ) => {
    const apiKeysOfProjectBoundary = Object.keys(
      pdfSubSectionNames[sectionName]
    )
    const projectBoundaryStructuredData = await Promise.all(
      apiKeysOfProjectBoundary.map(async (i: any) => {
        return {
          nestedObj: true,
          inStepSubSectionTitle: '',
          value: await getDataFromBlocks(projectBoundaryObj[i]),
        }
      })
    )
    return [
      {
        subSectionTitle: '',
        subSectionData: projectBoundaryStructuredData,
      },
    ]
  }

  const getStructuredDataFromSectionEight = async (
    sectionEightData: any,
    sectionName: string
  ) => {
    const sectionEightKeys = Object.keys(pdfSubSectionNames[sectionName])
    const sectionEightStructuredData = await Promise.all(
      sectionEightKeys?.map(async (i: any) => {
        if (i === 'criteria_and_procedures_quantification') {
          const sectionEightPointOne = Object.keys(
            pdfSubSectionNames[sectionName][i]
          )
          const eightPointOneStructuredData = await Promise.all(
            sectionEightPointOne?.map(async (item: any) => {
              return {
                subSectionTitle: pdfSubSectionNames[sectionName][i][item],
                subSectionData: await getDataFromBlocks(
                  sectionEightData[i][item]?.data
                ),
              }
            })
          )
          return eightPointOneStructuredData
        } else {
          return {
            subSectionTitle: !sectionEightData[i]?.data?.blocks
              ? nestedSubSectionNames[i]
              : pdfSubSectionNames[sectionName][i],
            subSectionData: !sectionEightData[i]?.data?.blocks
              ? await getStrucuturedDataFromNestedSubSections(
                  sectionEightData[i]?.data,
                  sectionName,
                  i
                )
              : await getDataFromBlocks(sectionEightData[i]?.data),
          }
        }
      })
    )
    return sectionEightStructuredData.flat()
  }

  const sectionNames = Object.keys(pdfSectionNames)
  const pdfData = await Promise.all(
    sectionNames.map(async (sectionName: string) => {
      //use this for implementing validations based on API data
      //if (!apiData?.[sectionName]) {
      //  return
      //}
      if (exemptedSectionNameList1.includes(sectionName)) {
        return {
          sectionTitle: pdfSectionNames[sectionName],
          subSections: [
            {
              subSectionTitle: '',
              subSectionData: await getDataFromBlocks(
                draftPDDCompilation[sectionName]?.data
              ),
            },
          ],
        }
      } else if (exemptedSectionNameList2.includes(sectionName)) {
        return {
          sectionTitle: pdfSectionNames[sectionName],
          subSections: await getStrucuturedDataFromProjectBoundary(
            draftPDDCompilation[sectionName]?.data,
            sectionName
          ),
        }
      } else if (exempetedSectionNameList3.includes(sectionName)) {
        return {
          sectionTitle: pdfSectionNames[sectionName],
          subSections: await getStructuredDataFromSectionEight(
            draftPDDCompilation[sectionName],
            sectionName
          ),
        }
      } else
        return {
          sectionTitle: pdfSectionNames[sectionName],
          subSections: await getStructuredDataFromSubSections(
            draftPDDCompilation[sectionName],
            sectionName
          ),
        }
    })
  )
  return pdfData.filter((i: any) => {
    return i
  })
}

// convert remote image to data URI for pdfMake package
export const imgToDataUri = async (imageUrl: any) => {
  try {
    const res = await fileUploadCalls.getFile(imageUrl)

    // Create an object URL from the Blob
    URL.createObjectURL(res)

    // Create a new FileReader
    return new Promise((resolve) => {
      const reader = new FileReader()

      // Set up the event listener for when the FileReader has finished reading the Blob
      reader.onloadend = () => {
        // The result property of the FileReader contains the data URI
        const dataURI = reader.result
        resolve(dataURI)
      }

      // Read the Blob as a data URI
      reader.readAsDataURL(res)
    })
  } catch (e) {
    console.log(e)
  }
}

// convert local image to data uri
export const convertImageToDataURIFromLocalImages = (imagePath: any) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'Anonymous' // Enable cross-origin requests if needed (e.g., for CORS-restricted images)

    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx: any = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, img.width, img.height)
      const dataURI = canvas.toDataURL()
      resolve(dataURI)
    }

    img.onerror = (event) => {
      reject(event)
    }

    img.src = imagePath
  })
}

export const calculateDots = (text: any) => {
  const availableWidth = 440
  const fontSize = 10

  const alignment: any = 'left'
  const canvas: any = document.createElement('canvas')
  const ctx: any = canvas.getContext('2d')
  ctx.font = `${fontSize}px Poppins`
  const textWidth = ctx.measureText(text).width
  const dotsWidth = ctx.measureText('.').width
  const spaceWidth = ctx.measureText(' ').width
  const alignmentOffset =
    alignment === 'left' ? 0 : (availableWidth - textWidth) % fontSize
  const remainingSpace = availableWidth - (textWidth + alignmentOffset)

  let dotsCount = Math.floor(remainingSpace / dotsWidth)
  if (dotsCount < 1) dotsCount = 1

  const totalWidthNeeded = textWidth + dotsCount * dotsWidth
  const spaceAvailable = availableWidth - totalWidthNeeded

  let dots = ''
  if (alignment === 'right') {
    const spacesCount = Math.floor(spaceAvailable / spaceWidth)
    dots = ' '.repeat(spacesCount) + '.'.repeat(dotsCount)
  } else {
    dots = '.'.repeat(dotsCount)
  }

  return dots
}
