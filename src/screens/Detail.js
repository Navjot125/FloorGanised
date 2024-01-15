import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Detail = () => {
  return (
    <>
      <StatusBar
      barStyle="light-content" 
      />
      <SafeAreaView />
      <View style={styles.container}>
        {/* <Text>Details</Text> */}
      </View>
    </>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    height: 141,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    marginTop: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 11.27,
    elevation: 14,
    marginHorizontal: 20,
  },
});
