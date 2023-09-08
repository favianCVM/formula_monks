import React from 'react';
import {View, ViewProps} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

const Layout = React.memo(({children}: ViewProps) => {
  return (
    <SafeAreaProvider>
      {children}
      <Toast />
    </SafeAreaProvider>
  );
});

export {Layout};
