import { StyleSheet } from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { theme } from '~/global/styles/theme'

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  user: {
    flexDirection: 'row'
  },
  greeting: {
    fontFamily: theme.fonts.title500,
    fontSize: 24,
    color: theme.colors.heading,
    marginRight: 6
  },
  username: {
    fontFamily: theme.fonts.title700,
    fontSize: 24,
    color: theme.colors.heading
  },
  message: {
    fontFamily: theme.fonts.text400,
    color: theme.colors.highlight
  },
  modalContainer: {
    paddingHorizontal: 24,
    marginBottom: getBottomSpace() * 2
  },
  modalTitle: {
    fontSize: 24,
    color: theme.colors.heading,
    fontFamily: theme.fonts.title500,
    textAlign: 'center',
    marginVertical: 24
  },
  modalTitleWhite: {
    fontFamily: theme.fonts.title700
  },
  modalTitleRed: {
    fontFamily: theme.fonts.title700,
    color: theme.colors.primary
  },
  modalFooter: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})
