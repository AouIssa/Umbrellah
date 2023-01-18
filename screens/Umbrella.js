import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

// import all the components we are going to use
import { SafeAreaView, StyleSheet, Text, View, TouchableHighlight } from 'react-native';

import {
  StyledContainer,
  InnerContainer,
  StyledButtonLogout,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButtonUmbrella,
  ButtonText,
  Line,
  UmbrellaContainer,
  WelcomeImage,
  Avatar,
} from './../components/style';

//importing library to use Stopwatch and Timer
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
import { withTheme } from 'styled-components';

const Umbrella = ({ navigation, route }) => {
  const [isTimerStart, setIsTimerStart] = useState(false);
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [timerDuration, setTimerDuration] = useState(90000);
  const [resetTimer, setResetTimer] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);


  const handleButton = () => {
    setIsStopwatchStart(false);
    setResetStopwatch(true);
  };
  let y = 0.0;
  let fees = 0.0;
  

  const handleFees = () => {
    6
  }
  return (
    <>
      <InnerContainer>
        <WelcomeImage resizeMode="cover" source={require('./../assets/bookedUmbrella.png')} />
        <PageTitle >{handleFees}</PageTitle>

        <UmbrellaContainer>
          <View style={styles.sectionStyle}>
            <Stopwatch
              laps
              msecs
              start={isStopwatchStart}
              //To start
              reset={resetStopwatch}
              //To reset
              options={options}
              //options for the styling
              getMsecs={(time) => {
                console.log(time);
                y++;
               
                
                
                if (y == 100) {
                  console.log("TOOOOOOOOOOOOOOOOOOOOOO")
                  fees++
                  y=0
                }
                if (fees == 3){
                  console.log("You did it!!")
                  handleFees
                  
                }
                
              }}
            />
           
            <TouchableHighlight
              onPress={() => {
              setIsStopwatchStart(false);
              setResetStopwatch(true);
              }}
            >
              <Text style={styles.buttonText}>{!isStopwatchStart ? 'START' : 'STOP'}</Text>
            </TouchableHighlight>
            <StyledButtonUmbrella
              onPress={() => {
                setIsStopwatchStart(!isStopwatchStart);
                setResetStopwatch(false);
              }}
            >
              <Text style={styles.buttonText}>Confirm and Pay</Text>
            </StyledButtonUmbrella>
          </View>
        </UmbrellaContainer>
      </InnerContainer>
    </>
  );
};

export default Umbrella;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  sectionStyle: {
    flex: 1,
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
});

const options = {
  container: {
    backgroundColor: '#FF0000',
    padding: 5,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    color: '#FFF',
    marginLeft: 7,
  },
};
