import React from 'react'
import moment from 'moment'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'

const MAX_PAGE_HEIGHT = 1123
const HEADER_HEIGHT = 63,
  FOOTER_HEIGHT = 164,
  CHARS_PER_LINE = 104 - 11,
  CHAR_LINE_HEIGHT = 23

const PAGE_HEIGHT = MAX_PAGE_HEIGHT - (HEADER_HEIGHT + FOOTER_HEIGHT) // max page height for inner content

// const MAX_CHARS_PER_PAGE = Math.floor((PAGE_HEIGHT / (CHAR_LINE_HEIGHT)) * CHARS_PER_LINE) // max chars per page
let MAX_CHARS_PER_PAGE = 2880 // max chars per page
console.log(
  '🚀 ~ file: PdfSectionMaker.util.ts ~ line 8 ~ MAX_CHARS_PER_PAGE',
  MAX_CHARS_PER_PAGE
)

const IMAGE_HEIGHT = 400 + 23,
  IMAGE_CHAR_COUNT = (IMAGE_HEIGHT / CHAR_LINE_HEIGHT) * CHARS_PER_LINE

const TABLE_ROW_HEIGHT = 54,
  TABLE_HEADER_HEIGHT = 105 + 30,
  TABLE_HEADER_CHAR_COUNT = (TABLE_HEADER_HEIGHT / 16) * CHARS_PER_LINE,
  TABLE_ROW_CHAR_COUNT = (TABLE_ROW_HEIGHT / 16) * CHARS_PER_LINE

export const sectionFormatter = (sections: any) => {
  console.log(
    '🚀 ~ file: PdfSectionMaker.util.ts ~ line 16 ~ sectionFormatter ~ section',
    sections
  )
  // let CPCC = 0 // current page character count
  let formattedSection: any = [...sections]
  formattedSection = sections.map((section: any) => {
    return {
      ...section,
      subSections: subSectionsFormatter(section.subSections),
    }
  })

  console.log(
    '🚀 ~ file: PdfSectionMaker.util.ts ~ line 19 ~ sectionFormatter ~ formattedSection',
    formattedSection
  )
  return formattedSection
}

const subSectionsFormatter = (data: any) => {
  console.log(
    '🚀 ~ file: PdfSectionMaker.util.ts ~ line 33 ~ subSectionsFormatter ~ data',
    data
  )
  // ** [subSections] ->[{ [details]}]-> {content, title}

  const subSections = [...data] //subsections array
  console.log(
    '🚀 ~ file: PdfSectionMaker.util.ts ~ line 36 ~ subSectionsFormatter ~ subSections',
    subSections
  )

  for (let i = 0; i < subSections.length; i++) {
    const detailsArr = subSections[i].details
    if (detailsArr?.length) {
      let CPCC = 0 //! current page character count
      for (let j = 0; j < detailsArr.length; j++) {
        const content = detailsArr[j].content || ''

        // MAX_PAGE_HEIGHT = !subSections[i].ignoreTitle ? MAX_PAGE_HEIGHT - (37+26) :MAX_PAGE_HEIGHT
        // MAX_PAGE_HEIGHT = !detailsArr[j].ignoreTitle ? MAX_PAGE_HEIGHT- 8 : MAX_PAGE_HEIGHT
        // MAX_PAGE_HEIGHT = i == 0? MAX_PAGE_HEIGHT - 88 : MAX_PAGE_HEIGHT
        // MAX_PAGE_HEIGHT -= 16
        // MAX_CHARS_PER_PAGE = Math.floor((PAGE_HEIGHT / (CHAR_LINE_HEIGHT)) * CHARS_PER_LINE)
        // MAX_CHARS_PER_PAGE = (i == 0) ? MAX_CHARS_PER_PAGE :( Math.floor((PAGE_HEIGHT / (CHAR_LINE_HEIGHT)) * CHARS_PER_LINE))

        //calculate max chars per page A/T first page of subsection or not
        MAX_CHARS_PER_PAGE =
          ((i == 0 ? PAGE_HEIGHT - 88 : PAGE_HEIGHT) / CHAR_LINE_HEIGHT) *
          CHARS_PER_LINE

        // calculate max chars per page A/T ignoreTitle
        // if true then 0
        // else use 46+16 = height+padding+margin of title element
        MAX_CHARS_PER_PAGE +=
          (detailsArr[j].ignoreTitle
            ? 0
            : Math.floor((46 + 16) / CHAR_LINE_HEIGHT) * CHARS_PER_LINE) +
          (detailsArr[j].title?.length || 0)

        //rounding off to nearest integer
        MAX_CHARS_PER_PAGE = Math.floor(MAX_CHARS_PER_PAGE)

        let CICC = 0 //! current item character count

        // adding padding and margin to CICC
        CICC += Math.floor((16 + 8) / CHAR_LINE_HEIGHT) * CHARS_PER_LINE

        if (!detailsArr[j].comp) {
          CICC += content && !detailsArr[j].comp ? content?.length : 0
        } else if (detailsArr[j].comp && detailsArr[j].comp == 'table') {
          CICC += TABLE_HEADER_CHAR_COUNT
          CICC += content?.tableBodyRow?.length * TABLE_ROW_CHAR_COUNT
        } else if (detailsArr[j].comp && detailsArr[j].comp == 'custom') {
          content.forEach((methodologyArrItem: any) => {
            methodologyArrItem.forEach((methodologyItem: any) => {
              CICC += CHARS_PER_LINE + methodologyItem.value.length
            })
          })
        } else if (detailsArr[j].comp && detailsArr[j].comp == 'image') {
          CICC = detailsArr[j].content?.length ? IMAGE_CHAR_COUNT : 0
        }

        if (detailsArr[j].comp == 'table') {
          CICC +=
            (detailsArr[j].ignoreTitle
              ? 0
              : Math.round(16 / CHAR_LINE_HEIGHT) * CHARS_PER_LINE) +
            (detailsArr[j].title?.length ? CHARS_PER_LINE : 0)
        } else {
          CICC +=
            (detailsArr[j].ignoreTitle
              ? 0
              : Math.round(16 / CHAR_LINE_HEIGHT) * CHARS_PER_LINE) +
            (detailsArr[j].title?.length
              ? (detailsArr[j].title?.length / CHAR_LINE_HEIGHT) *
                CHARS_PER_LINE
              : 0)
        }
        // CICC += i== 0?  Math.floor((88) / CHAR_LINE_HEIGHT) * CHARS_PER_LINE: CHARS_PER_LINE
        // CICC +=  Math.floor(((!subSections[i].ignoreTitle ?37:0) + 16) / CHAR_LINE_HEIGHT) * CHARS_PER_LINE

        CICC += detailsArr[j].ignoreTitle
          ? 0
          : Math.round(20 / CHAR_LINE_HEIGHT) * CHARS_PER_LINE
        CICC = Math.floor(CICC)
        CPCC += CICC

        if (CPCC > MAX_CHARS_PER_PAGE) {
          const LEFT_CHARS = CPCC - MAX_CHARS_PER_PAGE
          let newSubSection = {}

          if (!detailsArr[j].comp) {
            const div = document.createElement('div')
            div.style.height = 'auto'
            div.style.width = '730px' // You may want to adjust this to match your layout
            div.style.position = 'absolute'
            div.style.top = '-9999px'
            div.style.lineHeight = '23px'
            div.style.fontSize = '12px'
            div.innerHTML = content?.slice(0, CICC - LEFT_CHARS)
            document.body.appendChild(div)
            const height = div.offsetHeight
            // get width of div using ref
            const width = div.offsetWidth || 0
            // calculate available space on last line
            const lastLineLength = content?.slice(CICC - LEFT_CHARS).length
            const lastLineWidth =
              (lastLineLength / div.innerHTML.length) * width
            const availableSpace = width - lastLineWidth
            // calculate number of characters that can fit
            const charWidth = 10 // adjust this value based on font type and size
            const charCount = Math.floor(availableSpace / charWidth)
            document.body.removeChild(div)

            // const NO_OF_LINES = Math.ceil(
            //   Math.floor(CICC - LEFT_CHARS) / CHARS_PER_LINE
            // )

            // const NEW_CICC = NO_OF_LINES * CHARS_PER_LINE
            // const NEW_CICC = Math.floor((height/CHAR_LINE_HEIGHT)*CHARS_PER_LINE)
            const NEW_CICC = CICC - LEFT_CHARS + (charCount > 0 ? charCount : 0)
            const nextIndex =
              NEW_CICC - lastIndexFinder(content.slice(0, NEW_CICC))

            detailsArr.splice(j + 1, 0, {
              ...detailsArr[j],
              title: '',
              ignoreTitle: true,
              content: content?.slice(nextIndex),
            })
            detailsArr[j].content = content?.slice(0, nextIndex)
          } else if (
            detailsArr[j].comp == 'image' &&
            detailsArr[j].content.length > 0
          ) {
            detailsArr.splice(j + 1, 0, {
              ...detailsArr[j],
              content: content,
            })
            detailsArr[j].content = content?.slice(CICC - LEFT_CHARS)
            detailsArr[j].ignoreTitle = true
          } else if (detailsArr[j].comp == 'table') {
            const nextIndex =
              Math.floor(
                (CICC - LEFT_CHARS) /
                  TABLE_ROW_CHAR_COUNT /
                  (TABLE_ROW_HEIGHT / 16)
              ) + 1

            console.log(
              '(CPCC/TABLE_ROW_CHAR_COUNT)* TABLE_ROW_HEIGHT',
              nextIndex
            )

            detailsArr.splice(j + 1, 0, {
              ...detailsArr[j],
              ignoreTitle: true,
              content: {
                ...content,

                tableBodyRow: content.tableBodyRow?.slice(nextIndex),
              },
            })
            detailsArr[j].content.tableBodyRow = content.tableBodyRow?.slice(
              0,
              nextIndex
            )
            // detailsArr[j].ignoreTitle = true
            // detailsArr[j].ignoreTableHeading = true
          }
          if (detailsArr[j].comp == 'custom') {
            // const now_detailsArr= detailsArr[j]
            const formatted_D_arr = customDetailsFormatter(
              detailsArr,
              CICC - LEFT_CHARS
            )

            detailsArr[j].content = formatted_D_arr[j].content
            const remainder = formatted_D_arr.slice(j + 1)

            subSections[i] = {
              ...subSections[i],
              details: detailsArr.slice(0, j + 1),
            }

            remainder.forEach((item: any, k: number) => {
              subSections.splice(i + k + 1, 0, {
                ...subSections[i],
                details: [item],
                ignoreHeading: true,
              })
            })

            // subSections.splice(i + 1, 0, { ...newSubSection })
          } else {
            subSections[i] = {
              ...subSections[i],
              details: detailsArr.slice(0, j + 1),
            }

            newSubSection = {
              ...subSections[i],
              details: detailsArr.slice(j + 1),
              ignoreHeading: true,
            }
            subSections.splice(i + 1, 0, { ...newSubSection })
          }

          CPCC = 0
          break
        }
      }
    }
  }

  console.log(
    '🚀 ~ file: PdfSectionMaker.util.ts ~ line 384 ~ subSections.reduce ~ subSections',
    subSections
  )

  return subSections
}

// function calculateRemainingChars(div:any, index:any, width:any) {
//   const text = div.innerText.slice(index);
//   const canvas = document.createElement('canvas');
//   const context = canvas.getContext('2d');
//   context.font = window.getComputedStyle(div).font;
//   const textWidth = context.measureText(text).width;
//   const divWidth = div.getBoundingClientRect().width;
//   const remainingWidth = width - (divWidth - textWidth);
//   const charWidth = textWidth / text.length;
//   const remainingChars = Math.floor(remainingWidth / charWidth);
//   return remainingChars;
// }

function customDetailsFormatter(array: any, CP_LEFT_CHARS: number) {
  const newArray: any = []
  array.forEach((obj: any) => {
    obj.content.forEach((innerArray: any) => {
      let currentChars = 0
      let currentWords = 0
      let currentIndex = 0
      // let currentObject = {};
      innerArray.forEach((innerObj: any) => {
        if (currentChars + innerObj.chars > CP_LEFT_CHARS) {
          innerObj.ignoreTitles = true
          newArray.push({
            title: obj.title,
            content: [[...innerArray.slice(0, currentIndex)]],
            // methodologies: [...obj.methodologies],
            completed: obj.completed,
            comp: obj.comp,
            ignoreTableHeading: obj.ignoreTableHeading,
          })
          innerArray = innerArray.slice(currentIndex)
          currentChars = 0
          currentWords = 0
          currentIndex = 0
          // currentObject = {};
        }
        currentChars += innerObj.chars
        currentWords += innerObj.words
        currentIndex++
        // currentObject[innerObj?.title] = innerObj.value;
      })
      if (currentChars > 0) {
        newArray.push({
          title: obj.title,
          content: [[...innerArray]],
          // methodologies: [...obj.methodologies],
          completed: obj.completed,
          comp: obj.comp,
          ignoreTableHeading: obj.ignoreTableHeading,
        })
      }
    })
  })
  return newArray
}

const lastIndexFinder = (string: string) => {
  const text = string.split(' ')
  const val = text[text.length - 1].length
  console.log(
    '🚀 ~ file: PageLayoutTwo.tsx ~ line 114 ~ lastIndexFinder ~ val',
    text,
    val
  )
  return val
}

export const defaultSectionData = [
  {
    sectionKey: 'section_a',
    sectionPrefix: 'A',
    sectionHeading: 'Section A: Description of Project Activity',
  },
  {
    sectionKey: 'section_b',
    sectionPrefix: 'B',
    sectionHeading: 'Section B: Implementation of the project activity',
  },
  {
    sectionKey: 'section_c',
    sectionPrefix: 'C',
    sectionHeading: 'Section C: Description of Monitoring Activity',
  },
  {
    sectionKey: 'section_d',
    sectionPrefix: 'D',
    sectionHeading: 'Section D: Data and parameters',
  },
  {
    sectionKey: 'section_e',
    sectionPrefix: 'E',
    sectionHeading:
      'Section E: Calculation of emission reductions or GHG removals by sinks',
  },
]

export const PdfSubSectionMaker = {
  subSectionMakerA: (data: any, section: any, index: any) => {
    const key = data[section.sectionKey][`step${index + 1}`]
    const item = {
      heading: `${index + 1}: ` + key['name'],
      details: PdfSubSectionDetailsMaker.sectionA(key, index + 1),
    }
    return item
  },
  subSectionMakerB: (data: any, section: any, index: any) => {
    const key = data[section.sectionKey][`step${index + 1}`]
    const item = {
      heading: `${index + 1}: ` + key['name'],
      details: PdfSubSectionDetailsMaker.sectionB(key, index + 1),
    }
    return item
  },
  subSectionMakerC: (data: any, section: any, index: any) => {
    const key = data[section.sectionKey][`step${index + 1}`]
    const item = {
      heading: `${index + 1}: ` + key['name'],
      details: PdfSubSectionDetailsMaker.sectionC(key, index + 1),
    }
    return item
  },
  subSectionMakerD: (data: any, section: any, index: any) => {
    const key = data[section.sectionKey][`step${index + 1}`]
    const item = {
      heading: `${index + 1}: ` + key['name'],
      details: PdfSubSectionDetailsMaker.sectionD(key, index + 1),
    }
    return item
  },
  subSectionMakerE: (data: any, section: any, index: any) => {
    const key = data[section.sectionKey][`step${index + 1}`]
    const item = {
      heading: `${index + 1}: ` + key['name'],
      details: PdfSubSectionDetailsMaker.sectionE(key, index + 1),
    }
    return item
  },
}

const PdfSubSectionDetailsMaker = {
  sectionA: (key: any, index: number) => {
    switch (index) {
      case 1:
        return sectionADetails.sectionAStep1(key)
      case 2:
        return sectionADetails.sectionAStep2(key)
      case 3:
        return sectionADetails.sectionAStep3(key)
      case 4:
        console.log(
          'sectionADetails.sectionAStep4(key)',
          sectionADetails.sectionAStep4(key)
        )
        return sectionADetails.sectionAStep4(key)
      case 5:
        return sectionADetails.sectionAStep5(key)
      case 6:
        return sectionADetails.sectionAStep6(key)
      case 7:
        return sectionADetails.sectionAStep7(key)
      default:
        return sectionADetails.sectionAStep1(key)
    }
  },
  sectionB: (key: any, index: number) => {
    switch (index) {
      case 1:
        return sectionBDetails.sectionBStep1(key)
      case 2:
        return sectionBDetails.sectionBStep2(key)
      case 3:
        return sectionBDetails.sectionBStep3(key)
      default:
        return sectionBDetails.sectionBStep1(key)
    }
  },
  sectionC: (key: any, index: number) => {
    switch (index) {
      case 1:
        return sectionCDetails.sectionCStep1(key)
      case 2:
        return sectionCDetails.sectionCStep2(key)

      default:
        return sectionBDetails.sectionBStep1(key)
    }
  },
  sectionD: (key: any, index: number) => {
    switch (index) {
      case 1:
        return sectionDDetails.sectionDStep1(key)
      case 2:
        return sectionDDetails.sectionDStep2(key)

      case 3:
        return sectionDDetails.sectionDStep3(key)

      default:
        return sectionBDetails.sectionBStep1(key)
    }
  },
  sectionE: (key: any, index: number) => {
    switch (index) {
      case 1:
        return sectionEDetails.sectionEStep1(key)
      case 2:
        return sectionEDetails.sectionEStep2(key)

      case 3:
        return sectionEDetails.sectionEStep3(key)
      case 4:
        return sectionEDetails.sectionEStep4(key)
      case 5:
        return sectionEDetails.sectionEStep5(key)
      case 6:
        return sectionEDetails.sectionEStep6(key)
      case 7:
        return sectionEDetails.sectionEStep7(key)
      case 8:
        return sectionEDetails.sectionEStep8(key)

      default:
        return sectionBDetails.sectionBStep1(key)
    }
  },
}

const sectionADetails = {
  sectionAStep1: (key: any) => {
    return [
      {
        title: 'Brief on purpose and general description of project activity',
        content: key['purpose_and_description'],
        ...key,
      },
      {
        title:
          'Purpose of the project activity and the measures taken to reduce greenhouse gas emissions *',
        content: key['measure_taken_for_gas_emissions'],
        ...key,
      },
      {
        title: 'Brief description of the installed technology and equipment',
        content: key['brief_description_installed_tech'],
        ...key,
      },
      {
        // title: 'Relevant dates for the project activity',
        title: 'Construction Date:',
        content: moment(key['construction_date'])?.format('DD/MM/YYYY'),
      },
      {
        title: 'Project Commissioning Date:',
        content: moment(key['project_comissioning_date'])?.format('DD/MM/YYYY'),
      },
      {
        title: 'Opertaion Period:',
        content: key['operation_period'],
      },
      // {
      //   title: 'Relevant dates for the project activity',
      //   content: (
      //     <html>
      //       Construction Dt: $
      //       {key['construction_date']
      //         ? moment(key['construction_date']).format('DD/MM/YYYY')
      //         : ''}{' '}
      //       <br />
      //       Project Commisioning Dt: $
      //       {key['project_comissioning_date']
      //         ? moment(key['project_comissioning_date']).format('DD/MM/YYYY')
      //         : ''}
      //       <br />${key['operation_period']}
      //     </html>
      //   ),
      //   ...key,
      // },
      {
        title:
          'Total GHG emission reductions or net anthropogenic GHG removals by sinks achieved in this monitoring period',
        content: key['total_GHG_emission'],
        ...key,
      },
      {
        title: 'Project Type and Sectoral Scope',
        content: key['project_type_and_sectoral_scope'],
        ...key,
      },
      {
        title: 'Conditions Prior to Initiation',
        content: key['conditions_prior_to_initiation'],
        ...key,
      },
      {
        title: 'Additional Information',
        content: key['additional_info'],
        ...key,
      },
    ]
  },
  sectionAStep2: (key: any) => {
    return [
      {
        title: 'Location of the project activity',
        content: (
          <html>
            Country: {key?.country} <br />
            Region / State / Province: {key?.state} <br />
            City / Town / District: {key?.city} <br />
            Landmark: {key?.landmark} <br />
            Pin code: {key?.pincode}
          </html>
        ),
      },
      {
        content: key?.file_attach,
        ...key,
        comp: 'image',
      },
    ]
  },
  sectionAStep3: (key: any) => {
    return [
      {
        title: 'Parties & project participants involved',
        content: {
          tableHeaderRow: [
            ' Party involved ((host) indicates a host Party)',
            ' Private and/or public entity(ies) project participants (as applicable)',
            'Indicate if the Party involved wishes to be considered as project participant',
          ],
          tableBodyRow: key?.party_and_project_participants?.map((row: any) => {
            return [
              row.party_involved?.toString().replace(',', ', '),
              row.private_or_public_project_participant
                ?.toString()
                .replace(',', ', '),
              row.indicate_party_involved,
            ]
          }),
        },
        ...key,
        comp: 'table',
      },
      {
        title: 'Host Country Attestation',
        content: key['host_country_attestation'],
        ...key,
      },
      {
        content: key['host_country_attestation_upload'],
        ...key,
        comp: 'image',
      },
    ]
  },
  sectionAStep4: (key: any) => {
    return key.methodologies?.reduce((acc: any, item: any, index: number) => {
      acc = [
        ...acc,
        {
          // title: 'Selected Methodology',
          content: item?.methodology,
          chars: item?.methodology?.length,
          words: item?.methodology?.split(' ').length,
          title: 'Selected Methodology for Methodology ' + (index + 1),
        },
        {
          // title: 'Project Type',
          content: item?.project_type?.toString()?.replace(',', ', '),
          chars: item?.project_type?.join('').length,
          words: item?.project_type.join('')?.split(' ').length,
          title: 'Project Type for Methodology ' + (index + 1),
        },
        {
          // title: 'Category',
          content: item?.category,
          chars: item?.category.length,
          words: item?.category.split(' ').length,
          title: 'Category for Methodology ' + (index + 1),
        },
        {
          // title: 'Version',
          content: item?.version,
          chars: item?.version.length,
          words: item?.version.split(' ').length,
          title: 'Version for Methodology ' + (index + 1),
        },
        {
          // title: 'Tools referred',
          content: item?.tools,
          chars: item?.tools.length,
          words: item?.tools.split(' ').length,
          title: 'Tools referred for ' + 'Methodology ' + (index + 1),
        },
        {
          // title: 'Applicability of Methodology',
          content: item?.applicable_methodology,
          chars: item?.applicable_methodology.length,
          words: item?.applicable_methodology?.split(' ').length,
          title: 'Applicability of Methodology for Methodology ' + (index + 1),
        },
        {
          // title: 'Deviation form Methodology',
          content: item?.deviation_of_methodology,
          chars: item?.deviation_of_methodology.length,
          words: item?.deviation_of_methodology?.split(' ').length,
          title:
            'Deviation form Methodology for ' + 'Methodology ' + (index + 1),
        },
        {
          // title: 'Other Information Relation to Methodology Application',
          content: item?.other_info,
          chars: item?.other_info.length,
          words: item?.other_info.split(' ').length,
          title:
            'Other Information Relation to Methodology Application for ' +
            'Methodology ' +
            (index + 1),
        },
      ]
      return acc
    }, [])

    // {
    //   content: key.methodologies[0]?.applicability_of_methodology,
    //   comp: 'image'
    // },
  },
  sectionAStep5: (key: any) => {
    return [
      {
        title: 'Start date of 1st creating period',
        content: key?.credit_start_period,
        chars: key?.credit_start_period?.length || 0,
        date: true,
      },
      {
        title: 'Creating from',
        content: key?.credit_period?.start_date,
        chars: key?.credit_period?.start_date?.length || 0,
        date: true,
      },
      {
        title: 'Creating end',
        content: key?.credit_period?.end_date,
        chars: key?.credit_period?.end_date?.length || 0,
        date: true,
      },
      {
        title: 'Brief on creating period',
        chars: key?.credit_period_description?.length || 0,
        content: key?.credit_period_description,
      },
    ]
  },
  sectionAStep6: (key: any) => {
    return [
      {
        title: 'Statutory Requirements',
        content: key?.statutory_requirements,
        ...key,
      },
      {
        title: 'Potential Negative Environmental and Socio-Economic Impacts',
        content: key?.negative_environmental_and_socio_economic_impacts,
        ...key,
      },
      {
        title: 'Consultation with Interested Parties and Communications',
        content: key?.consultation,
        ...key,
      },

      {
        title: 'Environmental Impact Assessment (EIA)',
        content: key?.environmental_impact_assessment,
        ...key,
      },
      {
        title: 'Risk assessment ',
        content: key?.risk_assessment,
        ...key,
      },
      {
        title: 'Additional Information on Risk Management',
        content: key?.additional_information,
        ...key,
      },
    ]
  },
  sectionAStep7: (key: any) => {
    return [
      {
        title: 'Level 1 - ISO 14064-2 GHG Emissions Additionality',
        content: key?.Level1,
        ...key,
      },
      {
        title: 'Level 2a – Statutory Additionality ',
        content: key?.Level2a,
        ...key,
      },
      {
        title: 'Level 2b – Non-enforcement additionality ',
        content: key?.Level2b,
        ...key,
      },
      {
        title:
          'Level 3 – Technology, Institutional, Common Practice Additionality',
        content: key?.Level3,
        ...key,
      },
      {
        title: 'Level 4a – Financial Additionality I',
        content: key?.Level4a,
        ...key,
      },
      {
        title: 'Level 4b – Financial Additionality II',
        content: key?.Level4b,
        ...key,
      },
      {
        title: 'Level 5 – Policy Additionality',
        content: key?.Level5,
        ...key,
      },
    ]
  },
}
const sectionBDetails = {
  sectionBStep1: (key: any) => {
    return [
      {
        title: 'Brief on purpose and general description of project activity',
        content: key['general_description'],
        ...key,
      },
      {
        title: 'Technical Details',
        content: key['technical_description'],
        ...key,
      },
      {
        // title: 'Attach Data Tables for Technical Description',
        content: key['data_tables_technical_description_attach'],
        ...key,
        comp: 'image',
      },
      {
        title: 'Operational Details',
        content: key['operational_description'],
        ...key,
      },
      {
        // title: 'Attach Data Tables for Major shut down details',
        content: key['shut_down_details_attach'],
        ...key,
        comp: 'image',
      },
      {
        // title: 'Attach Data Tables for  implementation of milestones',
        content: key['implementation_milestones_attach'],
        ...key,
        comp: 'image',
      },
      {
        // title: 'Attach Data Tables for  Project timeline event description',
        content: key['project_timeline_attach'],
        ...key,
        comp: 'image',
      },
    ]
  },
  sectionBStep2: (key: any) => {
    console.log('🚀 ~ file: PdfSectionMaker.helper.tsx ~ line 511 ~ key', key)
    return [
      {
        title:
          'Temporary deviations from registered monitoring plan or applied methodology',
        content: key.temporary_deviation || '-',
        ...key,
      },
      {
        title: 'Corrections',
        content: key['corrections'] || '-',
        ...key,
      },
      {
        title:
          'Permanent changes from registered monitoring plan or applied methodology',
        content:
          key['permanent_changes_from_registered_monitoring_plan'] || '-',
        ...key,
      },
      {
        title: 'Brief on purpose and general description of project activity',
        content: key['typeOf_changes_specific'] || '-',
        ...key,
      },
      {
        title: 'Changes to project design of registered project activity',
        content: key['change_project_design'] || '-',
        ...key,
      },
      {
        title: 'Changes to start date of crediting period',
        content: key['change_startDate_creditPeriod'] || '-',
        ...key,
      },
    ]
  },
  sectionBStep3: (key: any) => {
    return [
      {
        title: 'Project Boundary',
        content: key['project_boundary'],
        ...key,
      },
      {
        title: 'Eligibility',
        content: key['eligibility'],
        ...key,
      },
      {
        title: 'Funding',
        content: key['funding'],
        ...key,
      },
      {
        title: 'Ownership',
        content: key['ownership'],
        ...key,
      },
      {
        title: 'Eligibility',
        content: key['ownership_file_attach'],
        ...key,
        comp: 'image',
      },
      {
        title: 'Other Certifications',
        content: key['other_certifications'],
        ...key,
      },
      {
        title: 'Participation under Other GHG Programs',
        content: key['participation_under_GHG_programs'],
        ...key,
      },
      {
        title: 'Other Benefits',
        content: key['other_benefits'],
        ...key,
      },
    ]
  },
}
const sectionCDetails = {
  sectionCStep1: (key: any) => {
    return [
      {
        title: 'Description of monitoring system',
        content: key['description'],
        ...key,
      },
      {
        title: 'Monitoring Plan',
        content: key['monitoring_plan'],
        ...key,
      },
      {
        title: 'Attach organizational structure responsibilities chart',
        content: key['attach_org_structure_and_responsibilities_chart'],
        ...key,
        comp: 'image',
      },
      {
        title: 'Project Proponent(s)',
        content: key['project_proponents_upload'],
        ...key,
        comp: 'image',
      },

      {
        title: 'Specific Datas Monitored',
        content: key['specific_data_monitored'],
        ...key,
      },
      {
        title: 'Training and Maintenance',
        content: key['training_and_maintenance'],
        ...key,
      },

      {
        title: 'Management of data quality',
        content: key['management_of_data_quality'],
        ...key,
      },
      {
        title: 'Others involved in project',
        content: key['project_proponents_upload'],
        ...key,
        comp: 'image',
      },
    ]
  },
  sectionCStep2: (key: any) => {
    console.log('🚀 ~ file: PdfSectionMaker.helper.tsx ~ line 511 ~ key', key)
    return [
      {
        title: 'Criteria and Procedures for Quantification',
        content: key.criteria_and_procedures || '-',
        ...key,
      },
      {
        title: 'Baseline emissions',
        content: key['baseline_emissions'] || '-',
        ...key,
      },
      {
        content: key['baseline_emissions_upload'] || '-',
        ...key,
        comp: 'image',
      },
      {
        title: 'Brief on purpose and general description of project activity',
        content: key['typeOf_changes_specific'] || '-',
        ...key,
      },
      {
        title: 'Criteria and Procedures for Quantification',
        content: key['criteria_and_procedures'] || '-',
        ...key,
      },
      {
        title: 'Baseline emissions',
        content: key['baseline_emissions'] || '-',
        ...key,
      },
      {
        content: key['baseline_emissions_upload'],
        ...key,
        comp: 'image',
      },
      {
        content: key['project_emissions_upload'],
        ...key,
        comp: 'image',
      },
      {
        title: 'Leakage',
        content: key['leakage'],
        ...key,
      },
      {
        content: key['leakage_upload'],
        ...key,
        comp: 'image',
      },
      {
        title: 'Quantification of Net-GHG Emissions and/or Removals',
        content: key['quantification_of_net_GHG_emission'],
        ...key,
      },
      {
        content: key.quantification_of_net_GHG_emission_upload,
        ...key,
        comp: 'image',
      },
    ]
  },
}
const sectionDDetails = {
  sectionDStep1: (key: any) => {
    return [
      {
        title:
          'Data and parameters fixed ex ante or at renewal of crediting period',
        content: key['data_and_parameter_fixed_ExAnte'],
        ...key,
      },
      {
        title: 'Data & parameters fixed ex-ante table',
        content: key.attach_ex_ante_table,
        ...key,
        comp: 'image',
      },
    ]
  },
  sectionDStep2: (key: any) => {
    return [
      {
        title: 'Data and parameters monitored ex-post (actuals)',
        content: key.data_and_parameter_monitored_ExPost || '-',
        ...key,
      },
      {
        title: 'Data & parameters monitored table',
        content: key.attach_ex_ante_table,
        ...key,
        comp: 'image',
      },
    ]
  },
  sectionDStep3: (key: any) => {
    return [
      {
        title: 'Implementation of sampling plan',
        content: key.implementation_of_sampling_plan || '-',
        ...key,
      },
    ]
  },
}
const sectionEDetails = {
  sectionEStep1: (key: any) => {
    return [
      {
        title: 'Calculation of baseline emissions or net GHG removals by sinks',
        content: key['calculation_of_baselineEmissions_or_net_GHG'],
        ...key,
      },
      {
        // title:'Data & parameters fixed ex-ante table',
        content: key.attach_relevant_docs,
        ...key,
        comp: 'image',
      },
    ]
  },
  sectionEStep2: (key: any) => {
    return [
      {
        title:
          'Calculation of project emissions or actual net GHG removals by sinks',
        content: key.calculation_of_projectEmissions_or_net_GHG || '-',
        ...key,
      },
      {
        // title:"Data & parameters monitored table",
        content: key.attach_relevant_docs,
        ...key,
        comp: 'image',
      },
    ]
  },
  sectionEStep3: (key: any) => {
    return [
      {
        title: 'Calculation of leakage',
        content: key.calculation_of_leakage || '-',
        ...key,
      },
      {
        content: key.attach_relevant_docs,
        ...key,
        comp: 'image',
      },
    ]
  },
  sectionEStep4: (key: any) => {
    return [
      {
        title:
          'Summary of calculation of emission reductions or net anthropogenic GHG removals by sinks',
        content: key.calculation_of_emissions_reduction || '-',
        ...key,
      },
      {
        content: key.attach_relevant_docs,
        ...key,
        comp: 'image',
      },
    ]
  },
  sectionEStep5: (key: any) => {
    return [
      {
        title:
          'Comparison of actual emission reductions or net anthropogenic GHG removals by sinks with estimates in registered PDD',
        content: key.comparison_of_actual_emission_reduction || '-',
        ...key,
      },
      {
        content: key.attach_relevant_docs,
        ...key,
        comp: 'image',
      },
    ]
  },
  sectionEStep6: (key: any) => {
    return [
      {
        title: 'Remarks on difference from estimated value',
        content: key.remark_on_difference_from_estimate_value || '-',
        ...key,
      },
      {
        content: key.attach_relevant_docs,
        ...key,
        comp: 'image',
      },
    ]
  },
  sectionEStep7: (key: any) => {
    return [
      {
        title:
          'Actual emission reductions or net anthropogenic GHG removals during 1st commitment period',
        content: key.actual_emission_reductions || '-',
        ...key,
      },
      {
        content: key.attach_relevant_docs,
        ...key,
        comp: 'image',
      },
    ]
  },
  sectionEStep8: (key: any) => {
    return [
      {
        title:
          'Use appendices for supporting information and add any additional documents',
        content: key.appendices_supporting_documents || '-',
        ...key,
      },
      {
        content: key.appendices_supporting_documents_upload,
        ...key,
        comp: 'image',
      },
    ]
  },
}
