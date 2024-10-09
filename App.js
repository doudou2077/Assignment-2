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

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ActivitiesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Activities" component={ActivitiesScreen} />
      <Stack.Screen name="AddActivity" component={AddActivityScreen} />
    </Stack.Navigator>
  );
}

function DietStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Diet" component={DietScreen} />
      <Stack.Screen name="AddDiet" component={AddDietScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />  {/* Add StatusBar globally */}
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Activities" component={ActivitiesStack} />
          <Tab.Screen name="Diet" component={DietStack} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
