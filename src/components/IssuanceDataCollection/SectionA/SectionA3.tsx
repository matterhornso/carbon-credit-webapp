import { SelectChangeEvent, Stack } from '@mui/material'
import { FormControl, Grid, MenuItem, Select, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import CCButton from '../../../atoms/CCButton'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { shallowEqual } from 'react-redux'
import {
  setProjectParticipants,
  setA3,
} from '../../../redux/Slices/sectionASlice'
import Spinner from '../../../atoms/Spinner'
import { setShowPopUp } from '../../../redux/Slices/issuanceDataCollection'
import HelpPopUp from '../../Appbar/NavBar/Help/HelpPopUp'
import { IssuanceHelpContentData } from '../../Appbar/NavBar/Help/SectionA/helpContentData'
import CCMultilineTextArea from '../../../atoms/CCMultilineTextArea'
import CCDropAndUpload from '../../../atoms/CCDropAndUpload/CCDropAndUpload'
import { deleteIndexInArray } from '../../../utils/commonFunctions'
import CCMultiChipInput from '../../../atoms/CCMultiChipInput/CCMultiChipInput'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

const SectionA3 = () => {
  const dispatch = useAppDispatch()

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

  const party_and_project_participants = useAppSelector(
    ({ sectionA }) => sectionA.party_and_project_participants,
    shallowEqual
  )
  const A3 = useAppSelector(({ sectionA }) => sectionA.A3, shallowEqual)

  const { host_country_attestation_upload } = A3
  const loading = useAppSelector(
    ({ newProject }) => newProject.loading,
    shallowEqual
  )

  useEffect(() => {
    if (
      currentProjectDetails &&
      currentProjectDetails.section_a.step3.completed
    ) {
      const { party_and_project_participants } =
        currentProjectDetails.section_a.step3
      let step3Data = []
      step3Data = party_and_project_participants.map((item: any) => {
        return {
          party_involved: item?.party_involved,
          private_or_public_project_participant:
            item?.private_or_public_project_participant,
          indicate_party_involved: item?.indicate_party_involved,
        }
      })
      const {
        host_country_attestation,
        host_country_attestation_upload,
        eligibility_criteria,
      } = currentProjectDetails.section_a.step3
      dispatch(
        setA3({
          name: 'host_country_attestation',
          value: host_country_attestation,
        })
      )
      dispatch(
        setA3({
          name: 'host_country_attestation_upload',
          value: host_country_attestation_upload,
        })
      )
      dispatch(
        setA3({ name: 'eligibility_criteria', value: eligibility_criteria })
      )
      dispatch(setProjectParticipants(step3Data))
    }
  }, [currentProjectDetails])

  const addRow = () => {
    const dataCopy = [...party_and_project_participants]
    dataCopy.push({
      party_involved: [],
      private_or_public_project_participant: [],
      indicate_party_involved: '',
      //partyInvolved: '',
      //participantType: '',
      //isProjectParticipant: 'Select from dropdown',
    })
    dispatch(setProjectParticipants(dataCopy))
  }

  const handleTextChange = (e: any, index: number, type: string) => {
    const dataCopy = [...party_and_project_participants]
    let objectToChange = dataCopy[index]
    objectToChange = { ...objectToChange, [type]: e.target.value }
    dataCopy[index] = objectToChange
    dispatch(setProjectParticipants(dataCopy))
  }

  const handleMultiInputChange = (
    chipValue: string,
    chipIndex: number,
    method: string,
    key: string,
    objectIndex: number
  ) => {
    const updatedData = party_and_project_participants.map((obj, index) => {
      if (index === objectIndex) {
        if (method === 'delete') {
          let arrayToModify = obj[key]
          const arrayModified = arrayToModify.filter(
            (i: string, index: number) => index !== chipIndex
          )
          arrayToModify = [...arrayModified]
          obj = { ...obj, [key]: arrayToModify }
        }
        if (method === 'add') {
          let arrayToModify = obj[key]
          const arrayCopy = [...arrayToModify]
          arrayCopy.push(chipValue)
          arrayToModify = [...arrayCopy]
          obj = { ...obj, [key]: arrayToModify }
        }
      }
      return obj
    })
    dispatch(setProjectParticipants(updatedData))
  }

  const handleSelectChange = (e: SelectChangeEvent, index: number) => {
    const dataCopy = [...party_and_project_participants]
    dataCopy[index].isProjectParticipant = e.target.value
    dispatch(setProjectParticipants(dataCopy))
  }

  const deleteRow = (rowIndexToBeDeleted: number) => {
    const partyAndProjectParticipantsDataCopy = [
      ...party_and_project_participants,
    ]
    const newData = partyAndProjectParticipantsDataCopy.filter(
      (item: any, idx: number) => {
        return idx !== rowIndexToBeDeleted
      }
    )
    dispatch(setProjectParticipants(newData))
  }

  return loading === true ? (
    <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 450 }}>
      <Spinner />
    </Stack>
  ) : (
    <Box sx={{ mt: 3 }} className="issuance_data_section_scroll">
      <Typography>Parties & project participants involved</Typography>

      <Grid
        container
        sx={{ mt: 1 }}
        xs={12}
        md={12}
        lg={12}
        xl={12}
        spacing={1}
        className="table-with-div-heading"
      >
        <Grid item xs={4}>
          Party involved ((host) indicates a host Party){' '}
          <span style={{ color: 'red' }}>*</span>
        </Grid>
        <Grid item xs={4}>
          Private and/or public entity(ies) project participants (as applicable)
          <span style={{ color: 'red' }}>*</span>
        </Grid>
        <Grid item xs={4}>
          Indicate if the Party involved wishes to be considered as project
          participant <span style={{ color: 'red' }}>*</span>
        </Grid>
      </Grid>
      {party_and_project_participants?.map((item: any, index: number) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
          <Grid
            key={index}
            className={
              // index % 2 !== 0 ? 'table-with-div-td_green' :
              'table-with-div-td'
            }
            container
            xs={12}
            md={12}
            lg={12}
            xl={12}
            sx={{ mt: 1 }}
            spacing={1}
            //columns={14}
          >
            <Grid item xs={4}>
              <CCMultiChipInput
                value={item?.party_involved}
                placeholder="Enter Host"
                onChange={(
                  chipValue: string,
                  chipIndex: number,
                  method: string
                ) =>
                  handleMultiInputChange(
                    chipValue,
                    chipIndex,
                    method,
                    'party_involved',
                    index
                  )
                }
              />
            </Grid>
            <Grid item xs={4}>
              <CCMultiChipInput
                value={item?.private_or_public_project_participant}
                placeholder="Enter Participant"
                onChange={(
                  chipValue: string,
                  chipIndex: number,
                  method: string
                ) =>
                  handleMultiInputChange(
                    chipValue,
                    chipIndex,
                    method,
                    'private_or_public_project_participant',
                    index
                  )
                }
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <Select
                  className="select_option_border_contain"
                  // sx={{
                  //   background: 'white',
                  //   color: '#006B5E',
                  //   borderWidth: '0px',
                  //   borderColor: 'white',
                  // }}

                  // label="Select from dropdown"
                  defaultValue={'Select from dropdown'}
                  placeholder="Select from dropdown"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={item?.indicate_party_involved}
                  onChange={(e) =>
                    handleTextChange(e, index, 'indicate_party_involved')
                  }
                >
                  <MenuItem value={'no'}>No</MenuItem>
                  <MenuItem value={'yes'}>Yes</MenuItem>
                  <MenuItem value={'maybe'}>Maybe</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          {party_and_project_participants.length > 1 && (
            <Box onClick={() => deleteRow(index)}>
              <DeleteOutlineIcon sx={{ fontSize: '25px', cursor: 'pointer' }} />
            </Box>
          )}
        </Box>
      ))}
      <CCButton
        sx={{
          mt: 2,
          color: '#006B5E;',
          padding: '5px 15px',
          borderRadius: '14px',
          backgroundColor: '#F6F9F7',
        }}
        variant="contained"
        onClick={addRow}
      >
        + Add more participants
      </CCButton>
      <Grid
        container
        sx={{ mt: 3 }}
        spacing={1}
        xs={12}
        md={12}
        lg={12}
        xl={12}
      >
        <Grid item xs={12}>
          <CCMultilineTextArea
            label="Host Country Attestation"
            placeholder="Provide information if the project has obtained a letter of assurance and authorization from the host country or countries where the emission mitigations occur."
            value={A3.host_country_attestation}
            name={'host_country_attestation'}
            onChange={({ target: { name, value } }) =>
              dispatch(setA3({ value, name }))
            }
          />
        </Grid>
        <Grid item xs={12}>
          <CCDropAndUpload
            mediaTitle={['Sample Report - Implementation of Milestones']}
            title="Host Country Attestation"
            mediaItem={[]}
            imageArray={A3.host_country_attestation_upload}
            onImageUpload={(item: any) => {
              dispatch(
                setA3({
                  name: 'host_country_attestation_upload',
                  value: item,
                })
              )
            }}
            onDeleteImage={(index: number) => {
              dispatch(
                setA3({
                  name: 'host_country_attestation_upload',
                  value: deleteIndexInArray(
                    host_country_attestation_upload,
                    index
                  ),
                })
              )
            }}
            required
          />
        </Grid>
        <Grid item sx={{ mt: 1 }} xs={12}>
          <CCMultilineTextArea
            label="Eligibility criteria for Grouped Project"
            placeholder="Provide eligibility criteria for inclusion of new project activities under grouped project."
            value={A3.eligibility_criteria}
            name={'eligibility_criteria'}
            onChange={({ target: { name, value } }) =>
              dispatch(setA3({ value, name }))
            }
          />
        </Grid>
      </Grid>
      <HelpPopUp
        modal={modal}
        setModal={(item: any) => setModal(item)}
        data={IssuanceHelpContentData?.A3}
        issuanceVisible={true}
      />
    </Box>
  )
}

export default SectionA3
