import react from 'react';

// Keyboard avoiding view
import { KeyboardAvoidingView, 
  ScrollView, TouchableWithoutFeedback,
   Keyboard,Platform } from 'react-native';
const KeyboardAvoidingWrapper = ({children}) => {
  return (
    <KeyboardAvoidingView 
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={{ flex: 1 }}>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {children}
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingWrapper;
