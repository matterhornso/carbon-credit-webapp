import React, { useEffect, useState } from 'react'
import { CCDocViewerProps } from './CCDocViewer.interface'
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import "./style.css"

const style = {
  position: 'absolute' as const,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  // left: '50%',
  // transform: 'translate(-50%, -50%)',
  // width: 400,
  bgcolor: 'white',
  // border: '2px solid #000',
  // boxShadow: 24,
  p: 4,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const CCDocViewer = (props: CCDocViewerProps) => {
  const [docs, setDocs] = useState([])
  const { documents } = props
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  useEffect(() => {
    setDocs(documents)
  }, [props.documents])
  // const docs = [{ uri: 'https://i.imgur.com/Hw3kOF5.jpeg' }]
  return (
    <>
      {!open ? (
        <Tooltip
          disableFocusListener
          disableTouchListener
          disableInteractive
          title={'Click To Expand'}
          TransitionProps={{ timeout: 200 }}
        >
          <Box onClick={handleOpen} sx={{ cursor: 'pointer' }}>
            <DocViewer
              config={{
                header: {
                  disableHeader: true,
                  disableFileName: true,
                  retainURLParams: false,
                },
                // csvDelimiter: ',', // "," as default,
                // pdfZoom: {
                //   defaultZoom: 1.1, // 1 as default,
                //   zoomJump: 0.2, // 0.1 as default,
                // },
              }}
              style={{
                width: props.width || 500,
                height: props.height || 500,
                borderRadius: 2,
                backgroundColor: props.background || 'white',
                
              }}
              documents={docs}
              pluginRenderers={DocViewerRenderers}
            />
          </Box>
        </Tooltip>
      ) : null}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box
              sx={{
                position: 'absolute',
                right: 40,
                top: 50,
                cursor: 'pointer',
              }}
            >
              <IconButton>
                <CloseIcon onClick={handleClose} sx={{ fontSize: 36 }} />
              </IconButton>
            </Box>
            <DocViewer
              config={{
                header: {
                  disableHeader: true,
                  disableFileName: true,
                  retainURLParams: false,
                },
                // csvDelimiter: ',', // "," as default,
                // pdfZoom: {
                //   defaultZoom: 1.1, // 1 as default,
                //   zoomJump: 0.2, // 0.1 as default,
                // },
              }}
              style={{
                // width: 500,
                height: '90vh',
                backgroundColor: '#fff',
                borderRadius: 8,
              }}
              documents={documents}
              pluginRenderers={DocViewerRenderers}
            />
          </Box>
        </Fade>
      </Modal>
    </>
  )
}
export default CCDocViewer
