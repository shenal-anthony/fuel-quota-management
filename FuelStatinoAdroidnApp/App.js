import * as React from 'react';
import { enableScreens } from 'react-native-screens';
enableScreens();
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ScanQRScreen from './screens/ScanQRScreen';
import PumpScreen from './screens/PumpScreen';

const Stack = createNativeStackNavigator();

export default function App() {  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#34495e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          contentStyle: {
            backgroundColor: '#f2f3f5',
          },
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ title: "Fuel Station App" }}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen 
          name="ScanQRScreen" 
          component={ScanQRScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen name="Pump" component={PumpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
