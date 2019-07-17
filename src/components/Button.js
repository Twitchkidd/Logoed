import React from "react";
import styled from "styled-components/native";
import { View, Text, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { P } from "../components";
import { blue, mediumGray } from "../utilities";

const ButtonWrapper = styled.TouchableOpacity`
  width: ${props => (props.wide ? "90%" : "35%")};
  height: "10%";
  border-radius: ${props => (props.wide ? "8px" : "50%")};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Button = ({ title, onPress }) => {
  return (
    <ButtonWrapper onPress={onPress}>
      <LinearGradient colors={[blue, mediumGray]}>
        <P light>{title}</P>
      </LinearGradient>
    </ButtonWrapper>
  );
};
