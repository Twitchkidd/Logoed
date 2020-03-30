import React, { useState, useEffect } from 'react';
import {
  Button,
  FlatList,
  KeyboardAvoidingView,
  Text,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import { CenteringView, TextInput } from '../components';
import { restaurants } from '../data';

const ItemView = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
`;

const Business = ({ name }) => (
  <ItemView>
    <Text>{name}</Text>
  </ItemView>
);

export const BusinessSelection = ({ navigation }) => {
  const [businessSearch, setBusinessSearch] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
  useEffect(() => {
    setFilteredRestaurants(
      restaurants.filter(restaurant =>
        restaurant.name.includes(businessSearch),
      ),
    );
  }, [businessSearch]);
  businessSelect = business => {
    console.log(business);
    navigation.push('Logoing', { business: business });
  };
  return (
    <CenteringView>
      <Text>Where are you using Logoed from?</Text>
      <Text>
        Choose from the list or hit the button to scan a provided QR code.
      </Text>
      <KeyboardAvoidingView>
        <View style={{ height: 400 }}>
          <TextInput
            onChangeText={text => setBusinessSearch(text)}
            autoCorrect={false}
          />
          <Button
            onPress={() => businessSelect(businessSearch)}
            title="Submit"
          />
          <FlatList
            data={filteredRestaurants}
            renderItem={({ item }) => <Business name={item.name} />}
            keyExtractor={item => item.name}
          />
        </View>
      </KeyboardAvoidingView>
      <Button
        onPress={() => navigation.push('CodeScanner')}
        title="Scan QR Code!"
      />
    </CenteringView>
  );
};
