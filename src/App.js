import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ILLogo } from './assets'

const App = () => {
  return (
    <View style={styles.container}>
      <ILLogo />
      <Text>My Doctor</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  }
})

export default App