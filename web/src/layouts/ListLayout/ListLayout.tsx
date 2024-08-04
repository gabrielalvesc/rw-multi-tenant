import { Box, Button, Image, Text } from '@chakra-ui/react'

import { navigate, routes } from '@redwoodjs/router'

type ListLayoutProps = {
  children?: React.ReactNode
  icon?: React.ReactNode
  title?: string
  subtitle?: string
  buttonLabel?: string
  buttonTo?: string
}

const ListLayout = ({
  children,
  icon,
  title,
  subtitle,
  buttonLabel,
  buttonTo,
}: ListLayoutProps) => {
  return (
    <Box position={'relative'}>
      <Box
        height={'238px'}
        position={'relative'}
        background="linear-gradient(264deg, rgba(86, 255, 245, 0.20) 5.06%, rgba(91, 157, 255, 0.06) 55.35%, rgba(86, 148, 241, 0.06) 55.35%, rgba(0, 0, 0, 0.00) 76.05%), #354A84"
        padding={'24px 20px'}
        backgroundImage={`url('/assets/images/list-background.png')`}
        backgroundRepeat={'no-repeat'}
        backgroundPosition={'right'}
        backgroundSize={'269px 238px'}
        display={'flex'}
        flexDirection={'column'}
        gap={'28px'}
      >
        <Box display={'flex'} justifyContent={'space-between'}>
          <Box display={'flex'} gap={'8px'}>
            <Box
              display={'flex'}
              width={'46px'}
              height={'46px'}
              justifyContent={'center'}
              alignItems={'center'}
              borderRadius={'4px'}
              border={'1px solid #40689D'}
              boxShadow={'0px 3px 6px 0px rgba(0, 0, 0, 0.15)'}
            >
              {icon}
            </Box>
            <Box display={'flex'} flexDirection={'column'}>
              <Text
                color={'white'}
                fontSize={'24px'}
                fontWeight={700}
                lineHeight={'28px'}
              >
                {title}
              </Text>
              <Text
                color={'white'}
                fontSize={'12px'}
                fontWeight={400}
                lineHeight={'16px'}
                letterSpacing={'0.4px'}
              >
                {subtitle}
              </Text>
            </Box>
          </Box>
          <Box display={'flex'} alignItems={'center'}>
            <Button onClick={() => navigate(routes[buttonTo]())}>
              {buttonLabel}
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        position={'absolute'}
        top={'68px'}
        left={0}
        right={0}
        padding={'24px 20px'}
      >
        {children}
      </Box>
    </Box>
  )
}

export default ListLayout
