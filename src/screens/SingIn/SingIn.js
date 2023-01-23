import { Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import PlaceHolderLogo from '../../../assets/images/testLogo.jpg';

const SingIn = () => {
    const { height } = useWindowDimensions();
  return (
    <View style={styles.root}>
        <Image source={PlaceHolderLogo} style={[styles.logo, {height: height * 0.3}]} resizeMode="contain" />
      <Text>SingIn</Text>
    </View>
  )
}

export default SingIn

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
    }
})