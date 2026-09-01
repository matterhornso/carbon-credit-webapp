import React from 'react'

// Renders a project-location image from a data URI. Relocated into FinalPDF
// from the (removed) GenerateProjectWithAIComp tree; the original also read a
// GPTAssistanceConversationSlice value that was only console.logged and never
// used in the render, so that dependency is dropped here.
const GeoLocationImg = ({ dataUri, width = 300, height = 150 }: any) => {
  return dataUri ? (
    <img src={dataUri} alt="" width={width} height={height} />
  ) : (
    <></>
  )
}

export default GeoLocationImg
