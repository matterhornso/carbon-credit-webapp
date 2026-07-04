import {
  Box,
  Checkbox,
  Chip,
  createTheme,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
} from '@mui/material'
import React, { useEffect } from 'react'
import CCButton from '../../../atoms/CCButton'
import CCInputField from '../../../atoms/CCInputField'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import { setMethodologies } from '../../../redux/Slices/sectionASlice'
import ArrowDropDown from '@mui/icons-material/ArrowDropDown'
import ArrowDropUp from '@mui/icons-material/ArrowDropUp'
import Spinner from '../../../atoms/Spinner'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation'
import HelpPopUp from '../../Appbar/NavBar/Help/HelpPopUp'
import { IssuanceHelpContentData } from '../../Appbar/NavBar/Help/SectionA/helpContentData'
import { setShowPopUp } from '../../../redux/Slices/issuanceDataCollection'
import CCMultilineTextArea from '../../../atoms/CCMultilineTextArea'
import { METHODOLOGIES, PROJECT_TYPES } from '../../../config/constants.config'
import CCDropAndUpload from '../../../atoms/CCDropAndUpload/CCDropAndUpload'
import { deleteIndexInArray } from '../../../utils/commonFunctions'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { initialState } from '../../../redux/Slices/themeSlice'
import { ThemeProvider } from '@mui/system'
interface methodologiesInterface {
  approvedMethodologies: string
  projectType: string
  category: string
  version: string
  toolsReferred: string
}

const SectionA4 = () => {
  const dispatch = useAppDispatch()

  const theme = createTheme({
    components: {
      MuiFormLabel: {
        styleOverrides: {
          asterisk: {
            color: 'red',
          },
        },
      },
    },
    ...initialState,
  })

  const currentProjectDetails = useAppSelector(
    ({ issuanceDataCollection }) =>
      issuanceDataCollection.currentProjectDetails,
    shallowEqual
  )

  const modal = useAppSelector(
    ({ issuanceDataCollection }) => issuanceDataCollection.showPopUp
  )
  const setModal = (item: any) => {
    dispatch(setShowPopUp(item))
  }

  useEffect(() => {
    if (currentProjectDetails.section_a.step4.completed) {
      const { methodologies } = currentProjectDetails.section_a.step4
      let step4Data = []
      step4Data = methodologies.map((item: any) => {
        return {
          methodology: item.methodology,
          project_type: item.project_type,
          category: item.category,
          version: item.version,
          tools: item.tools,
          applicability_of_methodology: item.applicability_of_methodology,
          applicable_methodology: item.applicable_methodology,
          deviation_of_methodology: item.deviation_of_methodology,
          other_info: item.other_info,
          flag: false,
        }
      })
      dispatch(setMethodologies(step4Data))
    }
  }, [])

  const methodologies = useAppSelector(
    ({ sectionA }) => sectionA.methodologies,
    shallowEqual
  )
  const loading = useAppSelector(
    ({ newProject }) => newProject.loading,
    shallowEqual
  )

  const addMethodology = () => {
    const methodologiesCopy = [...methodologies]
    methodologiesCopy.push({
      methodology: '',
      project_type: [],
      category: '',
      version: '',
      tools: '',
      applicability_of_methodology: [],
      deviation_of_methodology: '',
      applicable_methodology: '',
      other_info: '',
      flag: false,
    })
    dispatch(setMethodologies(methodologiesCopy))
  }

  const handleTextChange = (e: any, index: number, type: string) => {
    const methodologiesCopy = [...methodologies]
    let objectToChange = methodologiesCopy[index]
    objectToChange = { ...objectToChange, [type]: e.target.value }
    methodologiesCopy[index] = objectToChange
    dispatch(setMethodologies(methodologiesCopy))
  }

  const handleDropDownChange = (e: boolean, index: number, type: string) => {
    const methodologiesCopy = [...methodologies]
    let objectToChange = methodologiesCopy[index]
    objectToChange = { ...objectToChange, [type]: e }
    methodologiesCopy[index] = objectToChange
    dispatch(setMethodologies(methodologiesCopy))
  }

  const uploadChange = (item: any, index: number, type: string) => {
    const methodologiesCopy = [...methodologies]
    let objectToChange = methodologiesCopy[index]
    objectToChange = {
      ...objectToChange,
      [type]: [...item],
    }
    methodologiesCopy[index] = objectToChange
    dispatch(setMethodologies(methodologiesCopy))
  }

  const fileDeleteChange = (value: any, index: number, type: string) => {
    const methodologiesCopy = [...methodologies]
    let objectToChange = methodologiesCopy[index]
    objectToChange = { ...objectToChange, [type]: value }
    methodologiesCopy[index] = objectToChange
    dispatch(setMethodologies(methodologiesCopy))
  }

  const handleDelete = (
    e: React.MouseEvent,
    value: string,
    index: number,
    type: string
  ) => {
    const methodologiesCopy = [...methodologies]

    const filterTypes = methodologiesCopy[index]?.project_type.filter(
      (item: any) => item !== value && item
    )
    let objectToChange = methodologiesCopy[index]
    objectToChange = { ...objectToChange, [type]: filterTypes }
    methodologiesCopy[index] = objectToChange
    dispatch(setMethodologies(methodologiesCopy))
  }

  const handleMethodologyRow = (index: any) => {
    let methodologiesCopy = [...methodologies]

    const objectToNotDelete = methodologiesCopy.filter(
      (methodologyRow, methodologyRowIndex) => methodologyRowIndex !== index
    )
    methodologiesCopy = objectToNotDelete
    dispatch(setMethodologies(methodologiesCopy))
  }

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

  return loading === true ? (
    <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 450 }}>
      <Spinner />
    </Stack>
  ) : (
    <Box className="issuance_data_section_scroll">
      <Typography sx={{ mt: 3 }}>
        The methodologies applied for the project activity under consideration
        are* -
      </Typography>

      {methodologies.map((item, index) => (
        <Box
          key={index}
          sx={{
            direction: 'row',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: item.flag === true ? 'flex-start' : 'center',
          }}
        >
          <Grid
            key={index}
            container
            sx={{
              border: ' 1px solid #DAE5E1',
              borderRadius: '8px',
              padding: '20px',
              marginY: '10px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                paddingX: '5px',
                cursor: 'pointer',
              }}
            >
              <Typography
                sx={{ width: '100%', marginY: '10px', marginLeft: '-10pn' }}
              >
                Methodology {index + 1}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onClick={() => handleDropDownChange(!item?.flag, index, 'flag')}
              >
                {item?.flag ? <ArrowDropUp /> : <ArrowDropDown />}
              </Box>
            </Box>
            {item?.flag && (
              <>
                <Grid
                  item
                  sx={{ mt: 2 }}
                  xs={12}
                  md={12}
                  lg={12}
                  xl={12}
                  rowSpacing={1}
                >
                  <ThemeProvider theme={theme}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label" required>
                        Select Methodology
                      </InputLabel>
                      <Select
                        placeholder="Select Approved Methodologies"
                        sx={{
                          background: 'white',
                          color: '#006B5E',
                          borderRadius: '4px 4px 0 0',
                        }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Select Methodology *"
                        value={item?.methodology}
                        onChange={(e) =>
                          handleTextChange(e, index, 'methodology')
                        }
                        MenuProps={MenuProps}
                      >
                        {METHODOLOGIES?.map((item: any) => (
                          <MenuItem
                            key={item}
                            value={`${item}`}
                            sx={{
                              background: '#FAFDFA',
                              width: '100%',
                            }}
                          >
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </ThemeProvider>
                </Grid>
                <Grid
                  item
                  sx={{ mt: 1 }}
                  xs={12}
                  md={12}
                  lg={12}
                  xl={12}
                  rowSpacing={1}
                >
                  <ThemeProvider theme={theme}>
                    <FormControl fullWidth required>
                      <InputLabel id="demo-simple-select-label">
                        Project Type
                      </InputLabel>
                      <Select
                        multiple
                        value={item?.project_type}
                        onChange={(e) =>
                          handleTextChange(e, index, 'project_type')
                        }
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
                        renderValue={(selected: any) => (
                          <Box
                            sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                          >
                            {selected.map((value: any) => (
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
                                    onMouseDown={(event) =>
                                      event.stopPropagation()
                                    }
                                  />
                                }
                                onDelete={(e) =>
                                  handleDelete(e, value, index, 'project_type')
                                }
                              />
                            ))}
                          </Box>
                        )}
                        MenuProps={MenuProps}
                      >
                        {PROJECT_TYPES.map((item2) => (
                          <MenuItem key={item2} value={item2}>
                            <Checkbox
                              checked={item?.project_type?.includes(item2)}
                            />
                            <ListItemText primary={item2} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </ThemeProvider>
                </Grid>
                <Grid
                  item
                  sx={{ mt: 1 }}
                  xs={12}
                  md={12}
                  lg={12}
                  xl={12}
                  rowSpacing={1}
                >
                  <CCInputField
                    label="Category"
                    placeholder="Enter Category of Project Type"
                    value={item?.category}
                    onChange={(e) => handleTextChange(e, index, 'category')}
                    sx={{ background: 'white' }}
                  />
                </Grid>

                <Grid
                  item
                  sx={{ mt: 1 }}
                  xs={12}
                  md={12}
                  lg={12}
                  xl={12}
                  rowSpacing={1}
                >
                  <CCInputField
                    label="Version"
                    placeholder="Enter version of the baseline and monitoring methodology"
                    value={item?.version}
                    onChange={(e) => {
                      const regexp = /^[0-9a-zA-Z ]+$/
                      if (
                        regexp.test(e?.target?.value) ||
                        e?.target?.value === ''
                      ) {
                        handleTextChange(e, index, 'version')
                      }
                    }}
                    sx={{ background: 'white' }}
                  />
                </Grid>
                <Grid
                  item
                  sx={{ mt: 1 }}
                  xs={12}
                  md={12}
                  lg={12}
                  xl={12}
                  rowSpacing={1}
                >
                  <CCInputField
                    label="Tools referred"
                    placeholder="Enter tools to calculate or determine the baseline and monitoring methodology"
                    value={item?.tools}
                    onChange={(e) => {
                      const regexp = /^[0-9a-zA-Z ]+$/
                      if (
                        regexp.test(e?.target?.value) ||
                        e?.target?.value === ''
                      ) {
                        handleTextChange(e, index, 'tools')
                      }
                    }}
                    sx={{ background: 'white' }}
                  />
                </Grid>
                <Grid item xs={12} sx={{ mt: 2 }}>
                  <CCMultilineTextArea
                    label={'Applicability of Methodology'}
                    placeholder="Justify the selected methodology's applicability by demonstrating that the project activity meets the applicability conditions of the methodology. Explanation of documentation used for the justification and provide references or include documentation."
                    name={'applicable_methodology'}
                    value={item.applicable_methodology}
                    onChange={(e) =>
                      handleTextChange(e, index, 'applicable_methodology')
                    }
                  />
                </Grid>

                <Grid item sx={{ mt: 1 }} xs={12}>
                  <CCDropAndUpload
                    mediaTitle={[]}
                    title="Applicability of Methodology"
                    mediaItem={[]}
                    imageArray={item.applicability_of_methodology}
                    onImageUpload={(item: any) => {
                      uploadChange(item, index, 'applicability_of_methodology')
                    }}
                    onDeleteImage={(deleteItemIndex: number) => {
                      fileDeleteChange(
                        deleteIndexInArray(
                          item.applicability_of_methodology,
                          deleteItemIndex
                        ),
                        index,
                        'applicability_of_methodology'
                      )
                    }}
                    required={true}
                  />
                </Grid>
                <Grid item xs={12} sx={{ mt: 2 }}>
                  <CCMultilineTextArea
                    label={'Deviation from Methodology'}
                    placeholder="Describe and justify any deviations from the methodology. Include evidence to demonstrate that the deviation will not negatively impact the conservativeness in quantifying GHG emission mitigations and conformity to ISO 14064-2."
                    name={'deviation_of_methodology'}
                    value={item.deviation_of_methodology}
                    onChange={(e) =>
                      handleTextChange(e, index, 'deviation_of_methodology')
                    }
                  />
                </Grid>
                <Grid item xs={12} sx={{ mt: 2 }}>
                  <CCMultilineTextArea
                    label={
                      'Other Information Relating to Methodology Application'
                    }
                    placeholder="Provide other relevant information regarding the application of a methodology, e.g., any revisions or ongoing development of a methodology."
                    name={'other_info'}
                    value={item.other_info}
                    onChange={(e) => handleTextChange(e, index, 'other_info')}
                  />
                </Grid>
              </>
            )}
          </Grid>
          {methodologies.length > 1 && (
            <Box
              sx={{
                ml: 1,
                cursor: 'pointer',
                mt: item.flag === true ? '5px' : '0px',
              }}
              onClick={() => {
                handleMethodologyRow(index)
              }}
            >
              <DeleteOutlineIcon sx={{ fontSize: '25px' }} />
            </Box>
          )}
        </Box>
      ))}
      <Grid item sx={{ mt: 2 }} xs={12} md={12} lg={12} xl={12} rowSpacing={1}>
        <CCButton
          sx={{
            backgroundColor: '#F6F9F7',
            padding: '8px 15px',
            borderRadius: '20px',
            color: '#006B5E',
          }}
          variant="contained"
          onClick={addMethodology}
        >
          + Add More Methodology
        </CCButton>
        <HelpPopUp
          modal={modal}
          setModal={(item: any) => setModal(item)}
          data={IssuanceHelpContentData?.A4}
          issuanceVisible={true}
        />
      </Grid>
    </Box>
  )
}

export default SectionA4
