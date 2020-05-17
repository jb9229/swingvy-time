import * as React from 'react';

import styled from 'styled-components/native';

const ButtonTO = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  border-width: 1;
  height: 30;
  border-color: gray;
  border-radius: 30;
  min-width: 77;
`;
const ButtonText = styled.Text`
  color: gray;
`;

interface Props {
  onClick: () => void;
  text: string;
  disabled?: boolean;
}
const Button: React.FC<Props> = (props) => {
  return (
    <ButtonTO onPress={props.onClick} disabled={props.disabled}>
      <ButtonText>{props.text}</ButtonText>
    </ButtonTO>
  );
};

export default Button;
