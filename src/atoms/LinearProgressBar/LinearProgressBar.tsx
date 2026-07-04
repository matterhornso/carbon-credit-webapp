import React from 'react'
import { LinearProgressBarProps } from './LinearProgressBar.interface'
import LinearProgress, {
  LinearProgressProps,
} from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box
      sx={{
        display: 'flex',
        // alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ minWidth: 35 }}>
        <Typography
          sx={{ fontSize: 20, marginBottom: 1 }}
          variant="body2"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress
          variant="determinate"
          sx={{ borderRadius: 8, height: 8 }}
          {...props}
        />
      </Box>
    </Box>
  )
}

const LinearProgressBar = (props: LinearProgressBarProps) => {
  const [progress, setProgress] = React.useState(props?.value || 10)

  // React.useEffect(() => {
  //     const timer = setInterval(() => {
  //         setProgress((prevProgress) =>
  //             prevProgress >= 100 ? 10 : prevProgress + 10
  //         )
  //     }, 800)
  //     return () => {
  //         clearInterval(timer)
  //     }
  // }, [])

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  )
}

export default LinearProgressBar
