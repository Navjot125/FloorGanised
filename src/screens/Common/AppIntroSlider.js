import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {COLORS} from '../../utils/theme';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import AuthNavigator from '../../Navigation/AuthNavigator';
import {navigationRef} from '../../../App';
export default function AppIntro() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const navigation = useNavigation();
  const slides = [
    {
      key: 1,
      title: 'Introduction 1',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi nulla purus neque',
      image: require('../../assets/images/Introduction.png'),
      backgroundColor: '#59b2ab',
    },
    {
      key: 2,
      title: 'Introduction 2',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi nulla purus neque',
      image: require('../../assets/images/Introduction1.png'),
      backgroundColor: '#febe29',
    },
    {
      key: 3,
      title: 'Introduction 3',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi nulla purus neque',
      image: require('../../assets/images/Introduction2.png'),
      backgroundColor: '#22bcb5',
    },
  ];

  const renderItem = ({item}) => (
    <View style={styles.slideContainer}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.text}</Text>
      </View>
    </View>
  );
  const onDone = () => {
    navigationRef.navigate('Login');
  };
  const onSkip = () => {
    // navigationRef.navigate('Login');
    navigationRef.reset({
      index: 0,
      routes: [{name: 'tabs'}],
    });
  };
  const onNext = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      onDone();
    }
  };
  return (
    <View style={{height: '100%', width: '100%'}}>
      <AppIntroSlider
        renderItem={renderItem}
        data={slides}
        onDone={onDone}
        renderDoneButton={() => (
          <TouchableOpacity onPress={onSkip} style={styles.skipButton}>
            <Text style={styles.skipButton}>Done</Text>
          </TouchableOpacity>
        )}
        onSkip={onSkip}
        showSkipButton
        // showNextButton
        // renderNextButton={() => (
        //   <TouchableOpacity
        //     onPress={onNext}
        //     style={{
        //       backgroundColor: COLORS.primary,
        //       width: 120,
        //       height: 56,
        //       borderRadius: 40,
        //       justifyContent: 'center',
        //       alignItems: 'center',
        //     }}>
        //     <Text style={[styles.skipButton, {color: 'black'}]}>Next</Text>
        //   </TouchableOpacity>
        // )}
        renderSkipButton={() => (
          <TouchableOpacity
            title="Skip"
            onPress={onSkip}
            style={{
              width: 120,
              height: 56,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.skipButton}>Skip</Text>
          </TouchableOpacity>
        )}
        index={currentSlideIndex}
        activeDotStyle={{backgroundColor: COLORS.primary, bottom: '35%'}}
        dotStyle={{backgroundColor: COLORS.white, bottom: '35%'}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  slideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  textContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the opacity as needed
    padding: 20,
    borderRadius: 10,
    position: 'absolute',
    bottom: '25%', // Adjust the position as needed
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: 'white',
  },
  skipButton: {
    color: 'white',
    fontSize: 16,
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'gray',
    marginHorizontal: 8,
  },
  activeDot: {
    backgroundColor: 'blue',
  },
});
