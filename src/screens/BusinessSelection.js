import React, { useState, useEffect } from 'react';
import {
  Button,
  FlatList,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
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

const Business = ({ handlePress, name }) => (
  <ItemView>
    <TouchableOpacity onPress={() => handlePress(name)}>
      <Text>{name}</Text>
    </TouchableOpacity>
  </ItemView>
);

export const BusinessSelection = ({ navigation }) => {
  const [businessSearch, setBusinessSearch] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
  const handleSearchChange = text => {
    setFilteredRestaurants(
      restaurants.filter(restaurant => restaurant.name.includes(text)),
    );
  };
  const businessSelect = business => {
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
            onChangeText={text => {
              setBusinessSearch(text);
              handleSearchChange(text);
            }}
            value={businessSearch}
            autoCorrect={false}
          />
          <Button
            onPress={() => businessSelect(businessSearch)}
            title="Submit"
          />
          <FlatList
            data={filteredRestaurants}
            renderItem={({ item }) => (
              <Business
                name={item.name}
                handlePress={name => setBusinessSearch(name)}
              />
            )}
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
