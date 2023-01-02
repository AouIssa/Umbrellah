import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

// formik
import { Formik } from 'formik';

//icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

//keyboard avoid view
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

//api client
import axios from 'axios';


import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledFormArea,
  LeftIcon,
  StyledInputLabel,
  StyledTextInput,
  RightIcon,
  StyledButton,
  ButtonText,
  Colors,
  Line,
  MsgBox,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
} from './../components/style';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';

//colors
const { brand, darkLight, primary } = Colors;

import baseURL from '../api/client';

const SignUp = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [show, setShow] = useState(false);

  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  //form handling
  const handleSignUp = (credentials, setSubmitting) => {
    handleMessage(null);

    axios
      .post(baseURL + '/register', credentials)
      .then((response) => {
        const result = response.data;
        const { message, status, data } = result;

        if (status !== 'SUCCESS') {
          handleMessage(message, status);
        } else {
          navigation.navigate('Welcome', { ...data[0] });
        }
        setSubmitting(false);
      })
      .catch((error) => {
        console.log(error.toJSON());
        setSubmitting(false);
        handleMessage('An error occured. Check your network and try again');
      });
  };


  
  const handleMessage = (message, type = 'FAILED') => {
    setMessage(message);
    setMessageType(type);
  };
  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageTitle>Umbrellah</PageTitle>
          <SubTitle>Account Sign Up</SubTitle>

          <Formik
            initialValues={{ name: '', email: '', password: '', confrimPassword: '' }}
            onSubmit={(values, { setSubmitting }) => {
              values = {...values};
              if (values.name == '' || values.email == '' || values.password == '' || values.confirmPassword == '') {
                handleMessage('Please fill all the fields');
                setSubmitting(false);
              } else if (values.password !== values.confirmPassword) {
                handleMessage('Password do not match');
                setSubmitting(false);
              } else {
                handleSignUp(values, setSubmitting);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
              <StyledFormArea>
                <MyTextinput
                  label="Full Name"
                  icon="person"
                  placeholder="John Smith"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
                <MyTextinput
                  label="Email Address"
                  icon="mail"
                  placeholder="yourEmail@example.com"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                />

                <MyTextinput
                  label="Password"
                  icon="lock"
                  placeholder="* * * * * * * * * * * * * *"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MyTextinput
                  label="Confirm Password"
                  icon="lock"
                  placeholder="* * * * * * * * * * * * * *"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MsgBox type={messageType}>{message}</MsgBox>
               

                {!isSubmitting && (
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>Sign Up</ButtonText>
                  </StyledButton>
                )}

                {isSubmitting && (
                  <StyledButton disabled={true}>
                    <ActivityIndicator size="large" color={primary} />
                  </StyledButton>
                )}


                <Line />

                <ExtraView>
                  <ExtraText>Already have an account? </ExtraText>
                  <TextLink onPress={() => navigation.navigate('Login')}>
                    <TextLinkContent>Login</TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

const MyTextinput = ({ label, icon, isPassword, hidePassword, setHidePassword, isDate, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel> {label} </StyledInputLabel>

      {!isDate && <StyledTextInput {...props} />}

      {isDate && (
        <TouchableOpacity onPress={showDatePicker}>
          <StyledTextInput {...props} />
        </TouchableOpacity>
      )}

      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
        </RightIcon>
      )}
    </View>
  );
};
export default SignUp;
