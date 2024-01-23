import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {navigationRef} from '../../../../App';
import CommonTextInput from '../../../components/Input/InputBox';
import CommonButton from '../../../components/CommonButton/CommonButton';
import CommonBackground from '../../../components/CommonBG/CommonBackground';
import {height} from '../../../assets/styles/styles';
import {RadioButton} from 'react-native-paper';
import {COLORS} from '../../../utils/theme';
import Back from '../../../components/BackButton/Back';
import {scale} from 'react-native-size-matters';
import {useDispatch} from 'react-redux';
import {setUserData} from '../../../redux/reducers/User';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';
// import {PostApi} from '../../../services/ApisMethods';
import {PostApi, PostApi2} from '../../../services/ApisMethods';

const Signup = () => {
  const userData = [
    {
      name: 'Navjot Singh',
      email: 'Navjots.indiit@gmail.com',
      phone: '7009173569',
      _id: 0,
      role: 1,
      profile: '../../../assets/images/Profile1.jpg',
    },
    {
      name: 'Gurmukh Singh',
      email: 'Gurmukh.indiit@gmail.com',
      phone: '9653719007',
      _id: 1,
      role: 2,
      profile: '../../../assets/images/Profile2.jpg',
    },
  ];
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [error, setErrors] = useState();

  const options = ['Fitter', 'Surveyor'];
  const handleOptionPress = option => {
    setSelectedOption(option);
  };
  const dispatch = useDispatch();
  const onPress = () => {
    navigationRef.reset({
      index: 0,
      routes: [{name: 'tabs'}],
    }),
      dispatch(setUserData(userData[1]));
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('First Name is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    cPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    selectedOption: Yup.string()
      .required('Role is required')
      .oneOf(['Fitter', 'Surveyor'], 'Role must be either Fitter or Surveyor'),
  });

  const handleSignUp = async () => {
    console.log('selectedOption', selectedOption);
    try {
      // Validate form inputs
      await validationSchema.validate(
        {name, email, password, cPassword, selectedOption},
        {abortEarly: false},
      );

      // Form inputs are valid, proceed with signup
      const params = {
        name,
        email,
        password,
        role: selectedOption,
      };
      console.log('params----', params);
      const response = await PostApi('signup', params);
      if (response?.data) {
        console.log(response.data, 'res?.data');
        navigationRef.reset({
          index: 0,
          routes: [{name: 'tabs'}],
        }),
          dispatch(setUserData(userData[1]));
      } else {
        console.log(response, 'res');
      }
    } catch (error) {
      console.log(error, '------errors');
      const validationErrors = {};
      if (error.inner) {
        error.inner.forEach(err => {
          console.log(err, 'checking it ', err.path);
          validationErrors[err.path] = err.message;
        });
      }
      setErrors(validationErrors);
      console.error(error.errors ? error.errors[0] : error);
    }
  };

  useEffect(() => {
    console.log(error, 'here we have this');
  }, [error]);
  return (
    <View
      style={{flex: 1, paddingTop: Platform.OS === 'android' ? 0 : scale(120)}}>
      <CommonBackground title={'Sign Up'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets
        contentContainerStyle={{
          // flex:1,
          flexGrow: 1,
          paddingTop: Platform?.OS === 'android' ? height / 2.8 : height / 4.1,
        }}>
        <View style={styles.innerBox}>
          <View style={styles.radioBox}>
            {options.map(option => (
              <View
                key={option}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <RadioButton.Android
                  color={COLORS.secondry}
                  value={option}
                  status={selectedOption === option ? 'checked' : 'unchecked'}
                  onPress={() => handleOptionPress(option)}
                />
                <Text style={{color: 'black'}}>{option}</Text>
              </View>
            ))}
          </View>
          <View style={{height: '66%', justifyContent: 'space-between'}}>
            <CommonTextInput
              placeholder="Full Name"
              value={name}
              onChangeText={newText => setName(newText)}
            />
            {error && error?.firstName && (
              <Text style={styles.erroz}>{error && error?.firstName}</Text>
            )}
            <CommonTextInput
              placeholder="Email Address"
              value={email}
              onChangeText={newText => setEmail(newText)}
            />
            <CommonTextInput
              placeholder="Password"
              value={password}
              onChangeText={newText => setPassword(newText)}
            />
            <CommonTextInput
              placeholder="Confirm Password"
              value={cPassword}
              onChangeText={newText => setCPassword(newText)}
            />
          </View>
          <CommonButton
            style={styles.Button}
            title="Sign Up"
            onPress={handleSignUp}
          />
        </View>
      </ScrollView>
      <Text
        style={{
          alignSelf: 'center',
          bottom: 30,
          position: 'absolute',
          fontWeight: 300,
        }}>
        Already have an account ?
        <Text
          onPress={() => {
            navigationRef.navigate('Login');
          }}
          style={{fontWeight: 500}}>
          {' '}
          Login
        </Text>
      </Text>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  innerBox: {
    // top:height/2.75,
    minHeight: height / 1.8,
    width: '90%',
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.1,
    shadowRadius: 16.27,
    elevation: 14,
    bottom: '6%',
    // marginBottom:150
  },
  radioBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  Button: {
    marginTop: '5%',
  },
});
