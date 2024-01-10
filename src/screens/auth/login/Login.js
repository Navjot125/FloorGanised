import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {navigationRef} from '../../../../App';
import CommonTextInput from '../../../components/Input/InputBox';
import CommonButton from '../../../components/CommonButton/CommonButton';
import CommonBackground from '../../../components/CommonBG/CommonBackground';
import {height} from '../../../assets/styles/styles';

const Login = () => {
  const [text, setText] = useState('');
  const onPress = () => {
    navigationRef.reset({
      index: 0,
      routes: [{ name: "tabs" }]
    })
  }
  return (
    <View>
      <CommonBackground />
      <SafeAreaView />
      <View style={{paddingTop: height / 4}}>
        <View style={{height:height/2.2, width:'90%', backgroundColor:'black', marginHorizontal:20, borderRadius:40}} >
          <CommonTextInput
            placeholder="Type here..."
            value={text}
            onChangeText={newText => setText(newText)}
          />
          <CommonTextInput
            placeholder="Type here..."
            value={text}
            onChangeText={newText => setText(newText)}
          />
          <CommonButton title="Login" onPress={onPress} />
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
