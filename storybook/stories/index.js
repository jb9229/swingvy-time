import ClockInOutPanel from '../../src/organisms/ClockInOutPanel';
import HomeLayout from '../../src/layout/HomeLayout';
import HomeSBProvider from './layout/HomeSBProvide';
import React from 'react';
import { ThemeProvider } from '../../src/providers/ThemeProvider';
import { storiesOf } from '@storybook/react-native';

storiesOf('Stories', module)
.addDecorator(getStory => <ThemeProvider>{getStory()}</ThemeProvider>)
  .add('ClockInOutPanel',
    () => React.createElement(() => {
      const gps = {
        coords: {
          latitude: 12.21312,
          longitude: 12.324
        }
      }
      return (
        <ClockInOutPanel enabledGPS={false} gps={gps} distanceFormOffice={1} validDistanceFromOffice={5}/>
      );
    })
  )
  .add('HomeScreen',
    () => React.createElement(() => {
      return (
        <HomeSBProvider>
          <HomeLayout/>
        </HomeSBProvider>
      );
    })
  );
