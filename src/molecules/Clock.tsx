import * as React from 'react';

import styled from 'styled-components/native';

const Container = styled.View`
  width: 200;
  height: 200;
  border-width: 3;
  border-color: gray;
  border-radius: 100;
  justify-content: center;
  align-items: center;
`;
const InnerCircle = styled.View`
  width: 180;
  height: 180;
  border-width: 1;
  border-color: gray;
  border-radius: 100;
  justify-content: center;
  align-items: center;
`;
const Time = styled.Text`
  font-size: 48;
  line-height: 88;
`;
const AmPm = styled.Text`
  font-size: 28;
`;
const Clock: React.FC = () => {
  const [date, setDate] = React.useState<Date>(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Container>
      <InnerCircle>
        <Time>{`${addZero(date.getHours())} : ${addZero(date.getMinutes())}`}</Time>
        <AmPm>{formatAMPM(date)}</AmPm>
      </InnerCircle>
    </Container>
  )
}

/**
 * get 'PM' or 'AM' string
 * @param date Time
 */
const formatAMPM = (date: Date) => {
  var hours = date.getHours();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  return ampm;
}

const addZero = (value: number): string => {
  if (value < 10) {
    return "0" + value;
  }
  return '' + value;

}

export default Clock;