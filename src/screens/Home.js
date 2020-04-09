import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Image,
  Dimensions,
  View,
} from 'react-native';
import { CenteringView } from '../components';
import Icon from 'react-native-vector-icons/Ionicons';
import { maroon, eigengrau } from '../utils';

export const Home = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const { width, height } = Dimensions.get('window');
  const { viewShot } = route.params;
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);
  return (
    <CenteringView>
      {loading ? (
        <ActivityIndicator size="large" color={maroon} animating={true} />
      ) : (
        <>
          <Image
            source={{ uri: viewShot }}
            style={{ width: width / 3, height: height / 3 }}
          />
          <Text
            style={{
              fontSize: 20,
              padding: 28,
              textAlign: 'center',
              color: eigengrau,
            }}>
            Thanks for sharing with Logoed! Check 'Rewards' in the menu to see
            the status of the raffle!
          </Text>
        </>
      )}
      <View style={{ position: 'absolute', top: 60, left: 20 }}>
        <TouchableOpacity onPress={navigation.toggleDrawer}>
          <Icon name="ios-menu" size={41} color={eigengrau} />
        </TouchableOpacity>
      </View>
    </CenteringView>
  );
};
