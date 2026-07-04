import React, { useEffect, useState } from 'react'
import {
  AccordionSummary,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import styled from '@emotion/styled'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionDetails from '@mui/material/AccordionDetails'

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  color: '#00201B',
  fontSize: 16,
  fontWeight: 400,
}))

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  color: '#4A635E',
}))

interface CCAccordionCheckBoxProps {
  title?: any
  dropList?: any
  selectedFilters:any
  filters?: any
  handleFilters?: any
  addFilters?: any
  removeFilters?: any
}

const CCAccordionCheckBox = (props: CCAccordionCheckBoxProps) => {
 
  const [expanded, setExpanded] = useState<boolean>(false)

  const handleChange: any = (name?: string) => {
    console.log(name)
    setExpanded(!expanded)
  }
 

  return (
    <div>
      <Accordion expanded={expanded} onChange={handleChange} elevation={0}>
        <AccordionSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
          expandIcon={<KeyboardArrowDownIcon />}
        >
          <Typography>{props.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {props.dropList.map((item: any) => (
              <Box key={item}>
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{ color: '#4A635E' }}
                      value={item}
                      checked = {Object.values(props.selectedFilters).flat()?.includes(item)}
                      onChange={(e) => {
                        //props?.handleFilters(props.title, e.target.value)
                        e.target.checked
                          ? props.addFilters(props.title, e.target.value)
                          : props.removeFilters(props.title, e.target.value)
                      }}
                    />
                  }
                  label={item}
                />
              </Box>
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default CCAccordionCheckBox
