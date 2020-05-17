import * as Location from 'expo-location';
import * as React from 'react';

import { Alert } from 'react-native';
import Button from '../molecules/Button';
import { i18n } from '../providers/ThemeProvider';
import styled from 'styled-components/native';

export interface LocationData {
  coords: {
      latitude: number;
      longitude: number;
      altitude: number;
      accuracy: number;
      heading: number;
      speed: number;
  };
  timestamp: number;
}

const Container = styled.View``
const Header = styled.View``;
const Contents = styled.View`
  flex-direction: row;
`;
const LeftContent = styled.View`
`;
const RightContent = styled.View`
`;
const Title = styled.Text``;
const CurrentPositionTitle = styled.Text``;
const GPSLocation = styled.Text``;
const DistanceNotice = styled.Text ``;
const CommandWrap = styled.View``;

interface Props {
  distanceOutOffice: number;
  distanceInOffice: number;
  currentGPSLocation: LocationData;
}
const ClockInOutPanel: React.FC = () => {
  const [gpsLocation, setGpsLocation] = React.useState<LocationData>();

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      setGpsLocation(location);
    })();
  });

  return (
    <Container>
      <Header>
      <Title>{gpsLocation ? i18n.t('gps.KEY3') : i18n.t('gps.KEY4')}</Title>
      </Header>
      <Contents>
        <LeftContent>
          <CurrentPositionTitle>{i18n.t('gps.KEY1')}</CurrentPositionTitle>
          <GPSLocation>{`Latitude: ${gpsLocation?.coords.latitude}`}</GPSLocation>
          <GPSLocation>{`Longtitude: ${gpsLocation?.coords.longitude}`}</GPSLocation>
        </LeftContent>
        <RightContent>
          <DistanceNotice>{1 > 5 ? i18n.t('gps.KEY2').replace('10', '5') : i18n.t('gps.KEY5')}</DistanceNotice>
        </RightContent>
      </Contents>
      <CommandWrap>
          {1 > 5
            ? <Button text={i18n.t('gps.KEY6')} onClick={() => {}} />
            : (<React.Fragment><Button text={i18n.t('gps.KEY7')} onClick={() => {}} /><Button text={i18n.t('gps.KEY8')} onClick={() => {}} /></React.Fragment>)
          }
        </CommandWrap>
    </Container>
  )
}

export default ClockInOutPanel;
