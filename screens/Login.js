import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { StyledContainer, InnerContainer, PageLogo, PageTitle } from './../components/style';

const Login = () => {
  return (
    <StyledContainer>
      <StatusBar style="dark" />

      <InnerContainer>
        <PageLogo resizeMode="cover" source={require('./../assets/Logo.png')} />
        <PageTitle>Umbrellah</PageTitle>
      </InnerContainer>
    </StyledContainer>
  );
};

export default Login;
