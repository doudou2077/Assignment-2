import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ActivitiesScreen from './screens/ActivitiesScreen';
import DietScreen from './screens/DietScreen';
import SettingsScreen from './screens/SettingsScreen';
import AddActivityScreen from './screens/AddActivityScreen';
import AddDietScreen from './screens/AddDietScreen';
import { ActivityProvider } from './context/ActivityContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ActivitiesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ActivitiesHome"
        component={ActivitiesScreen}
        options={{ title: 'Activities' }}
      />
      <Stack.Screen
        name="AddActivity"
        component={AddActivityScreen}
        options={{ title: 'Add Activity' }}
      />
    </Stack.Navigator>
  );
}

function DietStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DietHome"
        component={DietScreen}
        options={{ title: 'Diet' }}
      />
      <Stack.Screen
        name="AddDiet"
        component={AddDietScreen}
        options={{ title: 'Add Diet Entry' }}
      />
    </Stack.Navigator>
  );
}


export default function App() {
  return (
    <ActivityProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="Activities" component={ActivitiesStack} options={{ tabBarLabel: 'Activities' }} />
          <Tab.Screen name="Diet" component={DietStack} options={{ tabBarLabel: 'Diet' }} />
          <Tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarLabel: 'Settings' }} />
        </Tab.Navigator>
      </NavigationContainer>
    </ActivityProvider>
  );
}
