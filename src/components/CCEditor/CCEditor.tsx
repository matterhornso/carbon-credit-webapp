import Checklist from '@editorjs/checklist'
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import ImageTool from '@editorjs/image'
import List from '@editorjs/list'
import Table from '@editorjs/table'
import Marker from '@editorjs/marker'
import { Box, Divider } from '@mui/material'
import React, { FC, useEffect, useRef, useState } from 'react'
import { fileUploadCalls } from '../../api/fileUpload.api'
import './index.css'
// import AskAiTool from './AskAI/AskAITool'
// import AskAiTooltip from './AskAI/AskAiTooltip'
import { AiBlockTune } from './AskAI/AiBlockTune'
import {
  setEditorBlockAction,
  setEditorBlockActionDeleteParams,
  setEditorBlockActionInsertParams,
  setEditorBlockActionUpdateParams,
} from '../../redux/Slices/GenerateAiSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { disableAiBlockTune } from './AskAI/disableAiBlockTune'

interface CCEditorProps {
  editorID: string
  placeholder?: string
  initialValue?: string
  value?: any
  setValue?: any
  defaultBlock?: any
  tableRows?: any
  tableCols?: any
  showAiTune?: boolean
}

// Create a new block with an image
function createImageBlock(url: string, imgName: string) {
  return {
    type: 'image',
    data: {
      url: url,
      imgName,
    },
  }
}

// Custom image upload function
function uploadImage(file: any) {
  return new Promise((resolve, reject) => {
    fileUploadCalls
      .uploadFile(file, file.name)
      .then(async (result: any) => {
        if (result && result?.data && result?.data?.length) {
          const imgName = result.data[0].ipfs_hash
          const imgURLObj = await getImage(imgName)

          resolve({ imgURLObj, imgName })
        } else {
          reject('Image upload failed')
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}

const getImage = async (imgName: string) => {
  const uploadedImageServerRes = await fileUploadCalls.getFile(imgName)
  const imgURLObj = URL.createObjectURL(uploadedImageServerRes)
  return imgURLObj
}

const CCEditor = (props: CCEditorProps) => {
  const {
    editorID,
    initialValue,
    value,
    setValue,
    placeholder,
    defaultBlock,
    tableRows,
    tableCols,
    showAiTune = true,
  } = props
  const dispatch = useAppDispatch()
  console.log('showAiTune: ', showAiTune)
  const [editorMethods, setEditorMethods] = useState<any>({})
  const [editEditorData, setEditEditorData] = useState<boolean>(false)
  console.log('editEditorData: ', editEditorData)
  const editorBlockAction = useAppSelector(
    ({ generateAi }) => generateAi.editorBlockAction
  )
  const editorBlockActionInsertParams = useAppSelector(
    ({ generateAi }) => generateAi.editorBlockActionInsertParams
  )
  const editorBlockActionUpdateParams = useAppSelector(
    ({ generateAi }) => generateAi.editorBlockActionUpdateParams
  )
  const editorBlockActionDeleteParams = useAppSelector(
    ({ generateAi }) => generateAi.editorBlockActionDeleteParams
  )
  const currentProjectDraftDetails = useAppSelector(
    ({ projectDraftDetails }) => projectDraftDetails.currentProjectDraftDetails
  )

  useEffect(() => {
    if (currentProjectDraftDetails) {
      setEditEditorData(
        currentProjectDraftDetails?.project_status >= 1400 ? true : false
      )
    }
  }, [currentProjectDraftDetails])

  console.log('editorMethods: ', editorMethods, editorBlockAction)
  useEffect(() => {
    if (editorBlockAction?.modifyBlock) {
      if (
        editorBlockAction?.method.includes('insert') &&
        editorMethods?.insertNewBlock
      ) {
        const { type, data, config, blockIndexToInsert, focus } =
          editorBlockActionInsertParams
        if (!type || !data || typeof blockIndexToInsert !== 'number') {
          dispatch(setEditorBlockAction({}))
          dispatch(setEditorBlockActionInsertParams({}))
          return
        }
        editorMethods.insertNewBlock(
          type,
          data,
          config,
          blockIndexToInsert,
          focus
        )
        dispatch(setEditorBlockAction({}))
        dispatch(setEditorBlockActionInsertParams({}))
      }
      if (
        editorBlockAction?.method.includes('update') &&
        editorMethods?.updateBlockData
      ) {
        const { blockIndex, data } = editorBlockActionUpdateParams
        if (typeof blockIndex !== 'number' || !data) {
          dispatch(setEditorBlockAction({}))
          dispatch(setEditorBlockActionUpdateParams({}))
          return
        }
        console.log('value from useEffect: ', value, blockIndex)
        if (value?.blocks) {
          const blockId = value?.blocks[blockIndex]?.id
          console.log('blockId: ', blockId)
          editorMethods.updateBlockData(blockId, data)
          dispatch(setEditorBlockAction({}))
          dispatch(setEditorBlockActionUpdateParams({}))
        }
      }
      if (
        editorBlockAction?.method.includes('delete') &&
        editorMethods.deleteBlockByIndex
      ) {
        editorMethods.deleteBlockByIndex(editorBlockActionDeleteParams)
        dispatch(setEditorBlockAction({}))
        dispatch(setEditorBlockActionDeleteParams(null))
      }
    }
  }, [editorBlockAction])

  const ejInstance: any = useRef()
  const editorRef: any = useRef()

  useEffect(() => {
    if (!ejInstance.current) {
      initEditor()
    }

    return () => {
      ejInstance?.current?.destroy()
      ejInstance.current = null
    }
  }, [])
  console.log(`editorjs  ${editorID} - value: `, value)

  const initEditor = () => {
    const editor: any = new EditorJS({
      holder: editorID,
      data: value,
      readOnly:
        currentProjectDraftDetails?.project_status >= 1400 ? true : false,
      onReady: async () => {
        ejInstance.current = editor
        console.log('editor: ', editor.blocks)
        setEditorMethods({
          insertNewBlock: editor?.blocks?.insert,
          updateBlockData: editor?.blocks?.update,
          deleteBlockByIndex: editor?.blocks?.delete,
        })
      },
      onChange: async (api, event) => {
        // console.log({ api, event })
        const content: any = await editor?.saver?.save()

        setValue(content)
      },
      placeholder: placeholder || '',
      tunes: ['AiBlockTune'],

      tools: {
        Comment: {
          class: Marker,
          shortcut: 'CMD+SHIFT+M',
        },
        AiBlockTune: !showAiTune ? disableAiBlockTune : AiBlockTune,
        // disableAiBlockTune:disableAiBlockTune,
        // tooltip: {
        //   // class: AskAiTooltip,
        //   config: {
        //     location: 'left',
        //     highlightColor: '#FFEFD5',
        //     underline: true,
        //     backgroundColor: '#154360',
        //     textColor: '#FDFEFE',
        //     holder: 'editorId',
        //   },
        // },
        // AI: AskAiTool,
        header: {
          class: Header,
          inlineToolbar: true,
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
        table: {
          class: Table,
          inlineToolbar: true,
          config: {
            class: 'custom-table',
            withHeadings: true,
            rows: tableRows,
            cols: tableCols,
          },
        },
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              // byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
              // byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
            },
            uploader: {
              uploadByFile(file: any) {
                console.log('file', file)
                return uploadImage(file)
                  .then((res: any) => {
                    const { imgURLObj, imgName } = res
                    return {
                      success: 1,
                      file: {
                        // url: imgURLObj,
                        url: imgName,
                        imgURLObj: imgURLObj,
                        imgName: imgName,
                      },
                    }
                  })
                  .catch((error) => {
                    console.error('Image upload error:', error)
                    return {
                      success: 0,
                      message: 'Image upload failed',
                    }
                  })
              },
            },
          },
        },
        checkbox: {
          class: Checklist,
          inlineToolbar: true,
          config: {
            checkboxClass: 'custom-checkbox',
            checkboxCheckedClass: 'custom-checkbox-checked',
            checkboxUncheckedClass: 'custom-checkbox-unchecked',
          },
        },
      },
      defaultBlock,
    })

    // const addListenerToMarker = () => {
    //   //   editor.listeners.on(
    //   //     markerInlineTool.class,
    //   //     'click',
    //   //     (event: any, payload: any) => {
    //   //       // Handle the marker tool click event here
    //   //       console.log('Marker tool clicked:', payload)
    //   //     }
    //   //   )

    //   const inlineTool = editor.inlineTools.get('Marker')

    //   // Access the DOM element associated with the inline tool
    //   const inlineToolElement = inlineTool.render()

    //   // Add a listener to the inline tool element
    //   inlineToolElement.addEventListener('click', () => {
    //     // Your listener logic here
    //     console.log('Inline tool clicked!')
    //   })
    // }
    // console.log('editor', editor)
  }

  return (
    <>
      <Box
        id={editorID}
        sx={{
          height: 'auto',
          minHeight: '50px',
          id: 'my-box2',
          pl: '20px',
          width: '100%',
        }}
      ></Box>
      <Divider />{' '}
    </>
  )
}

export default CCEditor
