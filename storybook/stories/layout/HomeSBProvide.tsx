import * as React from 'react';

import { Alert } from 'react-native';
import { LocationData } from '../../../src/providers/HomeProvider';
import { Provider } from '../../../src/contexts/HomeContext';

interface Props {
  children?: React.ReactElement;
}

const HomeSBProvider = (props: Props): React.ReactElement =>
{
  // Screen States
  const states = {
    gps: {
      coords: {
        latitude: 12.21312,
        longitude: 12.324213213123123
      }
    },
    enabledGPS: true,
    distanceFormOffice: 10,
    validDistanceFromOffice: 11
  };

  const actions = {
    onClickClockIn: () => {
      Alert.alert('Success In');
    },
    onClickClockOut: () => {
      Alert.alert('Success Out');
    },
  };

  return (
    <Provider value={{ ...states, ...actions }}>{props.children}</Provider>
  );
};

export default HomeSBProvider;
