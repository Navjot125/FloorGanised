import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Shimmer from 'react-native-shimmer';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const ShimmerEffect = () => {
  return Platform.OS === 'android' ? (
    <>
      <Shimmer
        animating={true}
        style={{
          height: 100,
          marginHorizontal: 20,
          marginTop: 10,
        }}>
        <View
          animating={true}
          style={{
            height: 100,
            backgroundColor: 'lightgray',
            marginHorizontal: 20,
            marginTop: 10,
            borderRadius: 16,
          }}></View>
      </Shimmer>
      <Shimmer
        style={{
          height: 100,
          marginHorizontal: 20,
          marginTop: 10,
        }}>
        <View
          style={{
            height: 100,
            backgroundColor: 'lightgray',
            marginHorizontal: 20,
            marginTop: 10,
            borderRadius: 16,
          }}></View>
      </Shimmer>
      <Shimmer
        style={{
          height: 100,
          marginHorizontal: 20,
          marginTop: 10,
        }}>
        <View
          style={{
            height: 100,
            backgroundColor: 'lightgray',
            marginHorizontal: 20,
            marginTop: 10,
            borderRadius: 16,
          }}></View>
      </Shimmer>
      <Shimmer
        style={{
          height: 100,
          marginHorizontal: 20,
          marginTop: 10,
        }}>
        <View
          style={{
            height: 100,
            backgroundColor: 'lightgray',
            marginHorizontal: 20,
            marginTop: 10,
            borderRadius: 16,
          }}></View>
      </Shimmer>
      <Shimmer
        style={{
          height: 100,
          marginHorizontal: 20,
          marginTop: 10,
        }}>
        <View
          style={{
            height: 100,
            backgroundColor: 'lightgray',
            marginHorizontal: 20,
            marginTop: 10,
            borderRadius: 16,
          }}></View>
      </Shimmer>
      <Shimmer
        style={{
          height: 100,
          marginHorizontal: 20,
          marginTop: 10,
        }}>
        <View
          style={{
            height: 100,
            backgroundColor: 'lightgray',
            marginHorizontal: 20,
            marginTop: 10,
            borderRadius: 16,
          }}></View>
      </Shimmer>
    </>
  ) : (
    <SkeletonPlaceholder borderRadius={16}>
      <View style={{height: 100, marginTop: 10, marginHorizontal: 20}}></View>
      <View style={{height: 100, marginTop: 10, marginHorizontal: 20}}></View>
      <View style={{height: 100, marginTop: 10, marginHorizontal: 20}}></View>
      <View style={{height: 100, marginTop: 10, marginHorizontal: 20}}></View>
      <View style={{height: 100, marginTop: 10, marginHorizontal: 20}}></View>
      <View style={{height: 100, marginTop: 10, marginHorizontal: 20}}></View>
    </SkeletonPlaceholder>
  );
};

export default ShimmerEffect;

const styles = StyleSheet.create({});
