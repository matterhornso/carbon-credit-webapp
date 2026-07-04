import { Box } from '@mui/system'
import React, { FC, useEffect, useState } from 'react'
import CCButton from '../../atoms/CCButton'
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined'
import { Colors, Images } from '../../theme'
import { pathNames } from '../../routes/pathNames'
import { useLocation, useNavigate, createSearchParams } from 'react-router-dom'
import { shallowEqual } from 'react-redux'
import { useAppSelector } from '../../hooks/reduxHooks'
import { Grid, Tooltip, Typography } from '@mui/material'
import { limitTitle } from '../../utils/commonFunctions'
import { FileDownloadSharp } from '@mui/icons-material'
import { fileUploadCalls } from '../../api/fileUpload.api'
import LabelInput from '../../atoms/LabelInput/LabelInput'
import { IMAGE_SIZE_PREFIXES } from '../../config/constants.config'

interface ProjectDetailsCardProps {
  project: any
  navigationAction: any
  justifyContent?: string
  [x: string]: any
}
const ProjectCards: FC<ProjectDetailsCardProps> = (props) => {
  const navigate = useNavigate()

  const { project, navigationAction, justifyContent = 'center' } = props
  const onWebApp = useAppSelector(({ app }) => !app.throughIFrame, shallowEqual)
  const [fields, setFields] = useState<any>([])

  const [bannerImage, setBannerImage] = useState<any>(false)

  useEffect(() => {
    const data = project

    if (data?.project_details?.banner_image?.length) {
      fileUploadCalls
        .getFile(
          IMAGE_SIZE_PREFIXES.THUMBNAIL + data?.project_details?.banner_image[0]
        )
        .then((res) => setBannerImage(URL.createObjectURL(res)))
    }
  }, [project])

  useEffect(() => {
    const { balance = 0, retire = 0 } = props.project
    const fieldList = [
      {
        label: 'CURRENTLY AVAILABLE: ',
        value: balance,
      },
      {
        label: 'RETIREMENT AMOUNT:',
        value: retire,
      },
      {
        label: 'TOKENS LEFT AFTER RETIRING:',
        value: balance,
      },
    ]

    setFields(fieldList)
  }, [props.project])

  return (
    <Grid
      item
      sm={12}
      md={6}
      lg={4}
      xl={3}
      display="flex"
      justifyContent={justifyContent}
      alignItems="flex-start"
      sx={{ mt: 2 }}
      {...props}
    >
      <Box
        sx={{
          width: '360px',
          // mb: 2,
          borderRadius: '8px',
          // mr: 4,
          height: '100%',
          boxShadow: onWebApp ? '0px 5px 25px rgba(0, 0, 0, 0.12)' : '',
        }}
      >
        <Box sx={{ borderRadius: '8px 8px 0 0' }}>
          <Box
            sx={{
              position: 'relative',
              borderRadius: '8px 8px 0 0',
            }}
          >
            <Box sx={{ borderRadius: '8px 8px 0 0' }}>
              <img
                src={
                  onWebApp
                    ? bannerImage
                      ? bannerImage
                      : Images.ProjectLight
                    : bannerImage
                    ? bannerImage
                    : Images.Project
                }
                alt=""
                width="100%"
                height="147px"
                style={{ objectFit: 'cover' }}
              />
            </Box>
            <Box
              sx={{
                position: 'absolute',
                background: onWebApp ? '#CCE8E1' : '#1C3531',
                color: onWebApp ? '#006B5E' : '#BFC9C6',
                padding: '4px 8px',
                fontSize: '11px',
                fontWeight: 500,
                top: '5px',
                left: '8px',
              }}
            >
              {project?.token_address
                ? 'Registered Project'
                : 'Provisional Project'}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            px: 2,
            pt: 2,
            pb: 1,
            color: onWebApp ? '#00201B' : '#E1E3E1',
            background: onWebApp ? '#fff' : '#191C1B',
            borderBottom: '1px solid #899390',
          }}
        >
          <Box
            sx={{
              fontSize: 16,
              fontWeight: 500,
              wordBreak: 'break-word',
              minHeight: '48px',
            }}
          >
            {limitTitle(project?.company_name, 45) || '--'}
          </Box>
          <Box
            sx={{
              mt: 1,
              display: 'flex',
              // justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FmdGoodOutlinedIcon sx={{ color: '#006B5E', ml: '-3px' }} />
            <Box
              sx={{
                fontSize: 10,
                fontWeight: 500,
                minHeight: '30px',
                color: '#006B5E',
              }}
            >
              {`Project Location ${
                project?.location || 'Lexington, Ohio, United States'
              } | Project Area ${project?.area || '53.4'} Sq.Km`}
            </Box>
          </Box>
        </Box>
        {/* <Box
          sx={{
            p: 2,
            bgcolor: '#fff',
          }}
        >
          <Typography color="#00201B">Approve Tokens</Typography>
          <LabelInput
            label="Quantity"
            sx={{ width: '100%' }}
            value={retiring}
            setValue={(e: any) => {
              //Allow only no.s upto 3 decimal places
              const regexp = /^\d+(\.\d{0,3})?$/
              if (regexp.test(e?.target?.value) || e?.target?.value === '') {
                setRetiring(e?.target?.value)
              }
            }}
          />
        </Box> */}
        <Box
          sx={{
            px: 2,
            pb: 2,
            pt: 1,
            color: onWebApp ? '#00201B' : '#E1E3E1',
            background: onWebApp ? '#fff' : '#191C1B',
            borderRadius: '0 0 8px 8px',
          }}
        >
          <Box sx={{ fontSize: 12, fontWeight: 500 }}>
            {fields.map((field: any, index: number) => {
              return (
                <Box
                  key={index.toString()}
                  sx={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <Box sx={{ width: '70%' }}>{field?.label}</Box>
                  <Tooltip title={field?.value}>
                    <Box sx={{ width: '30%' }}>
                      {limitTitle(field.value, 10) || 0}
                    </Box>
                  </Tooltip>
                </Box>
              )
            })}
          </Box>
          <Box>
            <CCButton
              variant="contained"
              sx={{
                mt: 3,
                background: Colors.textColorLightGreen,
                width: '100%',
                height: '30px',
                borderRadius: '16px',
                color: Colors.white,
                fontSize: 14,
                fontWeight: 500,
              }}
              onClick={() =>
                navigate(pathNames.RETIRE_TOKENS, {
                  state: {
                    tokenDetails: props?.project?.token_details,
                    tokenAddress: props?.project?.token_address,
                    projectID: props?.project?.project_details?._id,
                    projectUUID: props?.project?.project_details?.uuid,
                  },
                })
              }
              // disabled={!props?.project?.tokens?.token_symbol}
            >
              Retire
            </CCButton>
          </Box>
        </Box>
      </Box>
    </Grid>
  )
}

export default ProjectCards
