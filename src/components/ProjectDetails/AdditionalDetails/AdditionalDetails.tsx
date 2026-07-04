import { Box, Grid, Typography } from '@mui/material'
import moment from 'moment'
import React, { FC, useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import { useAppSelector } from '../../../hooks/reduxHooks'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

interface AdditionalDetailsProps {
  projectDetailsData?: any
  projectData?: any
}
const AdditionalDetails = (props: AdditionalDetailsProps) => {
  const onWebApp = useAppSelector(({ app }) => !app.throughIFrame, shallowEqual)
  const { projectDetailsData } = props

  const [tags, setTags] = useState([])
  const [details, setDetails] = useState<any>([])
  const [cardDetails, setCardDetails] = useState<any>([])
  const [seeMore, setSeeMore] = useState(false)

  useEffect(() => {
    getAllDetails()
  }, [])

  const getAllDetails = () => {
    let methodologies = []
    methodologies =
      projectDetailsData?.methodologies &&
      projectDetailsData?.methodologies.length &&
      projectDetailsData?.methodologies.map(
        (item: any, index: number) => item?.methodology
      )
    console.log('methodologies', methodologies)

    const projectType = projectDetailsData?.tags?.length
      ? projectDetailsData?.tags.slice(0, projectDetailsData?.tags.length - 1)
      : '-'
    const modifiedArrayTemp = [
      { heading: 'PROJECT TYPE', value: projectType },
      {
        heading: 'REFERENCE & APPLIED METHODOLOGY',
        value:
          methodologies?.length <= 0
            ? '-'
            : methodologies
            ? methodologies
            : '-',
      },
      {
        heading: 'PROJECT START DATE',
        value: projectDetailsData?.start_date
          ? moment(projectDetailsData?.start_date).format(`DD/MM/YY`)
          : '-',
      },
      {
        heading: 'PROJECT END DATE',
        value: projectDetailsData?.end_date
          ? moment(projectDetailsData?.end_date).format(`DD/MM/YY`)
          : '-',
      },
      {
        heading: 'CREDITING PERIOD',
        value: [
          `Start: ${
            projectDetailsData?.credit_period?.start_date
              ? moment(projectDetailsData?.credit_period?.start_date).format(
                  `DD/MM/YY`
                )
              : '-'
          } `,
          `End: ${
            projectDetailsData?.credit_period?.end_date
              ? moment(projectDetailsData?.credit_period?.end_date).format(
                  `DD/MM/YY`
                )
              : '-'
          } `,
        ],
      },
    ]
    setDetails(modifiedArrayTemp)
  }
  useEffect(() => {
    const cardDetails = [
      {
        heading: 'TOTAL CREDITS / TOKENS AVAILABLE',
        value: Number(props.projectData?.token_detail?.balance || 0),
      },
      {
        heading: 'CREDITS RETIRED',
        value: Number(props.projectData?.token_detail?.retire || 0),
      },
      {
        heading: 'CO2e  SEQUESTERED [LIFETIME]',
        value: Number(props.projectData?.token_detail?.lifetime || 0),
      },
    ]
    setCardDetails(cardDetails)
    setTags(props.projectData?.tags)
  }, [props.projectData])

  return (
    <Box
      sx={{
        pt: 8,
        flexDirection: 'column',
      }}
    >
      <Typography
        sx={{
          fontSize: 32,
          fontWeight: '600',
          color: 'headingColor.main',
          lineHeight: '48px',

          fontStyle: 'normal',
        }}
      >
        Additional Details
      </Typography>
      <Grid container sx={{ mt: 3 }} flexDirection="column">
        <Grid item md={12}>
          <Box>
            <Typography
              sx={{
                // mt: 2,
                fontSize: 14,
                color: 'textColor5.main',
                fontWeight: '600',
                textTransform: 'uppercase',
                lineHeight: '21px',
                letterSpacing: '0.02em',
                fontStyle: 'normal',
              }}
            >
              Tags
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              {tags && tags?.length
                ? tags.map((tag: string, index: number) => (
                    <Tag key={index} tag={tag} />
                  ))
                : null}
            </Box>
            {seeMore ? (
              <Grid container sx={{ mt: 2 }} rowGap={'28px'}>
                {details && details.length
                  ? details.map((detail: any, index: number) => (
                      <Details
                        key={index}
                        heading={detail?.heading}
                        value={detail?.value}
                      />
                    ))
                  : null}
              </Grid>
            ) : (
              <Grid container sx={{ mt: 3 }} rowGap={'28px'}>
                {details && details.length
                  ? details.map((detail: any, index: number) =>
                      index <= 1 ? (
                        <Details
                          key={index}
                          heading={detail?.heading}
                          value={detail?.value}
                        />
                      ) : null
                    )
                  : null}
              </Grid>
            )}
          </Box>
        </Grid>
        {/* CreditDetails */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'start',
            alignItems: 'start',
            mb: 4,
            mt: 6,
            cursor: 'pointer',
          }}
          onClick={() => setSeeMore(!seeMore)}
        >
          {!seeMore ? (
            <ArrowDownwardIcon
              style={{ color: '#006B5E' }}
              fontSize={'small'}
            />
          ) : (
            <ArrowUpwardIcon style={{ color: '#006B5E' }} fontSize={'small'} />
          )}
          <Typography
            sx={{
              color: '#006B5E',
              fontSize: 14,
              fontWeight: 500,
              textAlign: 'center',
              lineHeight: '21px',
              letterSpacing: '0.02em',
              fontStyle: 'normal',
            }}
          >
            {!seeMore ? 'SEE MORE' : 'SEE LESS'}
          </Typography>
        </Box>
        <Grid item md={12}>
          <Box
            sx={{
              py: 2,
              background: onWebApp
                ? 'linear-gradient(180deg, #F1FCF9 0%, #B0FFF2 100%)'
                : 'linear-gradient(179.8deg, rgba(98, 98, 98, 0) 0.18%, #2D5F57 237.11%)',
              borderRadius: '8px',
              overflow: 'hidden',
              flexDirection: 'row',
              display: 'flex',
              justifyContent: 'space-around',
              mr: 2,
              mt: 2,
            }}
          >
            {cardDetails &&
              cardDetails.length &&
              cardDetails.map((detail: any, index: number) => (
                <CardDetails
                  key={index}
                  heading={detail?.heading}
                  value={detail?.value}
                />
              ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AdditionalDetails

interface TagProps {
  tag: string
}
const Tag: FC<TagProps> = ({ tag }) => {
  return (
    <Box
      sx={{
        mt: 1,
        fontSize: 14,
        backgroundColor: 'chipBgColor.main',
        padding: '9px 24px',
        borderRadius: '24px',
        mr: 1,
        color: 'chipTextColor.main',
        fontWeight: 500,
        lineHeight: '20px',
        letterSpacing: '0.1px',
        fontStyle: 'normal',
      }}
    >
      {tag}
    </Box>
  )
}

interface DetailsProps {
  heading: string
  value: string | string[]
}
const Details: FC<DetailsProps> = ({ heading, value }) => {
  return (
    <Grid item xs={10} md={5.5} sx={{ mt: 1 }}>
      <Box
        sx={{
          fontSize: 14,
          fontWeight: '600',
          color: 'textColor5.main',
          mb: 1,
          width: '100%',
          lineHeight: '21px',
          letterSpacing: '0.02em',
          fontStyle: 'normal',
        }}
      >
        {heading}
      </Box>
      {typeof value === 'string' ? (
        <Box
          sx={{ fontSize: 16, color: 'textColor2.main', width: '100%', mt: 1 }}
        >
          {value}
        </Box>
      ) : (
        value &&
        value.length &&
        value?.map((val: string, index: number) => (
          <Box
            key={index}
            sx={{
              fontSize: 16,
              color: 'textColor2.main',
              lineHeight: '21px',
              letterSpacing: '0.02em',
              fontStyle: 'normal',
            }}
          >
            {val}
          </Box>
        ))
      )}
    </Grid>
  )
}

interface CardDetailsProps {
  heading: string
  value: string
}
const CardDetails: FC<CardDetailsProps> = ({ heading, value }) => {
  return (
    <Box sx={{ textAlign: 'center', mt: 2 }}>
      <Box
        sx={{
          fontSize: 12,
          fontWeight: '600',
          color: 'textColor.main',
          lineHeight: '18px',
          letterSpacing: '0.01em',
          fontStyle: 'normal',
        }}
      >
        {heading}
      </Box>
      <Box
        sx={{
          fontSize: 32,
          fontWeight: '600',
          color: 'textColor4.main',
          lineHeight: '48px',

          fontStyle: 'normal',
        }}
      >
        {value}
      </Box>
    </Box>
  )
}
