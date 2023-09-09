import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react-native';
import {ActionButton} from '../../../components/actionButton';
import renderer from 'react-test-renderer';

describe('Action button element', () => {
  it('renders text with the given value', () => {
    const {getByTestId} = render(
      <ActionButton icon="start">hello world</ActionButton>,
    );

    const textFragment = getByTestId('ActionButtonElement');
    expect(textFragment).toHaveTextContent('hello world');
  });

  it('executes the given handler', () => {
    const handlerMock = jest.fn();

    render(
      <ActionButton onPress={handlerMock} icon="start">
        hello world
      </ActionButton>,
    );

    fireEvent.press(screen.getByTestId('ActionButtonElement'));
    expect(handlerMock).toBeCalled();
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(<ActionButton icon="start">hello world</ActionButton>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
