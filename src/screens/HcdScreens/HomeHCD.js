import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButton from '../../components/CustomButton'

const HomeHCD = () => {
  return (
    <View>
      <Text>Médico: NOMBRE_DEL_MÉDICO</Text>
      <CustomButton text={"AGREGAR"} onPress={()=>console.warn("SE INTENTA CREAR UNA HCD...")} />
    </View>
  )
}

export default HomeHCD

const styles = StyleSheet.create({})