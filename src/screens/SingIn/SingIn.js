import { Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import PlaceHolderLogo from '../../../assets/images/testLogo.jpg';
import CustomInput from '../../components/CustomInput';

const SingIn = () => {
    const { height } = useWindowDimensions();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  return (
    <View style={styles.root}>
        <Image source={PlaceHolderLogo} style={[styles.logo, {height: height * 0.3}]} resizeMode="contain" />
        <CustomInput placeholder={'Email'} value={email} setValue={setEmail} />
        <CustomInput placeholder={'Contraseña'} value={password} setValue={setPassword} />
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