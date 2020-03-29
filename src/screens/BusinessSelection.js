import React from 'react';
import { Button, Dimensions, FlatList, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { CenteringView, TextInput } from '../components';
import { restaurants } from '../data';

const { width, height } = Dimensions.get('window');
console.log(width);
console.log(height);

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
  return (
    <CenteringView>
      <Text>Where are you Logoing from?</Text>
      <Text>
        Choose from the list or hit the button to scan a provided QR code.
      </Text>
      <TextInput></TextInput>
      <View style={{ height: 400 }}>
        <FlatList
          data={restaurants}
          renderItem={({ item }) => <Business name={item.name} />}
          keyExtractor={item => item.name}
        />
      </View>
      <Button
        onPress={() => navigation.push('CodeScanner')}
        title="Scan QR Code!"
      />
    </CenteringView>
  );
};
