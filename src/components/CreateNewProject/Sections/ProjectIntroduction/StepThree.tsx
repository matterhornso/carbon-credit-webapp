import { Box } from '@mui/material'
import React from 'react'
import CheckboxDiv from '../../../../atoms/CheckboxDiv/CheckboxDiv'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks'
import { setProjectIntroduction } from '../../../../redux/Slices/CreateNewProject/projectIntroductionV2Slice'
import { SECTORAL_SCOPE } from '../../../../config/projectDraft.config'

const data = [
  {
    title: 'Afforestation/Reforestation',
    // name: 'afforestationOrReforestation',
    name: 'Afforestation/Reforestation',
  },
  {
    title: 'Agriculture',
    // name: 'agriculture',
    name: 'Agriculture',
  },
  {
    title: 'Blue Carbon- Wetland marshes, mangroves, seagrass meadows',
    // name: 'blueCarbon',
    name: 'Blue Carbon- Wetland marshes, mangroves, seagrass meadows',
  },
]

const StepThree = () => {
  const dispatch = useAppDispatch()

  const projectIntroduction = useAppSelector(
    ({ projectIntroductionV2 }) => projectIntroductionV2.projectIntroduction
  )

  const handleChange = (e: any) => {
    const name = e?.target?.name
    const projectIntroClone = { ...projectIntroduction }
    const valueToBeModified = projectIntroClone['sectoral_scope']
    if (e?.target?.checked) {
      const updatedSectorScope = [...valueToBeModified, name]
      projectIntroClone['sectoral_scope'] = updatedSectorScope
      dispatch(setProjectIntroduction(projectIntroClone))
    } else {
      const updatedValue = valueToBeModified.filter(
        (scope: string) => scope !== e.target.name
      )
      projectIntroClone['sectoral_scope'] = [...updatedValue]
      dispatch(setProjectIntroduction(projectIntroClone))
    }
  }

  return (
    <Box
      sx={{
        height: '70%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      {SECTORAL_SCOPE &&
        SECTORAL_SCOPE?.length &&
        SECTORAL_SCOPE.map((obj: any, index: number) => (
          <CheckboxDiv
            key={index}
            title={obj?.title}
            name={obj?.name}
            onChange={(e: any) => handleChange(e)}
            checked={projectIntroduction?.sectoral_scope.includes(obj?.name)}
            //checked={sectoral_scope.includes(obj?.name)}
          />
        ))}
    </Box>
  )
}

export default StepThree
