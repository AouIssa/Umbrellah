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


const Welcome = ({navigation, route}) => {

  const {uname, email} = route.params;

  return (
    <>
      <StatusBar style="light" />
      <InnerContainer>
        <WelcomeImage resizeMode="cover" source={require('./../assets/home.jpg')} />
        <WelcomeContainer>
          <PageTitle welcome={true}>Welcome!</PageTitle>
          <SubTitle welcome={true}>{uname || "John Smith"}</SubTitle>
          <SubTitle welcome={true}>{email || "johnSmith@gmail.com"}</SubTitle>

          <StyledFormArea>
            <Avatar resizeMode="cover" source={require('./../assets/Logo.png')} />

            <Line />
            <StyledButton onPress={() => {navigation.navigate('Login')}}>
              <ButtonText>Logout</ButtonText>
            </StyledButton>

            <StyledButton onPress={() => {navigation.navigate('Explore')}}>
              <ButtonText>Map</ButtonText>
            </StyledButton>
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};


export default Welcome;
