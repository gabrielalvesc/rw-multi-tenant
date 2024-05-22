import { Box, CircularProgress } from '@chakra-ui/react'

const ScreenLoading = () => {
  return (
    <Box
      position={'absolute'}
      backgroundColor={'rgba(0,0,0,0.685'}
      w={'100%'}
      h={'100vh'}
      top={0}
      left={0}
      zIndex={9998}
      display={'block'}
      overflow={'hidden'}
    >
      <CircularProgress isIndeterminate color="blue.300" />
    </Box>
  )
}

export default ScreenLoading
