import { Box, CircularProgress } from '@chakra-ui/react'

const ScreenLoading = () => {
  return (
    <Box
      style={{
        position: 'absolute',
        backgroundColor: 'rgb(0 0 0 / 82%)',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress
        isIndeterminate
        color="blue.300"
        thickness="4px"
        size="120px"
      />
    </Box>
  )
}

export default ScreenLoading
