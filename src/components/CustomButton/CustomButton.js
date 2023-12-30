import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'

const CustomButton = ({ onPress, text, disabled, type = "PRIMARY" }) => {
  return (
    <Pressable disabled={disabled} onPress={onPress} style={[styles.container, styles[`container_${type}`], disabled && styles.containerDisabled]}>
      <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
    </Pressable>
  )
}

export default CustomButton

const styles = StyleSheet.create({
  container: {
    width: '100%',

    padding: 16,
    marginVertical: 5,

    alignItems: 'center',
    borderRadius: 6,
  },

  containerDisabled: {
    opacity: 0.6
  },

  container_PRIMARY: {
    backgroundColor: '#3B71F3',
  },

  container_SECONDARY: {
    borderColor: '#3B71F3',
    borderWidth: 2,
  },

  container_TERTIARY: {

  },

  container_SIMPLE: {
    padding: 16,
    backgroundColor: 'transparent',
  },

  text: {
    fontWeight: 'bold',
  },

  text_PRIMARY: {
    color: 'white',
  },

  text_SECONDARY: {
    color: '#3B71F3',
  },

  text_TERTIARY: {
    color: 'gray',
  },

  text_SIMPLE: {
    color: '#004dff',
    fontSize: 20,
  },
})