import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import PdfV2GridLayout from './PdfV2GridLayout'
import ChecklistComp from './ChecklistComp'
import ImageComp from './ImageComp'
import ListComp from './ListComp'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const ParagraphComp = ({ sectionData }: any) => {
  return (
    <Box>
      {sectionData?.map((i: any, idx: number) => (
        <Box key={idx}>
          {i?.inStep_title && <Box>{i?.inStep_title}</Box>}
          <Box>
            {i?.data?.map((item: any, index: number) => (
              <Box key={index}>
                {item?.type === 'paragraph' ? (
                  <Text>
                    <Typography sx={{ fontWeight: 400, fontSize: '14px' }}>
                      {item?.content}
                    </Typography>
                  </Text>
                ) : item?.type === 'table' ? (
                  <PdfV2GridLayout gridData={item?.content} />
                ) : item?.type === 'checkbox' ? (
                  <ChecklistComp checkboxData={item?.content} />
                ) : item?.type === 'image' ? (
                  <ImageComp imgData={item?.content} />
                ) : item?.type === 'list' ? (
                  <ListComp listData={item?.content} />
                ) : null}
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default ParagraphComp
