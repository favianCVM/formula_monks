import React from 'react';
import {Text as NativeText, TextProps} from 'react-native';
import {COLORS} from '../../styles/colors';

const Text = React.memo(
  ({children, style, testID = 'TextFragment'}: TextProps) => {
    return (
      <NativeText
        testID={testID}
        style={[
          {
            color: COLORS.text,
            fontSize: 16,
          },
          style,
        ]}>
        {children}
      </NativeText>
    );
  },
);

export {Text};
