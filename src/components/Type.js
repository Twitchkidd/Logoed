import styled from "styled-components";
import { Text } from "react-native";
import { serif, sans, mostlyWhite, eigengrau } from "../utilities";

export const H1 = styled.Text`
  ${serif}
  color: ${props => (props.light ? mostlyWhite : eigengrau)};
  font-size: 28;
  line-height: 18;
`;

export const H2 = styled.Text`
  ${serif}
  color: ${props => (props.light ? mostlyWhite : eigengrau)};
  font-size: 24;
`;
//line-height: 16;

export const H3 = styled.Text`
  ${serif}
  color: ${props => (props.light ? mostlyWhite : eigengrau)};
  font-size: 20;
  line-height: 16;
`;

export const H4 = styled.Text`
  ${serif}
  color: ${props => (props.light ? mostlyWhite : eigengrau)};
  font-size: 16;
  line-height: 15;
`;

export const P = styled.Text`
  ${sans}
  color: ${props => (props.light ? mostlyWhite : eigengrau)};
  font-size: 14;
  text-align: center;
`;
//line-height: 18;
