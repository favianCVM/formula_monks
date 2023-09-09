import React from 'react';
import {render} from '@testing-library/react-native';
import {Title} from '../../../components/fragments/Title';

describe('Title fragment', () => {
  it('renders Title with the given value', () => {
    const {getByTestId} = render(<Title>hello world</Title>);

    const TitleFragment = getByTestId('TitleFragment');
    expect(TitleFragment).toHaveTextContent('hello world');
  });

  it('renders no Title', () => {
    const {getByTestId} = render(<Title></Title>);

    const TitleFragment = getByTestId('TitleFragment');
    expect(TitleFragment).toHaveTextContent('');
  });
});
