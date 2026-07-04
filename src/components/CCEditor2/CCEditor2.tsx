import Checklist from '@editorjs/checklist'
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import ImageTool from '@editorjs/image'
import List from '@editorjs/list'
import Table from '@editorjs/table'
import { Box, Divider } from '@mui/material'
import React, { FC, useEffect, useRef } from 'react'
import { fileUploadCalls } from '../../api/fileUpload.api'
// import './index2.css'

interface CCEditor2Props {
  editorID: string
  placeholder?: string
  initialValue?: string
  value?: any
  setValue?: any
  defaultBlock?: any
  tableRows?: any
  tableCols?: any
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
    // const formData: any = new FormData()
    // formData.append('image', file)

    // Make an AJAX request to your server for image upload
    // Replace 'your-upload-url' with the actual URL for image upload
    // fetch('your-upload-url', {
    //   method: 'POST',
    //   body: formData
    // })
    fileUploadCalls
      .uploadFile(file, file.name)
      .then(async (result: any) => {
        // The server should respond with the image URL
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

const CCEditor2: FC<CCEditor2Props> = (props) => {
  const {
    editorID,
    initialValue,
    value,
    setValue,
    placeholder,
    defaultBlock,
    tableRows,
    tableCols,
  } = props

  const ejInstance: any = useRef()

  useEffect(() => {
    if (!ejInstance.current) {
      initEditor()
    }

    return () => {
      ejInstance?.current?.destroy()
      ejInstance.current = null
    }
  }, [])

  console.log('editorjs -value: ', value)
  const initEditor = () => {
    const editor = new EditorJS({
      holder: editorID,
      data: value,
      onReady: () => {
        ejInstance.current = editor
        console.log('test, editor is ready: ', editor)
      },
      onChange: async () => {
        const content: any = await editor.saver.save()
        console.log(content)
        setValue(content)
      },
      placeholder: placeholder || '',
      tools: {
        header: {
          class: Header,
          inlineToolbar: ['link'],
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
          // class:createImageBlock,
          config: {
            endpoints: {
              // byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
              // byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
            },
            uploader: {
              /**
               * Upload file to the server and return an uploaded image data
               * @param {File} file - file selected from the device or pasted by drag-n-drop
               * @return {Promise.<{success, file: {url}}>}
               */

              // MINE
              // uploadByFile(file: any) {
              //   console.log('uploadByFile called')
              //   console.log('file', file)
              //   // your own uploading logic here
              //   return fileUploadCalls.uploadFile(file, file?.name).then(() => {
              //     return {
              //       success: 1,
              //       file: {
              //         url: 'https://codex.so/upload/redactor_images/o_80beea670e49f04931ce9e3b2122ac70.jpg',
              //         // any other image data you want to store, such as width, height, color, extension, etc
              //       },
              //     }
              //   })
              // },

              //ChatGPT's
              uploadByFile(file: any) {
                return uploadImage(file)
                  .then((res: any) => {
                    const { imgURLObj, imgName } = res
                    return {
                      success: 1,
                      file: {
                        url: imgURLObj,
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
  }

  return (
    <>
      <Box
        id={editorID}
        sx={{ height: 'auto', minHeight: '50px', id: 'my-box' }}
      ></Box>
      <Divider />{' '}
    </>
  )
}

export default CCEditor2
