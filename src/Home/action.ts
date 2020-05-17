import { Alert, AsyncStorage } from 'react-native';
import { Attendance, ClockType } from './types';

export const STORAGE_KEY_ATTENDANCE = 'ATTENDANCE';
const GEO_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const GEO_ACCESS_TOKEN = 'pk.eyJ1IjoiaWFtYXBhcms4OSIsImEiOiJjanlpZmF5c3AwOXJzM2NxaDQzNWhiaDRmIn0.C-e2EpmyDtsqPbu9FjJz5Q';

/**
 * attendance function
 * @param date attendance time
 * @param latitude attendance latitude
 * @param longgitude attendace loggitude
 * @param clockType attendace type in or out
 */
export const attendance = (date: Date, latitude: number, longgitude: number, clockType: ClockType): void => {
  fetch(`${GEO_URL}${latitude},${longgitude}.json?access_token=${GEO_ACCESS_TOKEN}`)
    .then((res) => res.json())
    .then((geoData) => {
      if (geoData.features.properties.address)
      {
        AsyncStorage.getItem(STORAGE_KEY_ATTENDANCE)
        .then((data) => {
          const attendanceList = new Array<Attendance>();
          if (data) { const dataList = JSON.parse(data); dataList.forEach((history: Attendance) => { const hAttendance = convertAttendanceData(history); if (hAttendance) {attendanceList.push(hAttendance)} })
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
};

const convertAttendanceData = (localDataStr: Attendance): Attendance | null => {
  if (localDataStr?.dateStr && localDataStr?.address && localDataStr?.clockType)
  {
    return new Attendance(localDataStr.dateStr, localDataStr.address, localDataStr.clockType);
  }

  return null;
};
