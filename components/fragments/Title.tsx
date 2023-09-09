import React from 'react';
import {Text, TextProps as NativeTextProps, StyleSheet} from 'react-native';
import {COLORS} from '../../styles/colors';
import {normalize} from '../../libs/normalizeSize';

interface TextProps extends NativeTextProps {}

const styles = StyleSheet.create({
  title: {
    fontSize: normalize(24),
    color: COLORS.text,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const Title = React.memo(({style, children}: TextProps) => {
  return <Text style={[styles.title, style]}>{children}</Text>;
});

export {Title};
