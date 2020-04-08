import React, { useState, useEffect } from 'react';
import { ProfileCreationContext } from '../contexts';
import AsyncStorage from '@react-native-community/async-storage';
import Auth0 from 'react-native-auth0';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  BusinessInfo,
  BusinessSelection,
  CodeScanner,
  CopyCaption,
  Feedback,
  FindBusiness,
  Home,
  Loading,
  Logoing,
  Modal,
  Profile,
  ProfileCreation,
  Rewards,
  Settings,
  ShareIt,
  SignInPrompt,
  ToS,
} from '../screens';
import { mostlyWhite, darkOrange } from '../utils';

const ProfileCreationStack = createStackNavigator();
const ProfileCreationStackScreen = () => (
  <ProfileCreationStack.Navigator>
    <ProfileCreationStack.Screen
      name="ProfileCreation"
      component={ProfileCreation}
      options={{
        headerStyle: { backgroundColor: darkOrange },
        title: 'Profile Creation',
        headerTitleStyle: { color: mostlyWhite, fontSize: 20 },
      }}
    />
  </ProfileCreationStack.Navigator>
);

const LogoingStack = createStackNavigator();
const LogoingStackScreen = () => (
  <LogoingStack.Navigator>
    <LogoingStack.Screen
      name="BusinessSelection"
      component={BusinessSelection}
      options={{
        headerStyle: { backgroundColor: darkOrange },
        title: 'Logoed',
        headerTitleStyle: { color: mostlyWhite },
      }}
    />
    <LogoingStack.Screen
      name="CodeScanner"
      component={CodeScanner}
      options={{ header: () => null }}
    />
    <LogoingStack.Screen
      name="FindBusiness"
      component={FindBusiness}
      options={{
        headerStyle: { backgroundColor: darkOrange },
        title: 'Logoed',
        headerTitleStyle: { color: mostlyWhite },
      }}
    />
    <LogoingStack.Screen
      name="BusinessInfo"
      component={BusinessInfo}
      options={{
        headerStyle: { backgroundColor: darkOrange },
        title: 'Logoed',
        headerTitleStyle: { color: mostlyWhite },
      }}
    />
    <LogoingStack.Screen
      name="Logoing"
      component={Logoing}
      options={{ header: () => null }}
    />
    <LogoingStack.Screen
      name="CopyCaption"
      component={CopyCaption}
      options={{
        headerStyle: { backgroundColor: darkOrange },
        title: 'Logoed',
        headerTitleStyle: { color: mostlyWhite },
      }}
    />
    <LogoingStack.Screen
      name="ShareIt"
      component={ShareIt}
      options={{
        headerStyle: { backgroundColor: darkOrange },
        title: 'Logoed',
        headerTitleStyle: { color: mostlyWhite },
      }}
    />
  </LogoingStack.Navigator>
);

const AppDrawer = createDrawerNavigator();
const AppDrawerScreen = () => (
  <AppDrawer.Navigator drawerType="slide">
    <AppDrawer.Screen name="Home" component={Home} />
    <AppDrawer.Screen name="Rewards" component={Rewards} />
    <AppDrawer.Screen name="Profile" component={Profile} />
    <AppDrawer.Screen name="Feedback" component={Feedback} />
    <AppDrawer.Screen name="Settings" component={Settings} />
    <AppDrawer.Screen name="ToS" component={ToS} />
  </AppDrawer.Navigator>
);

const RootStack = createStackNavigator();
const RootStackScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const instagramHandle = useState(null);
  const auth0 = new Auth0({
    domain: 'twitchkidd.auth0.com',
    clientId: 'DUO3kbgsYfJihwAwpeQ3L5KeVngowCqc',
  });
  useEffect(() => {
    const checkForStoredAccessToken = async () => {
      setTimeout(async () => {
        try {
          // await AsyncStorage.removeItem('accessToken');
          const storedAccessToken = await AsyncStorage.getItem('accessToken');
          if (storedAccessToken !== null) {
            tryAccessToken(storedAccessToken);
          } else {
            tryAuth();
          }
        } catch (asyncStorageError) {
          console.log(asyncStorageError);
          tryAuth();
        }
      }, 2000);
    };
    const tryAccessToken = async storedAccessToken => {
      try {
        const user = await auth0.auth.userInfo({ token: storedAccessToken });
        if (user !== null) {
          setUser(user);
          setIsLoading(false);
        } else {
          tryAuth();
        }
      } catch (reauthenticationError) {
        console.log('reauthenticationError');
        console.log(reauthenticationError);
        tryAuth();
      }
    };
    const tryAuth = async () => {
      try {
        const { accessToken } = await auth0.webAuth.authorize({
          scope: 'openid profile email',
        });
        try {
          await AsyncStorage.setItem('accessToken', accessToken);
        } catch (asyncStorageError) {
          console.log(asyncStorageError);
        }
        try {
          const user = await auth0.auth.userInfo({ token: accessToken });
          if (user !== null) {
            setUser(user);
            setIsLoading(false);
          } else {
            tryAuth();
          }
        } catch (authenticationError) {
          console.log('authenticationError');
          console.log(authenticationError);
        }
      } catch (authError) {
        console.log(authError);
        tryAuth();
      }
    };
    checkForStoredAccessToken();
  }, []);
  useEffect(() => {
    instagramHandle[1](instagramHandle[0]);
  }, [instagramHandle[0]]);
  return (
    <ProfileCreationContext.Provider value={instagramHandle}>
      <RootStack.Navigator
        headerMode="none"
        screenOptions={{ animationEnabled: false }}
        mode="modal">
        {isLoading ? (
          <RootStack.Screen name="Loading" component={Loading} />
        ) : instagramHandle[0] ? (
          <RootStack.Screen
            name="LogoingStack"
            component={LogoingStackScreen}
          />
        ) : (
          <RootStack.Screen
            name="ProfileCreationStack"
            component={ProfileCreationStackScreen}
          />
        )}
        <RootStack.Screen name="AppDrawer" component={AppDrawerScreen} />
        <RootStack.Screen
          name="Modal"
          component={Modal}
          options={{
            animationEnabled: true,
          }}
        />
        <RootStack.Screen
          name="Alert"
          component={Modal}
          options={{
            animationEnabled: true,
            cardStyle: { backgroundColor: 'rgba(0, 0, 0, 0.15)' },
            cardOverLayEnabled: true,
            cardStyleInterpolator: ({ current: { progress } }) => {
              return {
                cardStyle: {
                  opacity: progress.interpolate({
                    inputRange: [0, 0.5, 0.9, 1],
                    outputRange: [0, 0.25, 0.7, 1],
                  }),
                },
                overlayStyle: {
                  opacity: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 0.5],
                    extrapolate: 'clamp',
                  }),
                },
              };
            },
          }}
        />
      </RootStack.Navigator>
    </ProfileCreationContext.Provider>
  );
};

export default () => {
  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  );
};
