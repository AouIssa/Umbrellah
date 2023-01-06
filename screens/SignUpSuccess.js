import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import {
  StyledContainer,
  InnerContainer,
 
  PageTitle,
  SubTitle,
  StyledFormArea,

  StyledButton,
  ButtonText,
 
  Line,

  WelcomeContainer,
  WelcomeImage,
  Avatar,
} from './../components/style';


const SignUpSuccess = ({navigation}) => {

  return (
    <>
      <StatusBar style="light" />
      <InnerContainer>
        <WelcomeImage resizeMode="cover" source={require('./../assets/home.jpg')} />
        <WelcomeContainer>
          <PageTitle welcome={true}>Sign Up succsefull!</PageTitle>
          <SubTitle welcome={true}>Please procced to login</SubTitle>

          <StyledFormArea>
            <Avatar resizeMode="cover" source={require('./../assets/Logo.png')} />

            <Line />
            <StyledButton onPress={() => {navigation.navigate('Login')}}>
              <ButtonText>Login</ButtonText>
            </StyledButton>

        
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};


export default SignUpSuccess;
