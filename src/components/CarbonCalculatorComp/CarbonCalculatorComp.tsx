import { Box, MenuItem, Modal, Paper, Select, Typography } from '@mui/material'
import React, { useState } from 'react'
import { CARBON_CALCULATOR_PROJECT_TYPES } from '../../config/carbonCalculator.config'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
  setAfforestationInputFields,
  setAfforestationPayload,
  setRecyclingInputFields,
  setRecyclingPayload,
  setPETaInputFields,
  setPETaPayload,
  setPETbgInputFields,
  setPETbgPayload,
  setHDPEInputFields,
  setHDPEPayload,
  setLDPEInputFields,
  setLDPEPayload,
  setPPInputFields,
  setPPPayload,
  setPSInputFields,
  setPSPayload,
  setEPSInputFields,
  setEPSPayload,
  setPURInputFields,
  setPURPayload,
  setPVCInputFields,
  setPVCPayload,
  setEUmixInputFields,
  setEUmixPayload,
  resetCarbonCreditCalculatorSlice,
} from '../../redux/Slices/carbonCreditCalculatorSlice'
import CarbonCalculatorFieldsLayout from './CarbonCalculatorFieldsLayout'
import ProjectTypeSelectBox from './ProjectTypeSelectBox'
import CCInputField from '../../atoms/CCInputField'
import CCButton from '../../atoms/CCButton'
import { carbonCalculatorService } from '../../api/carbonCalculator.api'
import LoderOverlay from '../LoderOverlay'
import TotalCO2Modal from './TotalCO2Modal'
import { handleApiError } from '../../utils/errorHandler'

const CarbonCalculatorComp = () => {
  const dispatch = useAppDispatch()

  const selectedProjectType = useAppSelector(
    ({ carbonCreditCalculator }) => carbonCreditCalculator.selectedProjectType
  )
  const afforestationInputFields = useAppSelector(
    ({ carbonCreditCalculator }) =>
      carbonCreditCalculator.afforestationInputFields
  )
  const afforestationPayload = useAppSelector(
    ({ carbonCreditCalculator }) => carbonCreditCalculator.afforestationPayload
  )
  const recyclingInputFields = useAppSelector(
    ({ carbonCreditCalculator }) => carbonCreditCalculator.recyclingInputFields
  )
  const recyclingPayload = useAppSelector(
    ({ carbonCreditCalculator }) => carbonCreditCalculator.recyclingPayload
  )
  const PETaInputFields = useAppSelector(
    ({ carbonCreditCalculator }) => carbonCreditCalculator.PETaInputFields
  )
  const PETaPayload = useAppSelector(
    ({ carbonCreditCalculator }) => carbonCreditCalculator.PETaPayload
  )
  const PETbgInputFields = useAppSelector(
    ({ carbonCreditCalculator }) => carbonCreditCalculator.PETbgInputFields
  )
  const PETbgPayload = useAppSelector(
    ({ carbonCreditCalculator }) => carbonCreditCalculator.PETbgPayload
  )
  const HDPEInputFields = useAppSelector(
    ({ carbonCreditCalculator }) => carbonCreditCalculator.HDPEInputFields
  )
  const HDPEPayload = useAppSelector(
    ({ carbonCreditCalculator }) => carbonCreditCalculator.HDPEPayload
  )
  const LDPEInputFields = useAppSelector(
    ({ carbonCreditCalculator }) => carbonCreditCalculator.LDPEInputFields
  )
  const LDPEPayload = useAppSelector(
    ({ carbonCreditCalculator }) => carbonCreditCalculator.LDPEPayload
  )
  const PPInputFields = useAppSelector(
    ({ carbonCreditCalculator }) => carbonCreditCalculator.PPInputFields
  )
  const PPPayload = useAppSelector(
    ({ carbonCreditCalculator }) => carbonCreditCalculator.PPPayload
  )
  const PSInputFields = useAppSelector(
    ({ carbonCreditCalculator }) => carbonCreditCalculator.PSInputFields
  )
  const PSPayload = useAppSelector(
    ({ carbonCreditCalculator }) => carbonCreditCalculator.PSPayload
  )
  const EPSInputFields = useAppSelector(
    ({ carbonCreditCalculator }) => carbonCreditCalculator.EPSInputFields
  )
  const EPSPayload = useAppSelector(
    ({ carbonCreditCalculator }) => carbonCreditCalculator.EPSPayload
  )
  const PURInputFields = useAppSelector(
    ({ carbonCreditCalculator }) => carbonCreditCalculator.PURInputFields
  )
  const PURPayload = useAppSelector(
    ({ carbonCreditCalculator }) => carbonCreditCalculator.PURPayload
  )
  const PVCInputFields = useAppSelector(
    ({ carbonCreditCalculator }) => carbonCreditCalculator.PVCInputFields
  )
  const PVCPayload = useAppSelector(
    ({ carbonCreditCalculator }) => carbonCreditCalculator.PVCPayload
  )
  const EUmixInputFields = useAppSelector(
    ({ carbonCreditCalculator }) => carbonCreditCalculator.EUmixInputFields
  )
  const EUmixPayload = useAppSelector(
    ({ carbonCreditCalculator }) => carbonCreditCalculator.EUmixPayload
  )

  const [loader, setLoader] = useState<boolean>(false)
  const [openTotalCO2SequestedModal, setOpenTotalCO2SequestedModal] =
    useState<boolean>(false)
  const [data, setData] = useState<any>([])
  const [totalCo2, setTotalCo2] = useState<number | null>(null)

  const reduxDispatchFnObj: any = {
    afforestation: {
      inputFieldDispatchFn: setAfforestationInputFields,
      payloadDispatchFn: setAfforestationPayload,
      inputFieldVal: afforestationInputFields,
      payloadReduxVal: afforestationPayload,
    },
    // recycling: {
    //   inputFieldDispatchFn: setRecyclingInputFields,
    //   payloadDispatchFn: setRecyclingPayload,
    //   inputFieldVal: recyclingInputFields,
    //   payloadReduxVal: recyclingPayload,
    // },
    PETa: {
      inputFieldDispatchFn: setPETaInputFields,
      payloadDispatchFn: setPETaPayload,
      inputFieldVal: PETaInputFields,
      payloadReduxVal: PETaPayload,
    },
    PETbg: {
      inputFieldDispatchFn: setPETbgInputFields,
      payloadDispatchFn: setPETbgPayload,
      inputFieldVal: PETbgInputFields,
      payloadReduxVal: PETbgPayload,
    },
    HDPE: {
      inputFieldDispatchFn: setHDPEInputFields,
      payloadDispatchFn: setHDPEPayload,
      inputFieldVal: HDPEInputFields,
      payloadReduxVal: HDPEPayload,
    },
    LDPE: {
      inputFieldDispatchFn: setLDPEInputFields,
      payloadDispatchFn: setLDPEPayload,
      inputFieldVal: LDPEInputFields,
      payloadReduxVal: LDPEPayload,
    },
    PP: {
      inputFieldDispatchFn: setPPInputFields,
      payloadDispatchFn: setPPPayload,
      inputFieldVal: PPInputFields,
      payloadReduxVal: PPPayload,
    },
    PS: {
      inputFieldDispatchFn: setPSInputFields,
      payloadDispatchFn: setPSPayload,
      inputFieldVal: PSInputFields,
      payloadReduxVal: PSPayload,
    },
    EPS: {
      inputFieldDispatchFn: setEPSInputFields,
      payloadDispatchFn: setEPSPayload,
      inputFieldVal: EPSInputFields,
      payloadReduxVal: EPSPayload,
    },
    PUR: {
      inputFieldDispatchFn: setPURInputFields,
      payloadDispatchFn: setPURPayload,
      inputFieldVal: PURInputFields,
      payloadReduxVal: PURPayload,
    },
    PVC: {
      inputFieldDispatchFn: setPVCInputFields,
      payloadDispatchFn: setPVCPayload,
      inputFieldVal: PVCInputFields,
      payloadReduxVal: PVCPayload,
    },
    EUmix: {
      inputFieldDispatchFn: setEUmixInputFields,
      payloadDispatchFn: setEUmixPayload,
      inputFieldVal: EUmixInputFields,
      payloadReduxVal: EUmixPayload,
    },
  }

  const onChangeHandler = (value: string, name: string) => {
    if (name === 'no_of_years' && Number(value) > 10) {
      alert('Enter the value less than 10')
      return
    }

    const reduxDispatchFn = reduxDispatchFnObj[selectedProjectType?.label]
    dispatch(
      reduxDispatchFn?.inputFieldDispatchFn(
        reduxDispatchFn.inputFieldVal?.map((i: any, index: number) => {
          if (i?.name === name) {
            return { ...i, value }
          } else {
            return i
          }
        })
      )
    )
    dispatch(
      reduxDispatchFn?.payloadDispatchFn({
        ...reduxDispatchFnObj[selectedProjectType?.label]?.payloadReduxVal,
        [name]: Number(value),
      })
    )
  }

  const processApiDataToTableArr = (data: any) => {
    const tableData = data?.map((CO2Sequested: any, index: number) => {
      return [`Year ${index + 1}`, CO2Sequested]
    })

    const total_estimated_ERs = data?.reduce((acc: any, cur: any) => {
      acc = cur + acc
      return acc
    }, 0)

    const total_crediting_years = data?.length

    const avg_annual_ERs =
      Number(total_estimated_ERs) / Number(total_crediting_years)

    setTotalCo2(total_estimated_ERs)

    return [
      ...tableData,
      ['Total estimated ERs', total_estimated_ERs],
      ['Total number of crediting years', total_crediting_years],
      ['Average annual ERs', avg_annual_ERs],
    ]
  }

  const handleSave = async () => {
    try {
      const payload = {
        ...reduxDispatchFnObj[selectedProjectType?.label]?.payloadReduxVal,
      }
      const allFieldsFilledValidation = Object.values(payload).some(
        (i: any) => {
          return !i
        }
      )
      if (allFieldsFilledValidation) {
        alert('Fill all the fields')
        return
      }
      setOpenTotalCO2SequestedModal(true)
      setLoader(true)

      if (payload?.type !== 'bamboo') {
        payload['no_of_kgs'] = payload.no_of_kgs * 1000
      }
      const res = await carbonCalculatorService.getCalculatedValues(payload)
      if (res?.values) {
        setData(processApiDataToTableArr(res?.values))
        return
      }
    } catch (e) {
      handleApiError(e, { action: 'CarbonCalculatorComp.handleSave' })
    } finally {
      setLoader(false)
    }
  }

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          boxShadow: '0px 4px 4px 0px #00000029',
          px: 2,
          pt: 3,
          height: '100%',
        }}
      >
        <Typography sx={{ fontSize: 32, fontWeight: 500 }}>
          Project Information
        </Typography>
        <CarbonCalculatorFieldsLayout
          heading={'Project Type'}
          headingExplanationTitle={`Please select the type of project you're working on`}
          showNextbtn={false}
        >
          <ProjectTypeSelectBox />{' '}
        </CarbonCalculatorFieldsLayout>
        {selectedProjectType?.label && (
          <>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 2s ease-in-out',
                transform: 'translateY(-1%)',
              }}
            >
              {selectedProjectType?.label &&
                reduxDispatchFnObj[
                  selectedProjectType?.label
                ]?.inputFieldVal?.map((inputData: any, index: number) => (
                  <Box key={index}>
                    <CarbonCalculatorFieldsLayout
                      heading={inputData?.heading}
                      headingExplanationTitle={inputData?.heading2}
                      showNextbtn={false}
                    >
                      <CCInputField
                        variant="standard"
                        type="text"
                        placeholder={inputData?.placeholder}
                        name={inputData?.name}
                        value={inputData?.value}
                        onChange={(e: any) => {
                          onChangeHandler(e.target.value, e.target.name)
                        }}
                        sx={{ background: '' }}
                      />{' '}
                    </CarbonCalculatorFieldsLayout>
                  </Box>
                ))}
            </Box>
            <CCButton
              onClick={handleSave}
              sx={{
                ml: 'auto',
                mt: 2,
                fontSize: 16,
                fontWeight: 500,
                background:
                  'linear-gradient(270deg, #01623D -55.94%, #8BD3DC 177.5%)',
                color: '#fff',
              }}
            >
              Save
            </CCButton>
          </>
        )}
      </Paper>
      <Modal open={openTotalCO2SequestedModal}>
        <TotalCO2Modal
          loader={loader}
          onClose={() => {
            setOpenTotalCO2SequestedModal(false)
            dispatch(resetCarbonCreditCalculatorSlice())
            setData([])
            setTotalCo2(null)
          }}
          data={data}
          totalCo2={totalCo2}
        />
      </Modal>
    </>
  )
}

export default CarbonCalculatorComp
