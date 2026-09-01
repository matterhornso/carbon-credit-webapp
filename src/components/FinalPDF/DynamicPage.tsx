import { Box, Divider, Typography } from '@mui/material'
import React from 'react'
import { Images } from '../../theme'
import { getLocalItem } from '../../utils/Storage'
import { useAppSelector } from '../../hooks/reduxHooks'
import LocationImages from './LocationImages'

const DynamicPage = () => {
  const finalisedPDDSectionWise = getLocalItem('finalpdf')

  const pageName = 'VCS Project Description Template, v4.3'

  const renderFormattedMsg = (msg: any) => {
    // Split the message string by newline characters (\n) to handle paragraphs
    const paragraphs = msg.split('\n\n')

    return paragraphs.map((paragraph: string, index: number) => (
      <Typography key={index} paragraph>
        {renderTextWithFormatting(paragraph)}
      </Typography>
    ))
  }

  // Function to render text with formatting (bold and headings)
  const renderTextWithFormatting = (text: string) => {
    // Replace **text** with bold formatting
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

    // Replace ### text with heading formatting
    text = text.replace(/### (.*?)(\n|$)/g, '<h3>$1</h3>')

    // Render the formatted HTML
    return (
      <span
        // style={{ fontWeight: 500, fontSize: 14 }}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    )
  }

  const aiSectionData: any = useAppSelector(
    ({ finalPDFSlice }) => finalPDFSlice.aiSectionData
  )

  return (
    <Box
      sx={{
        // maxWidth: '595px',
        maxWidth: '800px',
        px: 12,
        py: 3,
        marginX: 'auto',
        bgcolor: '#FFF',
        // height: '842px',
        mt: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'end',
        }}
      >
        <img
          style={{ marginLeft: '24px' }}
          src={Images.VerraLogo}
          height={28}
          width={78}
        />
        <Typography
          sx={{ fontSize: '14px', lineHeight: '16px', color: '#a3a3a3' }}
        >
          {pageName}
        </Typography>
      </Box>
      <Divider sx={{ mt: '4px', color: '#a6a6a6' }} />
      <Box sx={{ display: 'flex', mt: 3 }}>
        <Typography sx={{ width: '6%', fontSize: '32px', lineHeight: '16px' }}>
          {'1'}
        </Typography>
        <Typography sx={{ width: '94%', fontSize: '32px', lineHeight: '16px' }}>
          {'PROJECT DETAILS'}
        </Typography>
      </Box>

      {aiSectionData?.length > 0 ? (
        <Box sx={{ mt: 2 }}>
          {aiSectionData?.map((section: any, index: number) => {
            const sectionName = section?.section_pdd_data[0]?.section_name
            const spaceIndex = sectionName.search(' ')
            const slicedSectionName = sectionName.slice(spaceIndex)
            const sectionNumber = sectionName.slice(0, spaceIndex)

            return (
              <Box key={index}>
                <Box sx={{ display: 'flex', mt: 3, color: '#047299' }}>
                  <Typography sx={{ width: '6%', fontSize: '18px' }}>
                    {sectionNumber}
                  </Typography>
                  <Typography
                    sx={{
                      width: '94%',
                      fontSize: '18px',
                    }}
                  >
                    {slicedSectionName}
                  </Typography>
                </Box>
                <Box className={'gtp-response'}>
                  {section?.section_pdd_data[0]?.value?.map(
                    (data: any, dataIndex: number) => (
                      <Box key={dataIndex} sx={{ display: 'flex' }}>
                        {/* <Box  > */}
                        <Box sx={{ width: '6%', fontSize: '18px' }}></Box>
                        <Box
                          sx={{
                            width: '94%',
                            fontSize: '18px',
                          }}
                        >
                          {/* <GPTResponseParser msg={data} /> */}
                          <div
                            className="libre-franklin-normal"
                            key={dataIndex}
                            dangerouslySetInnerHTML={{ __html: data }}
                            style={{
                              outline: 'none',
                              fontWeight: 500,
                              fontSize: 14,
                            }}
                          />
                          {/* {data} */}
                        </Box>
                        {/* </Box> */}
                      </Box>
                    )
                  )}
                </Box>
                {section.section_no === '1.13' ? (
                  <Box sx={{ display: 'flex' }}>
                    <Box sx={{ width: '6%', fontSize: '18px' }}></Box>
                    <Box
                      sx={{
                        width: '94%',
                        fontSize: '18px',
                      }}
                    >
                      <LocationImages />
                    </Box>
                  </Box>
                ) : null}
              </Box>
            )
          })}
        </Box>
      ) : (
        <Typography
          sx={{
            my: 10,
            background: '#8BD3DC',
            padding: 2,
            textAlign: 'center',
            borderRadius: '8px',
          }}
        >
          Data not filled for a single section yet!!!
        </Typography>
      )}
    </Box>
  )
}

export default DynamicPage

// earlier map function

// {finalisedPDDSectionWise && (
//   <Box sx={{ p: 2 }}>
//     {Object.keys(finalisedPDDSectionWise)
//       .concat([])
//       ?.map(
//         (i: any, idx: number) => (
//           // finalisedPDDSectionWise[i]?.type === 'text' ? (
//           <>
//             {/* <Typography key={idx}>
//               {renderFormattedMsg(finalisedPDDSectionWise[i]?.value)}
//             </Typography> */}
//             <Box className={'gtp-response'}>
//               <GPTResponseParser
//                 key={idx}
//                 msg={finalisedPDDSectionWise[i]?.value}
//               />
//             </Box>
//             {/* <img
//               src={OnBoardingIllustration}
//               style={{
//                 height: '400px',
//                 width: '500px',
//                 objectFit: 'contain',
//               }}
//             /> */}
//           </>
//         )
//         // ) : (
//         //   <img
//         //     src={OnBoardingIllustration}
//         //     style={{
//         //       height: '200px',
//         //       width: '300px',
//         //       objectFit: 'contain',
//         //     }}
//         //   />
//         // )
//       )}
//     {/* <img
//         src={OnBoardingIllustration}
//         style={{
//           height: '200px',
//           width: '300px',
//           objectFit: 'contain',
//         }}
//       /> */}
//   </Box>
// )}
