import * as React from 'react'
import type { GlobalTypes } from '@storybook/csf'
import type { StoryFn, StoryContext } from '@storybook/react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import theme from 'config/chakra.config'
/** @type { import("@storybook/csf").GlobalTypes } */
export const globalTypes: GlobalTypes = {}
/**
 * An example, no-op storybook decorator. Use a function like this to create decorators.
 * @param { import("@storybook/react").StoryFn} StoryFn
 * @param { import("@storybook/react").StoryContext} context
 */
const _exampleDecorator = (StoryFn: StoryFn, _context: StoryContext) => {
  return <StoryFn />
}
const extendedTheme = extendTheme(theme)
/**
 * @param { import("@storybook/react").StoryFn} StoryFn
 */
const withChakra = (StoryFn: StoryFn) => {
  return (
    <ChakraProvider theme={extendedTheme}>
      <StoryFn />
    </ChakraProvider>
  )
}
export const decorators = [withChakra]
