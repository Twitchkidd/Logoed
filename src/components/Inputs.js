import React from 'react';
import { TextInput } from 'react-native';
import styled from 'styled-components/native';
import { blue, eigengrau } from '../utils';

export const TextEntry = styled.TextInput`
  border-color: ${blue};
  border-width: 2px;
  border-radius: 4px;
  height: 42px;
  width: 300px;
  margin: 12px;
  padding: 4px 12px;
  color: ${eigengrau};
`;
