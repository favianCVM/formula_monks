import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {Text} from '../fragments/Text';
import {COLORS} from '../../styles/colors';
import { AuthorInformation } from '../../types';


const AuthorCard = React.memo(
  ({
    address,
    company,
    email,
    name,
    phone,
    username,
    website,
    id,
  }: AuthorInformation) => {
    return (
      <View style={{backgroundColor: COLORS.gray, padding: 18}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 18,
          }}>
          <Icon
            style={{
              backgroundColor: COLORS.green,
              padding: 20,
              borderRadius: 10,
            }}
            name="user"
            size={30}
          />
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              flex: 1,
              paddingLeft: 20,
            }}>
            <Text>username: {username}</Text>
            <Text>name: {name}</Text>
            <Text>user id: {id}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon
                color={COLORS.text}
                name="envelope"
                size={20}
                style={{marginRight: 16}}
              />
              <Text>{email}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 6,
              }}>
              <Icon
                color={COLORS.text}
                name="phone"
                size={20}
                style={{marginRight: 16}}
              />
              <Text>{phone}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                color={COLORS.text}
                name="briefcase"
                size={20}
                style={{marginRight: 16}}
              />
              <Text>{company.name}</Text>
            </View>
          </View>
          <View>
            <Icon
              color={COLORS.text}
              name="location-dot"
              size={20}
              style={{alignSelf: 'center'}}
            />
            <Text>{address.city}</Text>
            <Text>{address.street}</Text>
          </View>
        </View>
      </View>
    );
  },
);

export {AuthorCard};
