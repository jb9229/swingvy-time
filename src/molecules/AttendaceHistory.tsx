import * as React from 'react';

import { Attendance } from '../Home/types';
import styled from 'styled-components/native';

const Container = styled.View``;
const Date = styled.Text``;
const Address = styled.Text``;

interface Props {
  attendance: Attendance;
}
const AttendanceHistory: React.FC<Props> = (props) => {
 return (
  <Container>
    <Address>{props.attendance.address}</Address>
  </Container>
 ) 
}

export default AttendanceHistory;
