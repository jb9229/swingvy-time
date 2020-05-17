import * as React from 'react';

import Button from '../molecules/Button';
import { FontAwesome5 } from '@expo/vector-icons';
import { LocationData } from '../providers/HomeProvider';
import { MaterialIcons } from '@expo/vector-icons';
import { i18n } from '../providers/ThemeProvider';
import styled from 'styled-components/native';

const Container = styled.View`
  padding-left: 20px;
  padding-right: 20px;
`
const Header = styled.View`
  align-items: center;
`;
const GPSIconWrap = styled.View`
  position: absolute;
  top: -38;
  background-color: white;
`;
const Contents = styled.View`
  border-bottom-width: 1px;
  border-top-width: 1px;
  padding-top: 20;
  padding-bottom: 20;
`;
const Content = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 40px;
`;
const LeftContent = styled.View`
  flex: 1;
`;
const AvataWrap = styled.View`
  margin: 10px;
`;
const RightContent = styled.View`
  flex: 1;
  justify-content: center;
`;
const Title = styled.Text``;
const CurrentPositionTitle = styled.Text`
  font-weight: bold;
`;
const GPSLocation = styled.Text`
  font-size: 12px;
`;
const DistanceNotice = styled.Text `
  font-weight: bold;
`;
const CommandWrap = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 80px;
`;

interface Props {
  gps: LocationData;
  enabledGPS: boolean;
  distanceFormOffice: number;
  validDistanceFromOffice: number;
  onClickClockIn: () => void;
  onClickClockOut: () => void;
}
const ClockInOutPanel: React.FC<Props> = (props) => {
  return (
    <Container>
      <Contents>
        <Header>
          <GPSIconWrap>
            {props.enabledGPS ? <MaterialIcons name="gps-fixed" size={24} color="black" /> : <MaterialIcons name="gps-off" size={24} color="black" />}
          </GPSIconWrap>
          <Title>{props.enabledGPS ? i18n.t('gps.KEY3') : i18n.t('gps.KEY4')}</Title>
        </Header>
        <Content>
          <LeftContent>
            <CurrentPositionTitle>{i18n.t('gps.KEY1')}</CurrentPositionTitle>
            <GPSLocation>{`Latitude: ${props.gps?.coords.latitude}`}</GPSLocation>
            <GPSLocation>{`Longtitude: ${props.gps?.coords.longitude}`}</GPSLocation>
          </LeftContent>
          <AvataWrap>
            <FontAwesome5 name="walking" size={24} color="black" />
          </AvataWrap>
          <RightContent>
            <DistanceNotice>
              {props.distanceFormOffice > props.validDistanceFromOffice
                ? i18n.t('gps.KEY2').replace('10', '' + props.distanceFormOffice) : i18n.t('gps.KEY5')}
            </DistanceNotice>
          </RightContent>
        </Content>
      </Contents>
      <CommandWrap>
          {props.distanceFormOffice > props.validDistanceFromOffice
            ? <Button text={i18n.t('gps.KEY6')} disabled />
            : (
              <React.Fragment>
                <Button text={i18n.t('gps.KEY7')} onClick={props.onClickClockIn} />
                <Button text={i18n.t('gps.KEY8')} onClick={props.onClickClockOut} />
              </React.Fragment>
              )
          }
        </CommandWrap>
    </Container>
  )
}

export default ClockInOutPanel;
