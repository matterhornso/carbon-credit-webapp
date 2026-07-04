import React, { useState } from 'react'
import stepFourImage from '../../../assets/Images/wallet_steps/wallet_step_4.png'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import BlockchainCalls from '../../../blockchain/Blockchain'
import { Grid } from '@mui/material'
import CCInputField from '../../../atoms/CCInputField'
import useForm from '../../../hooks/useForm'
import CCButton from '../../../atoms/CCButton'

interface Props {}

const StepFour = (props: Props) => {
  const [params, setParams] = useState({
    chainId: '',
    chainName: '',

    rpcUrls: '',
  })

  const addButtonClick = () => {
    if (Object.values(params).some((key) => key !== '')) {
      const toPassParam: any = params
      toPassParam.rpcUrls = [toPassParam.rpcUrls]
      toPassParam.chainId = BlockchainCalls.toHexConvert(
        Number(toPassParam.chainId)
      )
      console.log(
        '🚀 ~ file: StepFour.tsx ~ line 27 ~ addButtonClick ~ toPassParam',
        toPassParam
      )
      BlockchainCalls.requestMethodCalls('wallet_addEthereumChain', [
        toPassParam,
      ])
    }
  }

  const { handleChange, values, errors, handleSubmit } = useForm(addButtonClick)
  const onChange = (e: any) => {
    setParams({ ...params, [e.target.name]: e.target.value })
  }

  return (
    <>
      <Accordion sx={{ p: 2, mt: 1 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6">Add Custom Network</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Fill in the details of your custom network</Typography>

          <Grid
            container
            sx={{}}
            rowSpacing={3}
            columnSpacing={3}
            component="form"
            onSubmit={handleSubmit}
          >
            <Grid item xs={12}>
              <CCInputField
                label="Network name"
                variant="filled"
                type="text"
                name="chainName"
                onChange={onChange}
                error={errors?.chainName}
                defaultValue={values?.chainName}
              />
            </Grid>
            <Grid item xs={12}>
              <CCInputField
                label="Chain ID"
                variant="filled"
                type="text"
                name="chainId"
                onChange={onChange}
                error={errors?.chainId}
                defaultValue={values?.chainId}
              />
            </Grid>
            <Grid item xs={12}>
              <CCInputField
                type="text"
                label="RPC URL"
                variant="filled"
                defaultValue={values?.rpcUrls}
                name="rpcUrls"
                // error={errors?.password}
                onChange={(e) => {
                  onChange(e)
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <CCButton
                type="submit"
                fullWidth
                sx={{
                  height: '50px',
                  borderRadius: '6px',
                  marginTop: 4,
                }}
                variant="contained"
              >
                Add
              </CCButton>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <img src={stepFourImage} width="100%" />
    </>
  )
}

export default StepFour
