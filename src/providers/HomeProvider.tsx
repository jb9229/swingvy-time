import * as Location from 'expo-location';
import * as React from 'react';

import { Alert, AsyncStorage } from 'react-native';

import { Attendance } from '../Home/types';
import { Provider } from '../contexts/HomeContext';
import { STORAGE_KEY_ATTENDANCE } from '../Home/action';

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
  const validDistanceFromOffice = 5;
  const [enabledGPS, setEnabledGPS] = React.useState<boolean>(false);
  const [gpsLocation, setGpsLocation] = React.useState<LocationData>();
  const [distanceFormOffice, setDistanceFormOffice] = React.useState<number>();
  const [attendanceList, setAttendanceList] = React.useState<Array<Attendance>>([]);

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      if (location)
      {
        setGpsLocation(location);
        setEnabledGPS(true);
      }
    })();
    AsyncStorage.getItem(STORAGE_KEY_ATTENDANCE)
      .then((data) => {
        if (data)
        {
          const dataList = JSON.parse(data);
          if (dataList && dataList.length > 0)
          {
            setAttendanceList(dataList);
          }
        }
      })
      .catch((error) => { Alert.alert('Error!!', error?.message) })
  });
 
  const states = {
    gps: gpsLocation,
    enabledGPS,
    distanceFormOffice,
    validDistanceFromOffice,
    attendanceList
  };

  const actions = {
    onClickClockIn: () => {
      
    },
    onClickClockOut: () => {}
  };

  return (
    <Provider value={{ ...states, ...actions }}>{props.children}</Provider>
  );
};

export default HomeProvider;
