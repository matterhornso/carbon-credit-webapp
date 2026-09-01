import { Box } from '@mui/system'
import React, { FC, useEffect, useState } from 'react'
import CCButton from '../../../atoms/CCButton'
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined'
import { Images } from '../../../theme'
import { pathNames } from '../../../routes/pathNames'
import { useLocation, useNavigate, createSearchParams } from 'react-router-dom'
import { shallowEqual } from 'react-redux'
import { useAppSelector, useAppDispatch } from '../../../hooks/reduxHooks'
import { Chip, Grid, Stack, Tooltip, Typography } from '@mui/material'
import { limitTitle } from '../../../utils/commonFunctions'
import { FileDownloadSharp } from '@mui/icons-material'
import { fileUploadCalls } from '../../../api/fileUpload.api'
import {
  IMAGE_SIZE_PREFIXES,
  PROJECT_ALL_STATUS,
  PROJECT_STATUS_NAME,
} from '../../../config/constants.config'
import { setCacheBannerImages } from '../../../redux/Slices/marketPlaceCachingSlice'
import CircleIcon from '@mui/icons-material/Circle'
import { getEditorBlockData } from '../../../utils/editor.util'
import { PROJECT_STATUS_FILTER } from '../../../config/projectDraft.config'
import { handleApiError } from '../../../utils/errorHandler'

interface ProjectDetailsCardProps {
  project: any
  navigationAction: any
  justifyContent?: string
  [x: string]: any
}

const ProjectDetailsCard: FC<ProjectDetailsCardProps> = (props) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const location = useLocation()

  const { project, navigationAction, justifyContent = 'center' } = props
  console.log('projects_from_card: ', project)
  const onWebApp = useAppSelector(({ app }) => !app.throughIFrame, shallowEqual)
  const cacheBannerImages = useAppSelector(
    ({ marketplaceCaching }) => marketplaceCaching.cacheBannerImages,
    shallowEqual
  )
  const [fields, setFields] = useState<any>([])

  const [bannerImage, setBannerImage] = useState<any>(false)

  const { token_details, totalToken, minimum_rate } = props.project

  const getImage = async (img: any) => {
    try {
      const res = await fileUploadCalls.getFile(img)
      if (res) {
        setBannerImage(URL.createObjectURL(res))
      }
    } catch (e) {
      handleApiError(e, { action: 'ProjectDetailsCard.getImage' })
    }
  }

  useEffect(() => {
    if (project?.projectIntroduction?.project_img) {
      getImage(project?.projectIntroduction?.project_img)
    }
  }, [project])

  const staticCardTiles = [
    'High Climate Impact',
    'High Additionality',
    'Energy Transition',
    '10 SDGs',
  ]
  // useEffect(() => {
  //   const fieldList = [
  //     {
  //       label: 'Price Per Token',
  //       value: minimum_rate,
  //     },
  //     {
  //       label: 'Tokens Available',
  //       value: totalToken,
  //     },
  //     // {
  //     //   label: 'Tokens Name :',
  //     //   value: tokens?.token_name
  //     // },
  //     // {
  //     //   label: 'Token Type :',
  //     //   value:tokens?.token_type
  //     // },
  //   ]
  //   setFields(fieldList)
  //   //get bannerImage
  //   const isBanner = cacheBannerImages[project?.uuid] ? false : true
  //   if (isBanner) {
  //     const data = project
  //     fileUploadCalls
  //       .getFile(IMAGE_SIZE_PREFIXES.THUMBNAIL + data?.banner_image[0])
  //       .then((res) => {
  //         dispatch(
  //           setCacheBannerImages({
  //             [data?.uuid]: URL.createObjectURL(res),
  //           })
  //         )
  //         setBannerImage(URL.createObjectURL(res))
  //       })
  //   }
  //   if (!bannerImage && project?.banner_image[0] && !isBanner) {
  //     setBannerImage(cacheBannerImages[project?.uuid])
  //   }
  // }, [project])

  const onClickHandler = () => {
    window.scrollTo(0, 0)
    navigate(
      {
        pathname: pathNames.PROJECT_DETAILS,
        search: `?${createSearchParams({ projectId: project.uuid })}`,
      },
      { state: project }
    )
  }

  const getStatusTitle = (projectStatus: any) => {
    const obj = PROJECT_STATUS_FILTER.find((i: any) => {
      return i?.status.includes(projectStatus)
    })
    return obj?.name ? obj?.name : '-'
  }

  console.log(project?.projectIntroduction)
  return (
    <Grid
      item
      // sm={12}
      // md={4}
      // lg={4}
      // xl={3}
      display="flex"
      justifyContent={justifyContent}
      alignItems="flex-start"
      sx={{
        width: '360px',
        height: '465px',
        borderRadius: '8px',
        mr: 2,
        mb: 3,
      }}
      {...props}
    >
      <Box
        sx={{
          cursor: 'pointer',
          width: '360px',
          // mb: 2,
          borderRadius: '8px',
          transition: 'transform .1s',
          // mr: 4,
          // height: '100%',
          boxShadow: onWebApp
            ? '0px 5px 25px rgba(0, 0, 0, 0.12)'
            : '1px 1px 15px 1px rgba(0, 0, 0, 0.19)',
          '&:hover': {
            transform: 'scale(1.01)',
          },
        }}
        onClick={() => onClickHandler()}
      >
        <Box sx={{ borderRadius: 1, height: '180px', position: 'relative' }}>
          <img
            src={
              onWebApp
                ? bannerImage
                  ? bannerImage
                  : Images.ProjectLight
                : bannerImage
                ? bannerImage
                : Images.Project
              // onWebApp
              // ? project?.projectIntroduction?.project_img
              //   ? project?.projectIntroduction?.project_img
              //   : Images.ProjectLight
              // : bannerImage
              // ? bannerImage
              // : Images.Project
            }
            alt=""
            width="100%"
            height="180px"
            style={{ objectFit: 'cover', borderRadius: '8px' }}
          />
          <Box
            sx={{
              padding: '5px',
              position: 'absolute',
              bottom: '-15px',
              right: '10px',
              background: '#DEFFDC',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '10px',
            }}
          >
            {/* <Box
              sx={{
                borderRadius: '50%',
                color: '#5AB852',
                width: '10px',
                height: '10px',
              }}
            ></Box> */}
            <CircleIcon sx={{ color: '#5AB852', fontSize: 10 }} />
            <Typography
              sx={{
                // background: onWebApp ? '#CCE8E1' : '#1C3531',
                // color: onWebApp ? '#006B5E' : '#BFC9C6',
                padding: '4px 8px',
                fontSize: '11px',
                fontWeight: 500,
              }}
            >
              {/* {project?.project_status ===
              PROJECT_ALL_STATUS.REGISTRY_VERIFIES_AND_SUBMITS_THE_REPORT
                ? 'Registered Project'
                : 'Provisional Project'} */}
              Active
            </Typography>
          </Box>
        </Box>
        <Box sx={{ padding: '30px 20px' }}>
          <Typography sx={{ color: '#01717F', fontWeight: 500, fontSize: 10 }}>
            Avoidance & Reduction Mechanism
          </Typography>
          <Typography
            sx={{
              pt: 1,
              fontWeight: 600,
              fontSize: 32,
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
            {getEditorBlockData(project?.projectIntroduction?.name?.data) ||
              project?.projectIntroduction?.name?.data}
            {/* Panama Reforestation Services ARR */}
          </Typography>
          <Stack flexDirection={'row'} sx={{ pt: '5px', gap: 1 }}>
            <FmdGoodOutlinedIcon sx={{ color: '#0D5058' }} />

            <Typography sx={{ color: '#0D0E0E' }}>
              {/* {getEditorBlockData(project?.projectIntroduction?.name?.data)} */}
              {`${
                getEditorBlockData(project?.projectIntroduction?.name?.data) ||
                project?.projectIntroduction?.name?.data
              }, ${
                getEditorBlockData(
                  project?.projectIntroduction?.location?.data
                ) || project?.projectIntroduction?.location?.data
              }`}
              {/* Panama, South Africa */}
            </Typography>
          </Stack>
          <Box sx={{ mt: '20px', mb: '16px' }}>
            <Chip
              label={getStatusTitle(project?.project_status) || '-'}
              sx={{
                background: '#DEFFDC',
                color: '#5AB852',
                borderRadius: '24px',
                p: '23px 20px',
                fontWeight: 500,
                fontSize: 14,
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '4px', mt: 1 }}>
            {staticCardTiles.map((i: any, idx: number) => (
              <Box
                key={idx}
                sx={{ background: '#DCCDFC', borderRadius: '4px', p: 1 }}
              >
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: 10,
                    color: '#4B357D',
                    textAlign: 'center',
                  }}
                >
                  {i}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Grid>
  )
}

export default ProjectDetailsCard

// <>
// <Box
//       sx={{
//         px: 2,
//         pt: 2,
//         pb: 2,
//         color: onWebApp ? '#00201B' : '#E1E3E1',
//         background: onWebApp ? '#fff' : '#191C1B',
//         borderBottom: '1px solid #96B1AB',
//       }}
//     >
//       <Grid container sx={{ mb: 1 }}>
//         {/* <Grid item> */}
//         {/* <Typography
//             sx={{
//               background: onWebApp ? '#CCE8E1' : '#1C3531',
//               color: onWebApp ? '#006B5E' : '#BFC9C6',
//               padding: '4px 8px',
//               fontSize: '11px',
//               fontWeight: 500,
//               borderRadius: '4px',
//             }}
//           >
//             {project?.project_status ===
//             PROJECT_ALL_STATUS.REGISTRY_VERIFIES_AND_SUBMITS_THE_REPORT
//               ? 'Registered Project'
//               : 'Provisional Project'}
//           </Typography> */}
//         {/* </Grid> */}
//       </Grid>
//       <Box
//         sx={{
//           height: 48,
//           fontSize: 16,
//           fontWeight: 500,
//           wordBreak: 'break-all',
//         }}
//       >
//         {limitTitle(project?.company_name, 47) || '--'}
//       </Box>
//       <Box
//         sx={{
//           mt: 1,
//           display: 'flex',
//           justifyContent: 'flex-start',
//           alignItems: 'center',
//         }}
//       >
//         <FmdGoodOutlinedIcon sx={{ color: '#006B5E', ml: '-3px' }} />
//         <Box
//           sx={{
//             minHeight: '30px',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}
//         >
//           <Typography sx={{ fontSize: 10, fontWeight: 500 }}>
//             {' '}
//             {`Project Location ${
//               project?.location || 'Lexington, Ohio, United States'
//             } | Project Area ${project?.area || '53.4'} Sq.Km`}
//           </Typography>
//         </Box>
//       </Box>
//     </Box>
//     <Box
//       sx={{
//         px: 2,
//         pb: 1,
//         pt: 3,
//         color: onWebApp ? '#00201B' : '#E1E3E1',
//         background: onWebApp ? '#fff' : '#191C1B',
//         borderRadius: '0 0 8px 8px',
//       }}
//     >
//       {fields.some((i: any) => i.value) ||
//       location.pathname === pathNames.PROJECT_LISTS_WITH_FILTER ? (
//         <Grid
//           container
//           columns={12}
//           sx={{
//             fontSize: 12,
//             fontWeight: 500,
//             display: 'flex',
//             justifyContent: 'space-between',
//           }}
//         >
//           {fields.map((field: any, index: number) => {
//             return (
//               <Grid
//                 item
//                 xs={6}
//                 key={index.toString()}
//                 sx={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   justifyContent: 'space-between',
//                 }}
//               >
//                 <Typography
//                   sx={{
//                     textTransform: 'uppercase',
//                     color: '#747876',
//                     fontWeight: 600,
//                     fontSize: 14,
//                     letterSpacing: '0.02em',
//                   }}
//                 >
//                   {field?.label}
//                 </Typography>
//                 <Tooltip title={field?.value}>
//                   <Typography
//                     sx={{
//                       color: '#141D1B',
//                       fontSize: 16,
//                       letterSpacing: '0.02em',
//                     }}
//                   >
//                     {limitTitle(field.value, 10) || '--'}
//                   </Typography>
//                 </Tooltip>
//               </Grid>
//             )
//           })}
//         </Grid>
//       ) : (
//         <Box sx={{ pt: 1, height: 46, fontSize: 15, fontWeight: 500 }}>
//           {project.project_status <= 3
//             ? PROJECT_STATUS_NAME.PROJECT_DESCRIPTION_UPLOADED
//             : project.project_status <= 6
//             ? PROJECT_STATUS_NAME.VERIFYING_PROJECT
//             : project.project_status <= 8
//             ? PROJECT_STATUS_NAME.VALIDATING_PROJECT
//             : null}
//         </Box>
//       )}
//     </Box></>
