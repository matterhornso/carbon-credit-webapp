import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material'
import React from 'react'
import { shallowEqual } from 'react-redux'
import CCButton from '../../atoms/CCButton'
import CCInputField from '../../atoms/CCInputField'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
  resetIssuanceDataCollectionHelpReducer,
  setFilteredRows,
  setMethodology,
  setProjectType,
  setStandard,
  setTitle,
} from '../../redux/Slices/issuanceDataCollectionHelpSlice'
import { Colors } from '../../theme'
import { data, projectTypes } from './data'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 800,
    },
  },
}

const ProjectsSearch = () => {
  const dispatch = useAppDispatch()

  const title = useAppSelector(
    ({ issuanceDataCollectionHelp }) => issuanceDataCollectionHelp.title,
    shallowEqual
  )
  const projectType = useAppSelector(
    ({ issuanceDataCollectionHelp }) => issuanceDataCollectionHelp.projectType,
    shallowEqual
  )
  const methodology = useAppSelector(
    ({ issuanceDataCollectionHelp }) => issuanceDataCollectionHelp.methodology,
    shallowEqual
  )
  const standard = useAppSelector(
    ({ issuanceDataCollectionHelp }) => issuanceDataCollectionHelp.standard,
    shallowEqual
  )

  console.log('projectType', projectType)
  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    if (type === 'title') {
      dispatch(setTitle(e?.target?.value))
      // }
      // else if (type === 'projectType') {
      //   dispatch(setProjectType(e?.target?.value))
    } else if (type === 'methodology') {
      dispatch(setMethodology(e?.target?.value))
    } else if (type === 'standard') {
      dispatch(setStandard(e?.target?.value))
    }
    // else if (type === 'projectArea') {
    //   //Allow only no.s upto 2 decimal places
    //   const regexp = /^\d+(\.\d{0,2})?$/
    //   if (regexp.test(e?.target?.value) || e?.target?.value === '') {
    //     dispatch(setProjectArea(e?.target?.value))
    //   }
    // }
  }

  const handleSearch = () => {
    // const newRows = data.filter((row: any) => {
    //Filter with OR cond
    // return (
    //   (title && row?.title.toLowerCase().includes(title.toLowerCase())) ||
    //   (projectType &&
    //     row?.projectType.toLowerCase().includes(projectType.toLowerCase())) ||
    //   (methodology &&
    //     row?.methodology.toLowerCase().includes(methodology.toLowerCase())) ||
    //   (standard &&
    //     row?.standard.toLowerCase().includes(standard.toLowerCase()))
    // )
    // })

    //Filter with AND cond
    let newRows = [...data]
    if (title) {
      newRows = newRows.filter(
        (row: any) =>
          title && row?.title.toLowerCase().includes(title.toLowerCase())
      )
    }
    if (projectType) {
      newRows = newRows.filter(
        (row: any) =>
          projectType &&
          // row?.projectType.toLowerCase().includes(projectType.toLowerCase())
          row?.projectType.toLowerCase() === projectType.toLowerCase()
      )
    }
    if (methodology) {
      newRows = newRows.filter(
        (row: any) =>
          methodology &&
          row?.methodology.toLowerCase().includes(methodology.toLowerCase())
      )
    }
    if (standard) {
      newRows = newRows.filter(
        (row: any) =>
          standard &&
          row?.standard.toLowerCase().includes(standard.toLowerCase())
      )
    }
    dispatch(setFilteredRows(newRows))
  }
  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setProjectType(event.target.value as string))
  }

  return (
    <Box
      sx={{
        px: 4,
        py: 2,
        paddingBottom: '100px',
      }}
    >
      <Typography sx={{ color: Colors.darkPrimary1, fontSize: 22 }}>
        Search Criteria
      </Typography>
      <CCInputField
        sx={{ mt: 4 }}
        label="Title"
        placeholder="Search from Title"
        value={title}
        onChange={(e) => handleTextChange(e, 'title')}
      />
      <FormControl fullWidth sx={{ mt: 1 }}>
        <InputLabel id="demo-simple-select-label">Project Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={projectType}
          label="Project Type"
          onChange={handleChange}
          sx={{ whiteSpace: 'normal' }}
          MenuProps={MenuProps}
        >
          {projectTypes.map((item: any) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <CCInputField
        sx={{ mt: 1 }}
        label="Methodology"
        placeholder="Search from Methodology"
        value={methodology}
        onChange={(e) => handleTextChange(e, 'methodology')}
      />
      <CCInputField
        sx={{ mt: 1 }}
        label="Standard"
        placeholder="Search from Standard"
        value={standard}
        onChange={(e) => handleTextChange(e, 'standard')}
      />
      <Box sx={{ display: 'flex', flex: 1, justifyContent: 'end' }}>
        <CCButton
          variant="contained"
          sx={{
            backgroundColor: '#fff',
            textTransform: 'none',
            minWidth: 0,
            borderRadius: '100px',
            marginBottom: 4,
            marginTop: 3,
            padding: '10px 16px 10px 16px',
            border: '1px solid #f3ba4d',
          }}
          onClick={() => dispatch(resetIssuanceDataCollectionHelpReducer())}
          disabled={!title && !projectType && !methodology && !standard}
        >
          <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#005046' }}>
            Clear Search
          </Typography>
        </CCButton>
        <CCButton
          variant="contained"
          sx={{
            backgroundColor: '#F3BA4D',
            textTransform: 'none',
            minWidth: 0,
            borderRadius: '100px',
            marginBottom: 4,
            marginTop: 3,
            padding: '10px 24px 10px 24px',
            ml: 2,
          }}
          onClick={handleSearch}
          disabled={!title && !projectType && !methodology && !standard}
        >
          <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#005046' }}>
            Search
          </Typography>
        </CCButton>
      </Box>
    </Box>
  )
}

export default ProjectsSearch
