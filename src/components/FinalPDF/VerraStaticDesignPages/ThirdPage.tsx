import { Box } from '@mui/material'
import React from 'react'

const ThirdPage = () => {
  const tableOfContents = [
    {
      title: '',
      pageNo: null,
      indexNo: null,
      subTitleData: [
        { subTitle: ' Additionality ', pageNo: 50, indexNo: '3.5' },
        { subTitle: ' Methodology Deviations ', pageNo: 51, indexNo: '3.6' },
      ],
    },
    {
      title: 'QUANTIFICATION OF ESTIMATED GHG EMISSION REDUCTIONS AND REMOVALS',
      indexNo: 4,
      pageNo: 51,
      subTitleData: [
        { subTitle: 'Baseline Emissions ', pageNo: 51, indexNo: '4.1' },
        { subTitle: 'Project Emissions ', pageNo: 51, indexNo: '4.2' },
        { subTitle: 'Leakage Emissions ', pageNo: 52, indexNo: '4.3' },
        {
          subTitle:
            'Estimated GHG Emission Reductions and Carbon Dioxide Removals ',
          pageNo: 52,
          indexNo: '4.4',
        },
      ],
    },
    {
      title: 'MONITORING',
      pageNo: 53,
      indexNo: '5',
      subTitleData: [
        {
          subTitle: 'Data and Parameters Available at Validation',
          pageNo: 53,
          indexNo: '5.1',
        },
        {
          subTitle: 'Data and Parameters Monitored',
          pageNo: 54,
          indexNo: '5.2',
        },
        { subTitle: 'Monitoring Plan', pageNo: 55, indexNo: '5.3' },
        {
          subTitle: 'APPENDIX 1: COMMERCIALLY SENSITIVE INFORMATION',
          pageNo: 56,
          indexNo: '5.4',
        },
        {
          subTitle: 'APPENDIX X: <TITLE OF APPENDIX>',
          pageNo: 57,
          indexNo: '5.5',
        },
      ],
    },
  ]

  return (
    <Box
      className="libre-franklin-normal"
      sx={{
        maxWidth: '800px',
        py: 1.5,
        marginX: 'auto',
        bgcolor: '#FFF',
        height: '842px',
        mt: 3,
        p: 4,
        px: 12,
      }}
    >
      <Box sx={{ mt: 1, color: '#2b3957' }}>
        {tableOfContents.map((titleData: any, index: number) => (
          <Box key={index} sx={{ mt: 1 }}>
            {titleData?.title ? (
              <Box sx={{ display: 'flex', fontWeight: 600 }}>
                <Box sx={{ width: '8%' }}>
                  <Box>{titleData?.indexNo}</Box>
                </Box>
                <Box sx={{ width: '92%' }}>
                  <Box
                    sx={{ display: 'flex' }}
                    className="libre-franklin-bolder"
                  >
                    <Box>{titleData?.title}</Box>
                    <Box
                      sx={{
                        flex: 1,
                        ml: '8px',
                        overflow: 'hidden',
                      }}
                    >
                      ....................................................................................................................................................................................................................................................................................................................................
                    </Box>
                    <Box sx={{ ml: '4px' }}>{titleData.pageNo}</Box>
                  </Box>
                </Box>
              </Box>
            ) : null}
            <Box>
              {titleData?.subTitleData?.map(
                (subTitleData: any, subTitleIndex: number) => (
                  <Box
                    key={subTitleIndex}
                    sx={{ display: 'flex', fontSize: '14px' }}
                  >
                    <Box sx={{ width: '8%' }}>
                      <Box sx={{ ml: '18px' }}>{subTitleData?.indexNo}</Box>
                    </Box>
                    <Box sx={{ width: '92%' }}>
                      <Box sx={{ display: 'flex', letterSpacing: '0.2px' }}>
                        <Box sx={{ ml: '20px' }}>{subTitleData.subTitle}</Box>
                        <Box
                          sx={{
                            flex: 1,
                            ml: '4px',
                            overflow: 'hidden',
                          }}
                        >
                          ....................................................................................................................................................................................................................................................................................................................................
                        </Box>
                        <Box sx={{ ml: '4px' }}>{subTitleData.pageNo}</Box>
                      </Box>
                    </Box>
                  </Box>
                )
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default ThirdPage
