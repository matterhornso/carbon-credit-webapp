import { Box, Typography } from '@mui/material'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../hooks/reduxHooks'
import { randomIntFromInterval } from '../../utils/commonFunctions'
import {
  defaultSectionData,
  PdfSubSectionMaker,
  sectionFormatter,
} from './helpers/PdfSectionMaker.helper'
import ImageLayout from './Layout/ImageLayout'
import LayoutTwo from './Layout/LayoutTwo'
import MainHeading from './Layout/MainHeading'
import SubData from './Layout/SubData'
import TableLayout from './Layout/TableLayout'

const sectionsDemo = [
  {
    sectionPrefix: 'A',
    sectionHeading: 'Section A: Description of Project Activity',
    subSections: [
      {
        heading: 'Purpose and General description of project activity',
        details: [
          {
            title: 'test A1 title',
            content: 'test A1 content',
          },
        ],
      },
    ],
  },
]

type Props = {
  data?: any
}

function Sections({ data }: Props) {
  console.log('🚀 ~ file: Sections.tsx ~ line 37 ~ Sections ~ data', data)
  const [sections, setSections] = useState<any>([])
  const [sectionsFormatted, setSectionsFormatted] = useState<any>([])
  console.log(
    '🚀 ~ file: Sections.tsx ~ line 41 ~ Sections ~ sectionsFormatted',
    sectionsFormatted
  )
  console.log(
    '🚀 ~ file: Sections.tsx ~ line 34 ~ Sections ~ sections',
    sections
  )

  const sectionMaker = () => {
    const toBeSections = defaultSectionData.map((section: any) => {
      console.log(
        '🚀 ~ file: Sections.tsx ~ line 48 ~ toBeSections ~ section',
        section
      )
      section.subSections = []
      const stepsLength = Object.keys(data[section?.sectionKey])?.filter(
        (key: any) => key.includes('step')
      ).length

      switch (section.sectionPrefix) {
        case 'A':
          for (let i = 0; i < stepsLength; i++) {
            section.subSections = [
              ...section.subSections,
              PdfSubSectionMaker.subSectionMakerA(data, section, i),
            ]
          }
          break
        case 'B':
          for (let i = 0; i < stepsLength; i++) {
            section.subSections = [
              ...section.subSections,
              PdfSubSectionMaker.subSectionMakerB(data, section, i),
            ]
          }
          break
        case 'C':
          for (let i = 0; i < stepsLength; i++) {
            section.subSections = [
              ...section.subSections,
              PdfSubSectionMaker.subSectionMakerC(data, section, i),
            ]
          }
          break
        case 'D':
          for (let i = 0; i < stepsLength; i++) {
            section.subSections = [
              ...section.subSections,
              PdfSubSectionMaker.subSectionMakerD(data, section, i),
            ]
          }
          break
        case 'E':
          for (let i = 0; i < stepsLength; i++) {
            section.subSections = [
              ...section.subSections,
              PdfSubSectionMaker.subSectionMakerE(data, section, i),
            ]
          }
          break
        default:
          section.subSections = []
          break
      }

      console.log('sectionsection 91', section)
      return section
    })
    setSections(toBeSections)
  }

  useEffect(() => {
    if (data) sectionMaker()
  }, [data])

  useEffect(() => {
    setSectionsFormatted(sectionFormatter(sections))
  }, [sections])

  //   const subSectionFormatter = (subSections: any) => {
  //     return subSections
  //   }
  return (
    <>
      {sectionsFormatted?.map((section: any, sectionIndex: number) => {
        return section?.subSections?.map((subSection: any, index: any) => {
          if (subSection)
            return (
              <LayoutTwo
                key={
                  subSection?.mainHeading +
                  index.toString() +
                  randomIntFromInterval().toString()
                }
                heading={index == 0 ? section.sectionHeading : null}
              >
                {!subSection?.ignoreHeading && (
                  <MainHeading
                    value={section?.sectionPrefix + subSection?.heading}
                  />
                )}
                {subSection?.details?.map(
                  (details: any, detailsIndex: number) => {
                    return (
                      <SubData
                        key={
                          detailsIndex.toString() +
                          randomIntFromInterval().toString()
                        }
                        title={details.title}
                        ignoreTitle={
                          details.comp === 'image'
                            ? details.title?.length && details.content?.length
                              ? false
                              : true
                            : details.ignoreTitle
                        }
                      >
                        {' '}
                        {/* {details.content} */}
                        <div onClick={() => console.log('clicked')}>
                          {!details.comp && details.content?.length
                            ? details.content
                            : null}
                        </div>
                        {details.comp === 'image' && details.content?.length ? (
                          <ImageLayout images={details.content} />
                        ) : null}
                        {details.comp === 'table' ? (
                          <TableLayout
                            tableBodyRow={details.content.tableBodyRow}
                            tableHeaderRow={details.content.tableHeaderRow}
                          />
                        ) : null}
                        {details.comp === 'custom' ? (
                          <>
                            {details.content?.map(
                              (item: any, index: number) => {
                                return MethodologyComp(details.content, index)
                              }
                            )}
                          </>
                        ) : null}
                      </SubData>
                    )
                  }
                )}
              </LayoutTwo>
            )
        })
      })}
    </>
  )
}

export default Sections

const MethodologyComp = (methodologies: any, index: number) => {
  console.log(
    '🚀 ~ file: Sections.tsx ~ line 175 ~ MethodologyComp ~ methodologies',
    methodologies
  )
  return (
    <Box sx={{ mt: 2 }} key={index.toString()}>
      <Typography sx={{ color: '#006B5E', fontSize: 12, fontWeight: 600 }}>
        Methodology {index + 1}
      </Typography>
      <Box sx={{ mt: 1 }}>
        {methodologies?.map((itms: any, idx: number) => {
          console.log('methodologies itm', itms)
          return itms.map((itm: any, idx: any) => {
            console.log(
              '🚀 ~ file: Sections.tsx ~ line 185 ~ itms.map ~ itm',
              itm
            )
            return (
              <Typography
                key={idx.toString()}
                sx={{ fontSize: 12, fontWeight: 500, mb: 1 }}
              >
                {itm.title || ''}
                <Typography
                  sx={{
                    display: 'inline',
                    fontSize: 12,
                    fontWeight: 400,
                  }}
                >
                  {' : '}
                  {itm?.value}
                </Typography>
              </Typography>
            )
          })
        })}
      </Box>
    </Box>
  )
}
