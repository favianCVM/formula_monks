import React from 'react';
import {render} from '@testing-library/react-native';
import {Text} from '../../../components/fragments/Text';

describe('Text fragment', () => {
  it('renders text with the given value', () => {
    const {getByTestId} = render(<Text>hello world</Text>);

    const textFragment = getByTestId('TextFragment');
    expect(textFragment).toHaveTextContent('hello world');
  });

  it('renders no text', () => {
    const {getByTestId} = render(<Text></Text>);

    const textFragment = getByTestId('TextFragment');
    expect(textFragment).toHaveTextContent('');
  });

});
