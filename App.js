import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ActivitiesScreen from './screens/ActivitiesScreen';
import DietScreen from './screens/DietScreen';
import SettingsScreen from './screens/SettingsScreen';
import AddActivityScreen from './screens/AddActivityScreen';
import AddDietScreen from './screens/AddDietScreen';
import { ActivityProvider } from './context/ActivityContext';
import { DietProvider } from './context/DietContext';
import { ThemeProvider } from './context/ThemeContext';
import { SafeAreaProvider } from 'react-native-safe-area-context'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ActivitiesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ActivitiesHome"
        component={ActivitiesScreen}
        options={{
          headerStyle: {
            backgroundColor: '#4A55A2',
          }
        }}
      />
      <Stack.Screen
        name="AddActivity"
        component={AddActivityScreen}
        options={{ title: 'Add An Activity' }}
      />
    </Stack.Navigator>
  );
}

function DietStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="DietHome"
        component={DietScreen}
        options={{ title: 'Diet' }}
      />
      <Stack.Screen
        name="AddDiet"
        component={AddDietScreen}
        options={{ title: 'Add A Diet Entry' }}
      />
    </ Stack.Navigator>
  );
}


export default function App() {
  return (
    <SafeAreaProvider>
      <ActivityProvider>
        <DietProvider>
          <ThemeProvider>
            <NavigationContainer>
              <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen name="Activities" component={ActivitiesStack} options={{ tabBarLabel: 'Activities' }} />
                <Tab.Screen name="Diet" component={DietStack} options={{ tabBarLabel: 'Diet' }} />
                <Tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarLabel: 'Settings' }} />
              </Tab.Navigator>
            </NavigationContainer>
          </ThemeProvider>
        </DietProvider>
      </ActivityProvider>
    </SafeAreaProvider>
  );
}
