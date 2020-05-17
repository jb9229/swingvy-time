import * as React from 'react';

import HomeLayout from '../src/layout/HomeLayout';
import HomeProvider from '../src/providers/HomeProvider';

export default function HomeScreen() {
  return (
    <HomeProvider>
      <HomeLayout />
    </HomeProvider>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};