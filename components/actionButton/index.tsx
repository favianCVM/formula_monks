import React from 'react';
import {Pressable, PressableProps} from 'react-native';
import {Text} from '../fragments/Text';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {COLORS} from '../../styles/colors';

interface ActionButtonProps extends Omit<PressableProps, 'children'> {
  icon: string;
  children: string;
}

const ActionButton = React.memo(
  ({icon, children, style, ...props}: ActionButtonProps) => {
    return (
      <Pressable
        style={({pressed}) => ({
          borderColor: COLORS.text,
          borderWidth: 1.5,
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-start',
          padding: 10,
          borderRadius: 10,
          backgroundColor: pressed ? COLORS.blue : COLORS.gray,
          ...(typeof style === 'object' ? style : {}),
        })}
        {...props}>
        <Icon
          color={COLORS.text}
          style={{marginRight: 10}}
          name={icon}
          size={20}
        />
        <Text>{children}</Text>
      </Pressable>
    );
  },
);

export {ActionButton};
