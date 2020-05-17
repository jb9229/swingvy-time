import { Alert, AsyncStorage } from 'react-native';
import { Attendance, ClockType } from './types';

export const STORAGE_KEY_ATTENDANCE = 'ATTENDANCE';
const GEO_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const GEO_ACCESS_TOKEN = 'pk.eyJ1IjoiaWFtYXBhcms4OSIsImEiOiJjanlpZmF5c3AwOXJzM2NxaDQzNWhiaDRmIn0.C-e2EpmyDtsqPbu9FjJz5Q';

const attendance = (date: Date, latitude: number, longgitude: number, clockType: ClockType): void => {
  fetch(`${GEO_URL}${latitude},${longgitude}.json?access_token=${GEO_ACCESS_TOKEN}`)
    .then((res) => res.json())
    .then((geoData) => {
      if (geoData.features.properties.address)
      {
        AsyncStorage.getItem(STORAGE_KEY_ATTENDANCE)
        .then((data) => {
          const attendanceList = new Array<Attendance>();
          if (data) { const dataList = JSON.parse(data); dataList.map((history: Attendance) => { if (history?.dateStr && history?.address && history?.clockType) { attendanceList.push(new Attendance(history.dateStr, history.address, history.clockType))} })}
          const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
          const address = geoData.features.properties.address;
          const newAttendance = new Attendance(dateStr, address, clockType);

          attendanceList.push(newAttendance);
          AsyncStorage.setItem(STORAGE_KEY_ATTENDANCE, JSON.stringify(attendanceList));
        }).catch((error) => { Alert.alert('Error!!', error?.message) })

      } else {
        Alert.alert('Invalid GeoData: ', geoData ? JSON.stringify(geoData) : `geoData is ${geoData}`)
      }
    })
    .catch((error) => { Alert.alert('Error!!', error?.message) })
}