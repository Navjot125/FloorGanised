import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { navigationRef } from '../../../App'

const Home = () => {
  return (
    <View>
      <Text onPress={()=>{
        navigationRef.reset({
          index: 0,
          routes: [{ name: "Root", params: { screen: "Login" } }]
      })
        // navigationRef.navigate("Login")
        }}>Home</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})