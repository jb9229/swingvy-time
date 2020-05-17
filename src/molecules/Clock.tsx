import * as React from 'react';

import styled from 'styled-components/native';

const Container = styled.View`
  width: 200px;
  height: 200px;
  border-width: 3px;
  border-color: gray;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
`;
const InnerCircle = styled.View`
  width: 180px;
  height: 180px;
  border-width: 1px;
  border-color: gray;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
`;
const Time = styled.Text`
  font-size: 48px;
  line-height: 88px;
`;
const AmPm = styled.Text`
  font-size: 28px;
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