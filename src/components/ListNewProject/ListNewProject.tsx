import {
  Button,
  Checkbox,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material'
import React, { useEffect } from 'react'
import { DatePicker } from '@mui/x-date-pickers'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation'
import CCInputField from '../../atoms/CCInputField'
import { Box } from '@mui/system'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import {
  setProjectArea,
  setProjectDuration,
  setProjectLocation,
  setProjectName,
  setProjectType,
  setStartDate,
  setEndDate,
  resetSectionNewProjectDetails,
  setBannerImage,
  setProjectImage,
} from '../../redux/Slices/newProjectSlice'
import Spinner from '../../atoms/Spinner'
import _without from 'lodash/without'
import moment from 'moment'
import HelpPopUp from '../Appbar/NavBar/Help/HelpPopUp'
import { IssuanceHelpContentData } from '../Appbar/NavBar/Help/SectionA/helpContentData'
import { setShowPopUp } from '../../redux/Slices/issuanceDataCollection'
import { PROJECT_TYPES } from '../../config/constants.config'
import CCDropAndUpload from '../../atoms/CCDropAndUpload/CCDropAndUpload'
import { deleteIndexInArray } from '../../utils/commonFunctions'



const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const ListNewProject = () => {
  const dispatch = useAppDispatch()

  const modal = useAppSelector(
    ({ issuanceDataCollection }) => issuanceDataCollection.showPopUp
  )
  const setModal = (item: any) => {
    dispatch(setShowPopUp(item))
  }
  const projectName = useAppSelector(
    ({ newProject }) => newProject.projectName,
    shallowEqual
  )
  const projectType = useAppSelector(
    ({ newProject }) => newProject.projectType,
    shallowEqual
  )
  const projectLocation = useAppSelector(
    ({ newProject }) => newProject.projectLocation,
    shallowEqual
  )
  const startDate = useAppSelector(
    ({ newProject }) => newProject.startDate,
    shallowEqual
  )
  const projectDuration = useAppSelector(
    ({ newProject }) => newProject.projectDuration,
    shallowEqual
  )
  const projectArea = useAppSelector(
    ({ newProject }) => newProject.projectArea,
    shallowEqual
  )
  const loading = useAppSelector(
    ({ newProject }) => newProject.loading,
    shallowEqual
  )

  const endDate = useAppSelector(
    ({ newProject }) => newProject.endDate,
    shallowEqual
  )
  const currentProjectDetails = useAppSelector(
    ({ issuanceDataCollection }) =>
      issuanceDataCollection.currentProjectDetails,
    shallowEqual
  )
  const bannerImage = useAppSelector(
    ({ newProject }) => newProject.bannerImage,
    shallowEqual
  )
  const projectImage = useAppSelector(
    ({ newProject }) => newProject.projectImage,
    shallowEqual
  )

  useEffect(() => {
    dispatch(resetSectionNewProjectDetails())
  }, [])

  useEffect(() => {
    if (currentProjectDetails) {
      const {
        company_name,
        type,
        location,
        start_date,
        end_date,
        duration,
        area,
        banner_image = null,
        project_image = null,
      } = currentProjectDetails
      dispatch(setProjectName(company_name))
      dispatch(setProjectType(type))
      dispatch(setProjectLocation(location))
      dispatch(setStartDate(start_date))
      end_date && dispatch(setEndDate(end_date))
      dispatch(setProjectDuration(duration))
      dispatch(setProjectArea(area))
      dispatch(setBannerImage(banner_image))
      dispatch(setProjectImage(project_image))
    }
  }, [currentProjectDetails])

  const handleChange = (event: SelectChangeEvent<typeof projectType>) => {
    const {
      target: { value },
    } = event
    dispatch(
      setProjectType(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value
      )
    )
  }

  const handleDelete = (e: React.MouseEvent, value: string) => {
    const projectTypes = [...projectType]
    const filterTypes = projectTypes.filter((item) => item !== value && item)
    dispatch(setProjectType(filterTypes))
  }

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    if (type === 'projectName') {
      dispatch(setProjectName(e?.target?.value))
    } else if (type === 'projectLocation') {
      dispatch(setProjectLocation(e?.target?.value))
    } else if (type === 'projectDuration') {
      //Allow only no.s upto 2 decimal places
      const regexp = /^\d+(\.\d{0,2})?$/
      if (regexp.test(e?.target?.value) || e?.target?.value === '') {
        dispatch(setProjectDuration(e?.target?.value))
      }
    } else if (type === 'projectArea') {
      //Allow only no.s upto 2 decimal places
      const regexp = /^\d+(\.\d{0,2})?$/
      if (regexp.test(e?.target?.value) || e?.target?.value === '') {
        dispatch(setProjectArea(e?.target?.value))
      }
    }
  }

  console.log('bannerImage', bannerImage)
  console.log('projectImage', projectImage)

  return loading === true ? (
    <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 450 }}>
      <Spinner />{' '}
    </Stack>
  ) : (
    <Grid container xs={12} spacing={2} sx={{ mt: 2 }}>
      <Grid item xs={12}>
        <CCInputField
          label="Project Name"
          placeholder="Enter Project Name"
          value={projectName}
          onChange={(e) => handleTextChange(e, 'projectName')}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl sx={{ width: '100%' }}>
          <InputLabel
            sx={{
              color: '#006B5E',
            }}
          >
            Project Type
          </InputLabel>
          <Select
            multiple
            value={projectType}
            onChange={handleChange}
            input={
              <OutlinedInput
                sx={{
                  color: '#006B5E',
                }}
                label="Project Type"
              />
            }
            sx={{
              color: '#006B5E',
              borderRadius: '4px 4px 0 0',
            }}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {(selected as string[]).map((value) => (
                  <Chip
                    sx={{
                      display: 'flex',
                      backgroundColor: '#1D4B44',
                      color: '#fff',
                      borderRadius: '16px',
                      fontSize: 14,
                      py: 1,
                      px: 2,
                    }}
                    key={value}
                    label={value}
                    clickable
                    deleteIcon={
                      <CancelPresentationIcon
                        style={{ color: 'white', marginLeft: 1 }}
                        onMouseDown={(event) => event.stopPropagation()}
                      />
                    }
                    onDelete={(e) => handleDelete(e, value)}
                    onClick={() => console.log('clicked chip')}
                  />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {PROJECT_TYPES.map((item) => (
              <MenuItem key={item} value={item}>
                <Checkbox checked={projectType.includes(item)} />
                <ListItemText primary={item} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <CCInputField
          label="Project Location"
          placeholder="Enter Project Location"
          value={projectLocation}
          onChange={(e) => handleTextChange(e, 'projectLocation')}
        />
      </Grid>
      <Grid item xs={12}>
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={(newValue) => {
            if (endDate && moment(newValue) > moment(endDate)) {
              alert('start date should not be greater than end date')
            } else {
              dispatch(setStartDate(newValue?.toISOString()))
            }
          }}
          components={{
            OpenPickerIcon: CalendarMonthOutlinedIcon,
          }}
          renderInput={(params) => <CCInputField {...params} />}
        />
      </Grid>
      <Grid item xs={12}>
        <DatePicker
          label="End Date"
          value={endDate}
          disabled={!startDate ? true : false}
          minDate={moment(startDate)}
          onChange={(newValue) => {
            dispatch(setEndDate(newValue?.toISOString()))
          }}
          components={{
            OpenPickerIcon: CalendarMonthOutlinedIcon,
          }}
          renderInput={(params) => (
            <CCInputField {...params} required={false} />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <CCInputField
          label="Project Duration(Years)"
          placeholder="Enter Project Duration(Years)"
          value={projectDuration}
          onChange={(e) => {
            handleTextChange(e, 'projectDuration')
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ position: 'relative' }}>
          <Box>
            <CCInputField
              label="Project Area"
              placeholder="Enter Project Area"
              value={projectArea}
              onChange={(e) => handleTextChange(e, 'projectArea')}
              required={false}
            />
          </Box>
          <Box
            sx={{ color: '#3F4946', position: 'absolute', top: 16, right: 5 }}
          >
            SqKm
          </Box>
        </Box>
      </Grid>
      <Grid item sx={{ mt: 1 }} xs={12}>
        <CCDropAndUpload
          title={'Upload Project Banner Image'}
          imageArray={bannerImage}
          multiple={false}
          onImageUpload={(item: any) => {
            // console.log('[...bannerImage, item]', [...bannerImage, item])
            console.log('item', item)
            // const temp = bannerImage ? [...bannerImage] : []
            // temp.push(item)
            // console.log('temp', temp)
            dispatch(setBannerImage([item[item.length - 1]]))
          }}
          onDeleteImage={(index: number) => {
            dispatch(setBannerImage(deleteIndexInArray(bannerImage, index)))
          }}
          required={true}
        />
      </Grid>
      <Grid item sx={{ mt: 1 }} xs={12}>
        <CCDropAndUpload
          title={'Upload Project Images'}
          imageArray={projectImage}
          onImageUpload={(item: any) => {
            // const temp = projectImage ? [...projectImage] : []
            // temp.push(item)
            dispatch(setProjectImage(item))
          }}
          onDeleteImage={(index: number) => {
            dispatch(setProjectImage(deleteIndexInArray(projectImage, index)))
          }}
          required={true}
        />
      </Grid>
      <HelpPopUp
        modal={modal}
        setModal={(item: any) => setModal(item)}
        data={IssuanceHelpContentData?.projectIntro}
        issuanceVisible={true}
      />
    </Grid>
  )
}

export default ListNewProject
