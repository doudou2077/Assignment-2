import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ActivitiesScreen from './screens/ActivitiesScreen';
import DietScreen from './screens/DietScreen';
import SettingsScreen from './screens/SettingsScreen';
import AddActivityScreen from './screens/AddActivityScreen';
import AddDietScreen from './screens/AddDietScreen';
import { CombinedProvider } from './context/CombinedContext';
import { ThemeProvider } from './context/ThemeContext';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';

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
      <ThemeProvider>
        <CombinedProvider>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarStyle: {
                  backgroundColor: '#4A55A2',
                },
                tabBarActiveTintColor: '#FFF59D',
                tabBarInactiveTintColor: 'white',
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                  let iconName;
                  let IconComponent = Ionicons;

                  if (route.name === 'Activities') {
                    IconComponent = FontAwesome5;
                    iconName = 'running';
                  } else if (route.name === 'Diet') {
                    iconName = 'fast-food';
                  } else if (route.name === 'Settings') {
                    iconName = 'settings';
                  }

                  // Use the focused state to adjust the icon's appearance
                  return <IconComponent name={iconName} size={size} color={color} />;
                },
              })}
            >
              <Tab.Screen name="Activities" component={ActivitiesStack} options={{ tabBarLabel: 'Activities' }} />
              <Tab.Screen name="Diet" component={DietStack} options={{ tabBarLabel: 'Diet' }} />
              <Tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarLabel: 'Settings' }} />
            </Tab.Navigator>
          </NavigationContainer>
        </CombinedProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}