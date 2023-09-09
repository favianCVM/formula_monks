import React from 'react';
import {Text} from './Text';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {StyleSheet, View} from 'react-native';
import {COLORS} from '../../styles/colors';
import {normalize} from '../../libs/normalizeSize';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  center: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: COLORS.red,
    gap: 14,
    alignSelf: 'flex-start',
    borderRadius: 10,
  },
  copy: {
    fontSize: normalize(24),
    fontWeight: 'bold',
    marginLeft: normalize(12),
  },
});

const NoNetConnection = React.memo(() => {
  return (
    <View testID="NoNetConnectionFragment" style={styles.container}>
      <View style={styles.center}>
        <Icon color={COLORS.gray} name="wifi" size={20} />
        <Text style={styles.copy}>no internet connection</Text>
      </View>
    </View>
  );
});

export {NoNetConnection};
