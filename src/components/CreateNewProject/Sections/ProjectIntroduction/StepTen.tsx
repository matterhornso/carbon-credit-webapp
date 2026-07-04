import React, { useEffect, useState } from 'react'
import Sdg_1 from '../../../../assets/Images/Sdgs/Sdg_1.svg'
import Sdg_2 from '../../../../assets/Images/Sdgs/Sdg_2.svg'
import Sdg_3 from '../../../../assets/Images/Sdgs/Sdg_3.svg'
import Sdg_4 from '../../../../assets/Images/Sdgs/Sdg_4.svg'
import Sdg_5 from '../../../../assets/Images/Sdgs/Sdg_5.svg'
import Sdg_6 from '../../../../assets/Images/Sdgs/Sdg_6.svg'
import Sdg_7 from '../../../../assets/Images/Sdgs/Sdg_7.svg'
import Sdg_8 from '../../../../assets/Images/Sdgs/Sdg_8.svg'
import Sdg_9 from '../../../../assets/Images/Sdgs/Sdg_9.svg'
import Sdg_10 from '../../../../assets/Images/Sdgs/Sdg_10.svg'
import Sdg_11 from '../../../../assets/Images/Sdgs/Sdg_11.svg'
import Sdg_12 from '../../../../assets/Images/Sdgs/Sdg_12.svg'
import Sdg_13 from '../../../../assets/Images/Sdgs/Sdg_13.svg'
import Sdg_14 from '../../../../assets/Images/Sdgs/Sdg_14.svg'
import Sdg_15 from '../../../../assets/Images/Sdgs/Sdg_15.svg'
import Sdg_16 from '../../../../assets/Images/Sdgs/Sdg_16.svg'
import Sdg_17 from '../../../../assets/Images/Sdgs/Sdg_17.svg'
import { Box, Typography } from '@mui/material'
import CropSquareIcon from '@mui/icons-material/CropSquare'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks'
import { setProjectIntroduction } from '../../../../redux/Slices/CreateNewProject/projectIntroductionV2Slice'

const StepTen = () => {
  const dispatch = useAppDispatch()

  const SdgData = [
    {
      sdgIcon: Sdg_1,
      title: 'No Poverty',
    },
    {
      sdgIcon: Sdg_2,
      title: 'Zero Hunger',
    },
    {
      sdgIcon: Sdg_3,
      title: 'Good Health & Well Being',
    },
    {
      sdgIcon: Sdg_4,
      title: 'Quality Education',
    },
    {
      sdgIcon: Sdg_5,
      title: 'Gender Equality',
    },
    {
      sdgIcon: Sdg_6,
      title: 'Clean Water & Sanitation',
    },
    {
      sdgIcon: Sdg_7,
      title: 'Affordable & Clean Energy',
    },
    {
      sdgIcon: Sdg_8,
      title: 'Decent Work & Economic Growth',
    },
    {
      sdgIcon: Sdg_9,
      title: 'Industry, Innovation & Infrastructure',
    },
    {
      sdgIcon: Sdg_10,
      title: 'Reduced Inequalities',
    },
    {
      sdgIcon: Sdg_11,
      title: 'Sustainable Cities & Communities',
    },
    {
      sdgIcon: Sdg_12,
      title: 'Responsible Consumption & Production',
    },
    {
      sdgIcon: Sdg_13,
      title: 'Climate Action',
    },
    {
      sdgIcon: Sdg_14,
      title: 'Life Below Water',
    },
    {
      sdgIcon: Sdg_15,
      title: 'Life on Land',
    },
    {
      sdgIcon: Sdg_16,
      title: 'Peace, Justice & Strong Institutions',
    },
    {
      sdgIcon: Sdg_17,
      title: 'Partnerships for the Goals',
    },
  ]

  const projectIntroduction = useAppSelector(
    ({ projectIntroductionV2 }) => projectIntroductionV2.projectIntroduction
  )

  const [selectedSdgs, setSelectedSdgs] = useState<any>(
    projectIntroduction?.SDG
  )

  const onChangeHandler = (index: number) => {
    if (selectedSdgs.includes(index)) {
      const updatedSdgs = [...selectedSdgs].filter((i: any) => {
        return i !== index
      })
      setSelectedSdgs(updatedSdgs)
      dispatch(
        setProjectIntroduction({ ...projectIntroduction, ['SDG']: updatedSdgs })
      )
      return
    }
    const selectedSdgsCopy = [...selectedSdgs, index]
    setSelectedSdgs(selectedSdgsCopy)
    dispatch(
      setProjectIntroduction({
        ...projectIntroduction,
        ['SDG']: selectedSdgsCopy,
      })
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        columnGap: 12,
        rowGap: 3,
        mt: 7,
        pr: 4,
        mr: 4,
        height:'90%',
        overflow:'hidden',
        overflowY:'scroll'
      }}
      className="hide-scrollbar"
    >
      {SdgData.map((i: any, idx: number) => (
        <Box key={idx} sx={{ width: '75px' }}>
          <Box sx={{ display: 'flex', alignItems: 'start', columnGap: '5px' }}>
            <Box onClick={() => onChangeHandler(idx)}>
              {selectedSdgs.includes(idx) ? (
                <CheckBoxIcon sx={{ color: '#029FB3', cursor: 'pointer' }} />
              ) : (
                <CropSquareIcon sx={{ color: '#029FB3', cursor: 'pointer' }} />
              )}
            </Box>
            <Box>
              <Box>
                <img src={i?.sdgIcon} width={100} height={100} />
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: 16,
                  }}
                >
                  {i?.title.split(' ')[0]}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: 14,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    width: '75px',
                  }}
                >
                  {i?.title.split(' ').slice(1).join(' ')}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default StepTen
