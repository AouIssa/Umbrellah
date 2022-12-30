import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

// formik
import { Formik } from 'formik';

//icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

//keyboard avoid view
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

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
import { View, TouchableOpacity } from 'react-native';

//colors
const { brand, darkLight, primary } = Colors;


const SignUp = ({navigation}) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [show, setShow] = useState(false);
  


  return (
    <KeyboardAvoidingWrapper>
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        <PageTitle>Umbrellah</PageTitle>
        <SubTitle>Account Sign Up</SubTitle>

  

        <Formik
          initialValues={{ fullName: '', email: '', password: '', confrimPassword: '' }}
          onSubmit={(values) => {
            console.log('values');
            navigation.navigate('Welcome');

          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <StyledFormArea>
              <MyTextinput
                label="Full Name"
                icon="person"
                placeholder="John Smith"
                placeholderTextColor={darkLight}
                onChangeText={handleChange('fullName')}
                onBlur={handleBlur('fullName')}
                value={values.fullName}
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
              <MsgBox>...</MsgBox>
              <StyledButton onPress={handleSubmit}>
                <ButtonText>Sign Up</ButtonText>
              </StyledButton>
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
