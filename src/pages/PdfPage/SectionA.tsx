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
import { Box } from '@mui/system'
import moment from 'moment'
import React, { FC, useEffect, useState } from 'react'
import { fileUploadCalls } from '../../api/fileUpload.api'
import { useAppSelector } from '../../hooks/reduxHooks'
import ImagePageDistribution from './Layout/ImagePageDistribution'
import Layout from './Layout/Layout'
import MainHeading from './Layout/MainHeading'
import PageDynamic from './Layout/PageDynamic'
import PageLayoutTwo from './Layout/PageLayoutTwo'
import SubData from './Layout/SubData'

const SectionA = () => {
  const page_title = 'Section A: Description of Project Activity'
  const data = useAppSelector(({ pdfPage }) => pdfPage.pdfData?.section_a)
  console.log('🚀 ~ file: SectionA.tsx ~ line 26 ~ SectionA ~ data', data)
  console.log('data?.step4?.methodologies', data?.step4?.methodologies)
  const [section, setSection] = useState<any>(null)
  console.log('🚀 ~ file: SectionA.tsx ~ line 28 ~ SectionA ~ section', section)
  const [methodologies, setMethodologies] = useState<any>()
  console.log(
    '🚀 ~ file: SectionA.tsx ~ line 29 ~ SectionA ~ methodologies',
    methodologies
  )

  useEffect(() => {
    const methodologies_arr = data?.step4?.methodologies?.map((item: any) => [
      {
        key: 'Selected Methodology',
        value: item?.methodology,
        chars: item?.methodology?.length,
        words: item?.methodology?.split(' ').length,
      },
      {
        key: 'Project Type',
        value: item?.project_type?.toString()?.replace(',', ', '),
        chars: item?.project_type?.join('').length,
        words: item?.project_type.join('')?.split(' ').length,
      },
      {
        key: 'Category',
        value: item?.category,
        chars: item?.category.length,
        words: item?.category.split(' ').length,
      },
      {
        key: 'Version',
        value: item?.version,
        chars: item?.version.length,
        words: item?.version.split(' ').length,
      },
      {
        key: 'Tools referred',
        value: item?.tools,
        chars: item?.tools.length,
        words: item?.tools.split(' ').length,
      },
      {
        key: 'Applicability of Methodology',
        value: item?.applicable_methodology,
        chars: item?.applicable_methodology.length,
        words: item?.applicable_methodology?.split(' ').length,
      },
      {
        key: 'Deviation form Methodology',
        value: item?.deviation_of_methodology,
        chars: item?.deviation_of_methodology.length,
        words: item?.deviation_of_methodology?.split(' ').length,
      },
      {
        key: 'Other Information Relation to Methodology Application',
        value: item?.other_info,
        chars: item?.other_info.length,
        words: item?.other_info.split(' ').length,
      },
    ])
    console.log(
      '🚀 ~ file: SectionA.tsx ~ line 37 ~ useEffect ~ methodologies_arr',
      methodologies_arr
    )

    setMethodologies(methodologies_arr?.length > 0 ? methodologies_arr : [])
  }, [data?.step4?.methodologies])

  const MethodologyComp = (index: number) => {
    return (
      <Box sx={{ mt: 2 }} key={index.toString()}>
        <Typography sx={{ color: '#006B5E', fontSize: 12, fontWeight: 600 }}>
          Methodology {index + 1}
        </Typography>
        <Box sx={{ mt: 1 }}>
          {methodologies[index]?.map((itm: any, idx: number) => {
            console.log('methodologies itm', itm)
            return (
              <Typography
                key={idx.toString()}
                sx={{ fontSize: 12, fontWeight: 500, mb: 1 }}
              >
                {itm.key}:{' '}
                <Typography
                  sx={{
                    display: 'inline',
                    fontSize: 12,
                    fontWeight: 400,
                  }}
                >
                  {itm?.value}
                </Typography>
              </Typography>
            )
          })}
        </Box>
      </Box>
    )
  }

  const sectionMaker = () => {
    const sectionA = [
      {
        section: 'sectionA1',
        mainHeading: 'A1: Purpose & General description',
        values: [
          {
            title:
              'Brief on purpose and general description of project activity',
            content: data?.step1?.purpose_and_description,
          },
          {
            title:
              'Purpose of the project activity and the measures taken to reduce greenhouse gas emissions *',
            content: data?.step1?.measure_taken_for_gas_emissions,
          },
          {
            title:
              'Brief description of the installed technology and equipment',
            content: data?.step1?.brief_description_installed_tech,
          },
          {
            title: 'Relevant dates for the project activity',
            content: `Construction Dt: 
          ${
            data?.step1?.construction_date
              ? moment(data?.step1?.construction_date).format('DD/MM/YYYY')
              : ''
          } \n\n
       
          Project Commisioning Dt: 
          ${
            data?.step1?.project_comissioning_date
              ? moment(data?.step1?.project_comissioning_date).format(
                  'DD/MM/YYYY'
                )
              : ''
          }
            \n\n
          ${data?.step1?.operation_period}`,
          },
          {
            title:
              'Total GHG emission reductions or net anthropogenic GHG removals by sinks achieved in this monitoring period',
            content: data?.step1?.total_GHG_emission,
          },
          {
            title: 'Project Type and Sectoral Scope',
            content: data?.step1?.project_type_and_sectoral_scope,
          },
          {
            title: 'Conditions Prior to Initiation',
            content: data?.step1?.conditions_prior_to_initiation,
          },
          {
            title: 'Additional Information',
            content: data?.step1?.additional_info,
          },
        ],
      },
      {
        section: 'section A2',
        mainHeading: 'A2: Location',
        values: [
          {
            title: 'Location of the project activity',
            content: (
              <html>
                Country: {data?.step2?.country} <br />
                Region / State / Province: {data?.step2?.state} <br />
                City / Town / District: {data?.step2?.city} <br />
                Landmark: {data?.step2?.landmark} <br />
                Pin code: {data?.step2?.pincode}
              </html>
            ),
          },
          {
            images: data?.step2?.file_attach,
          },
        ],
      },
      {
        section: 'section A3',
        mainHeading: 'A3: Parties & Project Participants',
        values: [
          {
            title: 'Parties & project participants involved',
            content: (
              <TableContainer
                component={Paper}
                sx={{ boxShadow: 'none', border: '1px solid #C4C7C5', mb: 5 }}
              >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead sx={{ background: '#DAF7F0' }}>
                    <TableRow>
                      <TableCell className="table-header-cell">
                        Party involved ((host) indicates a host Party)
                      </TableCell>
                      <TableCell className="table-header-cell">
                        Private and/or public entity(ies) project participants
                        (as applicable)
                      </TableCell>
                      <TableCell className="table-header-cell">
                        Indicate if the Party involved wishes to be considered
                        as project participant
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.step3?.party_and_project_participants.map(
                      (row: any) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <TableCell className="table-body-cell">
                            {row.party_involved?.toString().replace(',', ', ')}
                          </TableCell>
                          <TableCell className="table-body-cell">
                            {row.private_or_public_project_participant
                              ?.toString()
                              .replace(',', ', ')}
                          </TableCell>
                          <TableCell className="table-body-cell">
                            {row.indicate_party_involved}
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            ),
          },
          {
            title: 'Host Country Attestation',
            content: data?.step3?.host_country_attestation,
          },
          {
            images: data?.step3?.host_country_attestation_upload,
          },
        ],
      },
      {
        section: 'section A4',
        mainHeading: 'A4: Reference of Applied Methodology',
        values: [
          // {
          //   title: 'The methodologies applied for the project activity under consideration are:',
          //   content: <>{methodologies?.map((item: any, index: number) => {
          //     console.log("🚀 ~ file: SectionA.tsx ~ line 243 ~ content:methodologies?.map ~ item", item)
          //       return MethodologyComp(index)
          //   })}</>,
          //   chars:  methodologies?.flat().map((obj:any) => obj.chars).reduce((accumulator:any, current:any) => accumulator + current, 0),
          //   words: methodologies?.flat().map((obj:any) => obj.words).reduce((accumulator:any, current:any) => accumulator + current, 0),
          //   html:  ReactDOMServer.renderToStaticMarkup(<>{methodologies?.map((item: any, index: number) => {
          //       return MethodologyComp(index)
          //   })}</>)

          // },
          {
            images: data?.step4?.methodologies[0]?.applicability_of_methodology,
          },
        ],
      },
      {
        section: 'section A5',
        mainHeading: 'A5: Creating Period',
        values: [
          {
            title: 'Renewable crediting period',
            content: [
              {
                key: 'Start date of 1st creating period',
                value: data?.step5?.credit_start_period,
                date: true,
              },
              {
                key: 'Creating from',
                value: data?.step5?.credit_period?.start_date,
                date: true,
              },
              {
                key: 'Creating end',
                value: data?.step5?.credit_period?.end_date,
                date: true,
              },
              {
                key: 'Brief on creating period',
                value: data?.step5?.credit_period_description,
              },
            ].map((item, index) => {
              return (
                <Box sx={{ mt: 1 }} key={index}>
                  <Typography sx={{ fontSize: 12, fontWeight: 500, mb: 1 }}>
                    {item?.key}:{' '}
                    <Typography
                      sx={{
                        display: 'inline',
                        fontSize: 12,
                        fontWeight: 400,
                      }}
                    >
                      {item?.date
                        ? item?.value
                          ? moment(item?.value).format('DD/MM/YYYY')
                          : ''
                        : item?.value}
                    </Typography>
                  </Typography>
                </Box>
              )
            }),
          },
        ],
      },
      {
        section: 'section A6',
        mainHeading: 'A6: Safeguards',
        values: [
          {
            title: 'Statutory Requirements',
            content: data?.step6?.statutory_requirements,
          },
          {
            title:
              'Potential Negative Environmental and Socio-Economic Impacts',
            content:
              data?.step6?.negative_environmental_and_socio_economic_impacts,
          },
          {
            title: 'Consultation with Interested Parties and Communications',
            content: data?.step6?.consultation,
          },

          {
            title: 'Environmental Impact Assessment (EIA)',
            content: data?.step6?.environmental_impact_assessment,
          },
          {
            title: 'Risk assessment ',
            content: data?.step6?.risk_assessment,
          },
          {
            title: 'Additional Information on Risk Management',
            content: data?.step6?.additional_information,
          },
        ],
      },
      {
        section: 'section A7',
        mainHeading: 'A7: Additionally',
        values: [
          {
            title: 'Level 1 - ISO 14064-2 GHG Emissions Additionality',
            content: data?.step7?.Level1,
          },
          {
            title: 'Level 2a – Statutory Additionality ',
            content: data?.step7?.Level2a,
          },
          {
            title: 'Level 2b – Non-enforcement additionality ',
            content: data?.step7?.Level2b,
          },
          {
            title:
              'Level 3 – Technology, Institutional, Common Practice Additionality',
            content: data?.step7?.Level3,
          },
          {
            title: 'Level 4a – Financial Additionality I',
            content: data?.step7?.Level4a,
          },
          {
            title: 'Level 4b – Financial Additionality II',
            content: data?.step7?.Level4b,
          },
          {
            title: 'Level 5 – Policy Additionality',
            content: data?.step7?.Level5,
          },
        ],
      },
    ]
    console.log(
      '🚀 ~ file: SectionA.tsx ~ line 381 ~ sectionMaker ~ sectionA',
      sectionA
    )
    setSection(sectionA)
  }
  useEffect(() => {
    console.log('methodologiesmethodologiesmethodologies', methodologies)

    if (data && methodologies) {
      sectionMaker()
    }
  }, [data, methodologies])

  console.log('rm', methodologies)
  return (
    <>
      {section &&
        section.map((section: any, index: number) => (
          <PageLayoutTwo
            key={index.toString()}
            index={index}
            title={page_title}
            heading={page_title}
            sections={[section]}
            mainHeading={section.mainHeading}
          />
        ))}

      {/* <ImagePageDistribution
        imageTitle="Location of the project activity"
        images={data?.step2?.file_attach}
        title={page_title}
      >
        <>
          <MainHeading value="A2: Location" />
          <SubData title="Location of the project activity">
            Country: {data?.step2?.country} <br />
            Region / State / Province: {data?.step2?.state} <br />
            City / Town / District: {data?.step2?.city} <br />
            Landmark: {data?.step2?.landmark} <br />
            Pin code: {data?.step2?.pincode}
          </SubData>
        </>
      </ImagePageDistribution> */}

      {/* <PageDynamic title={page_title}>
        <MainHeading value="A3: Parties & Project Participants " />
        <SubData title="Parties & project participants involved">
          <TableContainer
            component={Paper}
            sx={{ boxShadow: 'none', border: '1px solid #C4C7C5', mb: 5 }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ background: '#DAF7F0' }}>
                <TableRow>
                  <TableCell className="table-header-cell">
                    Party involved ((host) indicates a host Party)
                  </TableCell>
                  <TableCell className="table-header-cell">
                    Private and/or public entity(ies) project participants (as
                    applicable)
                  </TableCell>
                  <TableCell className="table-header-cell">
                    Indicate if the Party involved wishes to be considered as
                    project participant
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.step3?.party_and_project_participants.map((row: any) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell className="table-body-cell">
                      {row.party_involved?.toString().replace(',', ', ')}
                    </TableCell>
                    <TableCell className="table-body-cell">
                      {row.private_or_public_project_participant
                        ?.toString()
                        .replace(',', ', ')}
                    </TableCell>
                    <TableCell className="table-body-cell">
                      {row.indicate_party_involved}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </SubData>

        <SubData title="Host Country Attestation">
          {data?.step3?.host_country_attestation}
        </SubData>
      </PageDynamic> */}
      {/* <ImagePageDistribution
        imageTitle=""
        title={page_title}
        images={data?.step3?.host_country_attestation_upload}
      /> */}
      {/* <ImagePageDistribution
        title={page_title}
        images={data?.step4?.methodologies[0]?.applicability_of_methodology}
      >
        <MainHeading value="A4: Reference of Applied Methodology" />
        <SubData title="The methodologies applied for the project activity under consideration are:">
          {methodologies?.map((item: any, index: number) => {
            if (index === 0) return MethodologyComp(index)
          })}
          <Box></Box>
        </SubData>
      </ImagePageDistribution> */}

      {/* {methodologies?.length > 1 &&
        methodologies?.map((item: any, index: number) => {
          if (index !== 0)
            return (
              <ImagePageDistribution
                title={page_title}
                images={
                  data?.step4?.methodologies[index]
                    ?.applicability_of_methodology
                }
              >
                {MethodologyComp(index)}
              </ImagePageDistribution>
            )
        })} */}
      {/* <PageDynamic title={page_title}> */}
      {/* <MainHeading value="A5: Creating Period" /> */}
      {/* <SubData title="Renewable crediting period">
          <>
            {[
              {
                key: 'Start date of 1st creating period',
                value: data?.step5?.credit_start_period,
                date: true,
              },
              {
                key: 'Creating from',
                value: data?.step5?.credit_period?.start_date,
                date: true,
              },
              {
                key: 'Creating end',
                value: data?.step5?.credit_period?.end_date,
                date: true,
              },
              {
                key: 'Brief on creating period',
                value: data?.step5?.credit_period_description,
              },
            ].map((item, index) => {
              return (
                <Box sx={{ mt: 1 }} key={index}>
                  <Typography sx={{ fontSize: 12, fontWeight: 500, mb: 1 }}>
                    {item?.key}:{' '}
                    <Typography
                      sx={{
                        display: 'inline',
                        fontSize: 12,
                        fontWeight: 400,
                      }}
                    >
                      {item?.date
                        ? item?.value
                          ? moment(item?.value).format('DD/MM/YYYY')
                          : ''
                        : item?.value}
                    </Typography>
                  </Typography>
                </Box>
              )
            })}
          </>
        </SubData> */}
      {/* <MainHeading value="A5: Safeguards" />
        <SubData title="Statutory Requirements">
          {data?.step6?.statutory_requirements}
        </SubData>
        <SubData title="Potential Negative Environmental and Socio-Economic Impacts">
          {data?.step6?.negative_environmental_and_socio_economic_impacts}
        </SubData>
        <SubData title="Consultation with Interested Parties and Communications">
          {data?.step6?.consultation}
        </SubData>
        <SubData title="Environmental Impact Assessment (EIA)">
          {data?.step6?.environmental_impact_assessment}
        </SubData>
        <SubData title="Risk assessment ">
          {data?.step6?.risk_assessment}
        </SubData>
        <SubData title="Additional Information on Risk Management">
          {data?.step6?.additional_information}
        </SubData> */}
      {/* </PageDynamic> */}

      {/* <PageLayoutTwo title={page_title} heading={page_title} sections={sectionA5} mainHeading='A5: Safeguards'/> */}

      {/* <PageDynamic title={page_title}> */}
      {/* <MainHeading value="A7: Additionally" />
        <SubData title="Level 1 - ISO 14064-2 GHG Emissions Additionality">
          {data?.step7?.Level1}
        </SubData>
        <SubData title="Level 2a – Statutory Additionality ">
          {data?.step7?.Level2a}
        </SubData>
        <SubData title="Level 2b – Non-enforcement additionality ">
          {data?.step7?.Level2b}
        </SubData>
        <SubData title="Level 3 – Technology, Institutional, Common Practice Additionality">
          {data?.step7?.Level3}
        </SubData>
        <SubData title="Level 4a – Financial Additionality I">
          {data?.step7?.Level4a}
        </SubData>
        <SubData title="Level 4b – Financial Additionality II">
          {data?.step7?.Level4b}
        </SubData>
        <SubData title="Level 5 – Policy Additionality">
          {data?.step7?.Level5}
        </SubData> */}
      {/* </PageDynamic> */}

      {/* <Layout heading="test hello">
        <></>
      </Layout> */}
    </>
  )
}

export default SectionA
