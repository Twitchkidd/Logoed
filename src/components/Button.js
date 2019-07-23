import React from "react";
import styled from "styled-components/native";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { P } from "./Type";
import { blue, mediumGray } from "../utilities";

//width: ${props => (props.wide ? "90%" : "35%")};
//height: ${Dimensions.get("window").height / 10};
// border-radius: ${props =>
// props.wide ? 8 : Dimensions.get("window").height / 10};
const StyledLinearGradient = styled(LinearGradient)`
  width: 350;
  height: 42;
  margin-left: 20;
  margin-right: 20;
  margin-top: 20;
  margin-bottom: 20;
  flex: 0.3;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const Button = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <StyledLinearGradient colors={[blue, mediumGray]}>
        <P light>{title}</P>
      </StyledLinearGradient>
    </TouchableOpacity>
  );
};
