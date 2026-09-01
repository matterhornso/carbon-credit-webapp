// @desc USE THIS AI ONLY FOR TOOLTIP

import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { setShowAiField } from '../../../redux/Slices/GenerateAiSlice'
import { useAppDispatch } from '../../../hooks/reduxHooks'
import { setLocalItem } from '../../../utils/Storage'

const AIBlockTuneComp = ({ api, closeTune }: any) => {
  // console.log('api in AIBLockTuneCOMp: ', api, api.block, api.caret)
  // const [showAiField, setShowAiField] = useState<any>()
  //useEffect(() => {
  //  const tuneEl: any = document.querySelector('.ce-popover--opened')
  //  const divEl = document.createElement('div')
  //  divEl.textContent = 'testing'
  //  const inputEl = document.createElement('input')
  //  //divEl.wrapper
  //  //newElement.textContent = 'New Element';
  //  //newElement.
  //  //tuneEl.parentNode.insertAfter(divEl, tuneEl)
  //  console.log('tuneEl: ', tuneEl)
  //}, [])

  return (
    <div>
      <div
        onClick={() => {
          console.log('clicked')
          //setShowAiField(true)
          //closeTune()
          //const blockIndex = api.blocks.getCurrentBlockIndex()
          //setLocalItem('showAI', { showAiField: true, blockIndex })
          //const blockIndex = 0
          //setLocalItem('showAI', true)
          //setLocalItem('blockIndex', blockIndex)
          //dispatch(setShowAiField(true))
          //console.log('api.blocks.getById()', api.blocks.getCurrentBlockIndex())
          //const getIndex = api.blocks.getCurrentBlockIndex()
          //const getBlock = api.blocks.getBlockByIndex(getIndex)
          //console.log('getBlock: ', getBlock)
          ////.holder return -> html content
          ////.id return id
          //// name returns type
          //console.log('saver: ', await api.saver.save())
        }}
        style={{ cursor: 'pointer' }}
      >
        <span
          style={{
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: '500',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            marginLeft: '40px',
            display: 'block',
          }}
        >
          Ask AI
        </span>
      </div>
      {/*<Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          p: 2,
          border: '2px solid black',
        }}
      >
        <input type="text" placeholder="this is ai field" />
      </Box>*/}
    </div>
  )
}

export default AIBlockTuneComp
