import React from 'react';
import {StyleSheet, TextProps} from 'react-native';
import {Text} from './Text';

const styles = StyleSheet.create({
  quotes: {
    fontWeight: 'bold',
    fontSize: 28,
  },
});

const Quotes = React.memo(({children, ...props}: TextProps) => (
  <Text {...props}>
    <Text style={styles.quotes}>“</Text>
    {children}
    <Text style={styles.quotes}>”</Text>
  </Text>
));

export {Quotes};
