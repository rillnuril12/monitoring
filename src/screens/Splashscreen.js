import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import Logo from '../assets/Icon.png'

const Splashscreen = ({ navigation }) => {
  setTimeout(() => {
    navigation.replace('Dashboard');
  }, 3000);
  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <Text
        style={styles.text}>Fish Water</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A3150',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 250,
    top: 250,
    position: 'absolute',
  },
  text: {
    position: 'absolute',
    width: 200,
    height: 200,
    left: 100,
    top: 420,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 36,
    letterSpacing: 3,
    textAlign: 'center',
    color: '#FDCB5A',
  }
})
export default Splashscreen