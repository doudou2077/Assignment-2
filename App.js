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

// Creating navigators
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack navigator for Activities
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

// Stack navigator for Diet
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

// Main App component
export default function App() {
  return (
    <SafeAreaProvider> {/* Providing safe area context */}
      <ThemeProvider> {/* Providing theme context */}
        <CombinedProvider> {/* Providing combined context for diet and activity entries */}
          <NavigationContainer>  {/* Wrapping the app in a navigation container */}
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

                  // Determine the icon based on the route name
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
              {/* Defining the tab screens */}
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