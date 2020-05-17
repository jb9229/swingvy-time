import * as Location from 'expo-location';
import * as React from 'react';

import { Alert } from 'react-native';
import { Provider } from '../contexts/HomeContext';

interface Props {
  children?: React.ReactElement;
}

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

const HomeProvider = (props: Props): React.ReactElement =>
{
  // Screen States
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
 
  const states = {
  };

  const actions = {
  };

  return (
    <Provider value={{ ...states, ...actions }}>{props.children}</Provider>
  );
};

export default HomeProvider;
