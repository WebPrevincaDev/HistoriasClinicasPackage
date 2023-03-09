import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();


  return (
    <View>
      <Text>
        -Home-
        Añadir la configuración de ambulancias, enfermeros y chofer
      </Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})