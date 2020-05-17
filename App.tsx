import * as React from 'react';

import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './src/providers/ThemeProvider';
import { createStackNavigator } from '@react-navigation/stack';
import useCachedResources from './hooks/useCachedResources';

const Stack = createStackNavigator();

function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        <ThemeProvider>
          <NavigationContainer linking={LinkingConfiguration}>
            <Stack.Navigator>
              <Stack.Screen name="Root" component={BottomTabNavigator} />
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});


const STORYBOOK_START = true;
export default (STORYBOOK_START
  ? require('./storybook').default
  : App);