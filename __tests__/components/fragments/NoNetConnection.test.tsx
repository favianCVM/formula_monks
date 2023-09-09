import React from 'react';
import {NoNetConnection} from '../../../components/fragments/NoNetConnection';
import renderer from 'react-test-renderer';

describe('No net connection fragment', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<NoNetConnection />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
