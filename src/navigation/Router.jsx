import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import TodoScreen from '../screens/TodoScreen';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}
        initialRouteName='Onboarding'>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='Onboarding' component={OnboardingScreen} />
            <Stack.Screen  name='Todo' component={TodoScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Router
