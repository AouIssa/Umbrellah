import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import {
  StyledContainer,
  InnerContainer,
  StyledButtonLogout,
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

            <Line />
            <StyledButton onPress={() => {navigation.navigate('HomeScreen')}}>
              <ButtonText>Book An Umbrella</ButtonText>
            </StyledButton>

            <StyledButton onPress={() => {navigation.navigate('Explore')}}>
              <ButtonText>Find An Umbrella</ButtonText>
            </StyledButton>

            <StyledButton onPress={() => {navigation.navigate('Explore')}}>
              <ButtonText>Top Up</ButtonText>
            </StyledButton>

            <StyledButtonLogout onPress={() => {navigation.navigate('Login')}}>
              <ButtonText>Logout</ButtonText>
            </StyledButtonLogout>

            
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};


export default Welcome;
