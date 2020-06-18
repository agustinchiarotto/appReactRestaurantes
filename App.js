import React from 'react';
import { YellowBox} from 'react-native'
import { StyleSheet, Text, View } from 'react-native';
import { firebaseApp } from "./app/utils/firebase";
import  Navigation  from "./app/navigations/Navigation";

YellowBox.ignoreWarnings(['Setting a timer'])


export default function App() {
  

  return (
    <Navigation></Navigation>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
