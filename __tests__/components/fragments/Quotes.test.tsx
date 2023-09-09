import React from 'react';
import {render} from '@testing-library/react-native';
import {Quotes} from '../../../components/fragments/Quotes';
import renderer from 'react-test-renderer';

describe('Quotes fragment', () => {
  it('renders text with the given value', () => {
    const {getByTestId} = render(<Quotes>hello world</Quotes>);

    const textFragment = getByTestId('QuoteFragment');
    expect(textFragment).toHaveTextContent('hello world');
  });

  it('renders no text', () => {
    const {getByTestId} = render(<Quotes></Quotes>);

    const textFragment = getByTestId('QuoteFragment');
    expect(textFragment).toHaveTextContent('“”');
  });

  it('renders correctly', () => {
    const tree = renderer.create(<Quotes>hello world</Quotes>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
