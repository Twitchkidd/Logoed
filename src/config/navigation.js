import React, { useState, useEffect, useContext } from 'react';
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
  Sharing,
  SignInPrompt,
  ToS,
} from '../screens';

/*auth0.webAuth
    .clearSession({})
    .then(success => {
        Alert.alert(
            'Logged out!'
        );
        this.setState({ accessToken: null });
    })
    .catch(error => {
        console.log('Log out cancelled');
    });
*/

/*
auth0
  .users('the user access_token')
  .patchUser({id: 'user_id', metadata: {first_name: 'John', last_name: 'Doe'}})
  .then(console.log)
  .catch(console.error);
*/

const ProfileCreationStack = createStackNavigator();
const ProfileCreationStackScreen = () => (
  <ProfileCreationStack.Navigator headerMode="none">
    <ProfileCreationStack.Screen
      name="ProfileCreation"
      component={ProfileCreation}
    />
  </ProfileCreationStack.Navigator>
);

const LogoingStack = createStackNavigator();
const LogoingStackScreen = () => (
  <LogoingStack.Navigator>
    <LogoingStack.Screen
      name="BusinessSelection"
      component={BusinessSelection}
    />
    <LogoingStack.Screen name="FindBusiness" component={FindBusiness} />
    <LogoingStack.Screen name="BusinessInfo" component={BusinessInfo} />
    <LogoingStack.Screen name="Logoing" component={Logoing} />
    <LogoingStack.Screen name="Sharing" component={Sharing} />
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
  const auth0 = new Auth0({
    domain: 'twitchkidd.auth0.com',
    clientId: 'DUO3kbgsYfJihwAwpeQ3L5KeVngowCqc',
  });
  useEffect(() => {
    // while Loading is displayed,
    // if there is an accessToken in AsyncStorage, try for user data,
    // if there is user data, set it and see if there's an IG handle,
    // if there isn't an IG handle, display ProfileCreation,
    //   ProfileCreation will run checkProfile() until it succeeds, in which case set IG handle on the user and display BusinessSelection
    // if there is an IG handle and we've come from a recent accessToken, display Home, (I nixed this)
    // if there was an accessToken, but it has expired, display an alert that you've been signed out and then run the auth0 sign in/up function,
    // if the auth0 sign in/up function fails, display SignInPrompt (withError) (with contact info for if it really doesn't work)
    // if the auth0 sign in/up function succeeds, set user data and check if there's an IG handle,
    // if there isn't an IG handle, display ProfileCreation,
    //   ProfileCreation will run checkProfile() until it succeeds, in which case set IG handle on the user and display BusinessSelection
    // if there is an IG handle and we've come from a new instance of sign in/up, that we know of, display BusinessSelection
    const checkForStoredAccessToken = async () => {
      try {
        const storedAccessToken = await AsyncStorage.getItem('accessToken');
        if (storedAccessToken !== null) {
          tryAccessToken(storedAccessToken);
        } else {
          tryAuth();
        }
      } catch (asyncStorageError) {
        console.error(asyncStorageError);
        tryAuth();
      }
    };
    const tryAccessToken = async storedAccessToken => {
      try {
        const user = await auth0.auth.userInfo({ token: storedAccessToken });
        console.log(user);
        setUser(user);
        setIsLoading(false);
      } catch (reauthenticationError) {
        console.error(reauthenticationError);
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
          console.error(asyncStorageError);
        }
        getUserData(accessToken);
      } catch (authError) {
        console.error(authError);
      }
    };
    const getUserData = async accessToken => {
      try {
        const user = await auth0.auth.userInfo({ token: accessToken });
        console.log(user);
        setUser(user);
        setIsLoading(false);
      } catch (userInfoError) {
        console.error(userInfoError);
      }
    };
    checkForStoredAccessToken();
  }, []);
  return (
    <RootStack.Navigator
      headerMode="none"
      screenOptions={{ animationEnabled: false }}
      mode="modal">
      {isLoading ? (
        <RootStack.Screen name="Loading" component={Loading} />
      ) : user.instagramHandle ? (
        <RootStack.Screen name="LogoingStack" component={LogoingStackScreen} />
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
  );
};

export default () => {
  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  );
};
