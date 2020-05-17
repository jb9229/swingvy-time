import * as React from 'react';

import styled from 'styled-components/native';

interface StyleProps {
  disabled?: boolean;
}
const ButtonTO = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0px 12px;
  border-width: 1px;
  height: 30px;
  border-color: ${(props: StyleProps): string => props.disabled ? 'gray' : 'black'};
  border-radius: 30px;
  min-width: 77px;
`;
const ButtonText = styled.Text`
  color: ${(props: StyleProps): string => props.disabled ? 'gray' : 'black'};
`;

interface Props {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
}
const Button: React.FC<Props> = (props) => {
  return (
    <ButtonTO onPress={props.onClick} disabled={props.disabled}>
      <ButtonText disabled={props.disabled}>{props.text}</ButtonText>
    </ButtonTO>
  );
};

export default Button;
