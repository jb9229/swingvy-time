import * as React from 'react';

import AttendanceHistory from '../molecules/AttendaceHistory';
import Button from '../molecules/Button';
import Clock from '../molecules/Clock';
import ClockInOutPanel from '../organisms/ClockInOutPanel';
import { ScrollView } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { useHomeContext } from '../contexts/HomeContext';
import { useThemeContext } from '../contexts/ThemeContext';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const ScrollWrap = styled(ScrollView).attrs(() => ({
  contentContainerStyle: {
    paddingTop: 30
  }
}))`
  flex: 1;
  background-color: #fff;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  padding-left: 20px;
  padding-right: 20px;
`;
const ClockWrap = styled.View`
  align-items: center;
`;

const ClockInOutPanelWrap = styled.View`
  margin-top: 50px;
`;
const AttendanceList = styled.View``;

const HomeLayout = () => {
  const {language, changeLanguageType} = useThemeContext();
  const {
    gps, enabledGPS, distanceFormOffice, validDistanceFromOffice, attendanceList,
    onClickClockIn, onClickClockOut
  } = useHomeContext();
  return (
    <Container>
      <ScrollWrap>
        <Header>
          <Button text={language === 'kr' ? 'KR' : 'EN'} onClick={() => {changeLanguageType(language === 'kr' ? 'en' : 'kr' )}} />
        </Header>
        <ClockWrap>
          <Clock />
        </ClockWrap>
        <ClockInOutPanelWrap>
          <ClockInOutPanel
            gps={gps} enabledGPS={enabledGPS}
            distanceFormOffice={distanceFormOffice} validDistanceFromOffice={validDistanceFromOffice}
            onClickClockIn={onClickClockIn}
            onClickClockOut={onClickClockOut}
          />
        </ClockInOutPanelWrap>
        <AttendanceList>
          {attendanceList.map((attendance) => {
            <AttendanceHistory attendance={attendance} />
          })}
        </AttendanceList>
      </ScrollWrap>
    </Container>
  )
}

export default HomeLayout;