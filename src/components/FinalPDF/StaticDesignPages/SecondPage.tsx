import { Box, Divider, Typography } from '@mui/material'
import React from 'react'
import { Images } from '../../../theme'
import { useAppSelector } from '../../../hooks/reduxHooks'
import moment from 'moment'

const SecondPage = () => {
  const pageName = 'ICR project design description v.1.0'

  const projectData: any = useAppSelector(
    ({ finalPDFSlice }) => finalPDFSlice.projectData
  )

  const projectDesignData = [
    { title: 'ID of project', type: 'text', value: 'tf1234' },
    {
      title: 'Project name',
      type: 'text',
      value:
        projectData?.projectIntroduction?.name?.data ||
        'Panama Reforestation Services ARR',
    },
    {
      title: 'Project proponent',
      type: 'text',
      value: 'DutchGreen Project Management BV Climate Investment Partners LLC',
    },
    {
      title: 'Representative',
      type: 'text',
      value: 'Name, title, email, tel.',
    },
    {
      title: 'First date of submission',
      type: 'text',
      value: moment(projectData?.createdAt).format('DD-MM-YYYY') || '22-08-222',
    },
    {
      title: 'Date of validation',
      type: 'text',
      value: moment(projectData?.createdAt).format('DD-MM-YYYY') || '22-08-222',
    },
    { title: 'Version number of the PDD', type: 'text', value: '0.1' },
    {
      title: 'Date of version',
      type: 'text',
      value: moment(projectData?.createdAt).format('DD-MM-YYYY') || '22-08-222',
    },
    { title: 'Host country(ies)', type: 'text', value: 'India' },
    {
      title: 'Host country approval',
      value: '  ',
      type: 'checkbox',
      checboxValues: [
        { label: 'Yes', checked: true },
        { label: 'No', checked: false },
      ],
    },
    {
      title: 'Sectoral scope of project activity',
      value: 'Reforestation & Afforestation',
    },
    {
      title: 'Grouped project',
      value: '  ',
      type: 'checkbox',
      checboxValues: [
        { label: 'Yes', checked: true },
        { label: 'No', checked: false },
      ],
    },
    // { title: '', value: '' },
    // { title: '', value: '' },
    // { title: '', value: '' },
  ]
  return (
    <Box
      sx={{
        // maxWidth: '595px',
        maxWidth: '800px',
        px: 4,
        py: 1.5,
        marginX: 'auto',
        bgcolor: '#FFF',
        height: '842px',
        mt: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <img src={Images.ICRLogo2} height={24} width={42} />
        <Typography sx={{ fontSize: '11px', lineHeight: '16px' }}>
          {pageName}
        </Typography>
      </Box>
      <Divider sx={{ mt: 1, color: '#8BD3DC' }} />
      <Typography
        sx={{
          mt: 2,
          fontSize: '24px',
          lineHeight: '32px',
          color: '#000',
        }}
      >
        Project Design Description
      </Typography>
      <Box sx={{ mt: 4 }}>
        {projectDesignData.map((row: any, index: number) => (
          <Box
            sx={{
              display: 'flex',
              mt: '4px',
              gap: '4px',
              fontSize: '11px',
              lineHeight: '16px',
            }}
            key={index}
          >
            <Box
              sx={{
                px: 1.5,
                py: 1,
                flex: 5,
                bgcolor: '#8BD3DC',
                fontWeight: 500,
              }}
            >
              {row?.title}
            </Box>
            <Box
              sx={{
                px: 1.5,
                py: 1,
                flex: 6,
                bgcolor: '#E6F5F7',

                fontWeight: 400,
              }}
            >
              {row?.type === 'text' ? (
                row?.value
              ) : (
                <Box sx={{ display: 'flex' }}>
                  {row?.checboxValues?.map(
                    (checkoxObj: any, checkboxIndex: number) => (
                      <Box key={checkboxIndex} sx={{ mr: 1, display: 'flex' }}>
                        <img
                          src={
                            checkoxObj?.checked
                              ? Images.PdfCheckedCheckbox
                              : Images.PdfUncheckedCheckbox
                          }
                        />
                        <Typography sx={{ fontSize: 11, ml: 0.5 }}>
                          {checkoxObj?.label}
                        </Typography>
                      </Box>
                    )
                  )}
                </Box>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default SecondPage
