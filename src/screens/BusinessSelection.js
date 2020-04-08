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
import { lightGray } from '../utils';

const ItemView = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
`;

const Business = ({ handlePress, name }) => (
  <ItemView containerStyle={{ borderBottomWidth: 0 }}>
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
  const renderSeperator = () => (
    <View
      style={{
        height: 1,
        width: '100%',
        backgroundColor: lightGray,
      }}
    />
  );
  return (
    <CenteringView>
      <Text style={{ fontSize: 20, margin: 16 }}>
        Where are you using Logoed from?
      </Text>
      <View style={{ width: 260, margin: 12 }}>
        <Text style={{ textAlign: 'center' }}>
          Choose from the list below or hit the button and auto-select by
          scanning the QR code!
        </Text>
      </View>
      <KeyboardAvoidingView
        containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <View style={{ height: 400 }}>
          <TextInput
            onChangeText={text => {
              setBusinessSearch(text);
              handleSearchChange(text);
            }}
            value={businessSearch}
            autoCorrect={false}
            style={{ width: 260 }}
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
            ItemSeparatorComponent={renderSeperator}
            style={{
              borderColor: lightGray,
              borderWidth: 4,
              borderRadius: 8,
              marginTop: 8,
              marginBottom: 16,
            }}
          />
        </View>
      </KeyboardAvoidingView>
      <View style={{ margin: 8 }} />
      <Button
        onPress={() => navigation.push('CodeScanner')}
        title="Scan QR Code!"
      />
    </CenteringView>
  );
};
