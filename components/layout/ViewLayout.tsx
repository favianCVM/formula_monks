import React from 'react';
import {View, ViewProps} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

const ViewLayout = React.memo(({children}: ViewProps) => {
  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 24,
        backgroundColor: '#F3EFEC',
      }}>
      {children}
    </View>
  );
});

export {ViewLayout};
