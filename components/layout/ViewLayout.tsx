import React from 'react';
import {View, ViewProps} from 'react-native';

const ViewLayout = React.memo(({children}: ViewProps) => {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 24,
        backgroundColor: '#F3EFEC',
        justifyContent: 'flex-start',
      }}>
      {children}
    </View>
  );
});

export {ViewLayout};
