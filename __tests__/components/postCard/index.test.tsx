import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import {Post} from '../../../types';
import {PostCard} from '../../../components/postCard';

describe('Post card element', () => {
  const postPlaceholder: Post = {
    id: 0,
    userId: 0,
    body: '',
    title: '',
  };

  it('renders card', () => {
    render(<PostCard {...postPlaceholder} />);

    const postCardElement = screen.getByTestId('PostCardElement');
    expect(postCardElement).not.toBeNull();
  });

  it('renders card with given values', () => {
    render(<PostCard {...postPlaceholder} />);

    expect(screen.getByText(`${postPlaceholder.title}`)).toBeVisible();
  });

  it('executes the given handler', () => {
    const handlerMock = jest.fn();

    render(
      <PostCard handleDetailsRedirection={handlerMock} {...postPlaceholder} />,
    );

    fireEvent.press(screen.getByTestId('PostCardElement'));
    expect(handlerMock).toBeCalled();
  });

  it('renders correctly', () => {
    const tree = renderer.create(<PostCard {...postPlaceholder} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
