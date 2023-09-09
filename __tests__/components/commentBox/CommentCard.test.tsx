import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {CommentCard} from '../../../components/commentsBox/CommentCard';
import { PostComment } from '../../../types';

describe('Comment card element', () => {
  const commentPlaceholder: PostComment = {
    id: 1,
    postId: 1,
    body: 'lorem ipsum dolor sit amet',
    email: 'loremipsum dolor sit amet',
    name: 'loremipsum dolor sit amet',
  };

  it('renders comment card with the given values', () => {
    const {getByTestId} = render(<CommentCard {...commentPlaceholder} />);

    const commentCardElement = getByTestId('CommentCardElement');
    expect(commentCardElement).not.toBeNull();

    expect(screen.getByText(commentPlaceholder.body)).toBeVisible();
    expect(screen.getByText(commentPlaceholder.email)).toBeVisible();
  });

  it('renders comment card with the given values', () => {
    const {queryByTestId} = render(<CommentCard />);

    const commentBody = queryByTestId('CommentCardBody');
    expect(commentBody).toHaveTextContent('');

    const commentEmail = queryByTestId('CommentCardEmail');
    expect(commentEmail).toHaveTextContent('');
  });
});
