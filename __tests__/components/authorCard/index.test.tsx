import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {AuthorCard} from '../../../components/authorCard/';
import {AuthorInformation} from '../../../types';
import renderer from 'react-test-renderer';

describe('Author information card element', () => {
  const authorInformationPlaceholder: AuthorInformation = {
    id: 1,
    address: {
      city: 'city-placeholder',
      street: 'street-placeholder',
    },
    company: {
      name: '',
    },
    email: 'email-placeholder',
    name: 'name-placeholder',
    phone: 'phone-placeholder',
    username: 'username-placeholder',
    website: 'website-placeholder',
  };

  it('renders author information card with the given values', () => {
    const {getByTestId} = render(
      <AuthorCard {...authorInformationPlaceholder} />,
    );

    const authorCardElement = getByTestId('AuthorCardElement');
    expect(authorCardElement).not.toBeNull();

    expect(
      screen.getByText(`${authorInformationPlaceholder.id}`),
    ).toBeVisible();
    expect(
      screen.getByText(authorInformationPlaceholder.address.city),
    ).toBeVisible();
    expect(
      screen.getByText(authorInformationPlaceholder.address.street),
    ).toBeVisible();
    expect(
      screen.getByText(authorInformationPlaceholder.company.name),
    ).toBeVisible();
    expect(screen.getByText(authorInformationPlaceholder.email)).toBeVisible();
    expect(screen.getByText(authorInformationPlaceholder.name)).toBeVisible();
    expect(screen.getByText(authorInformationPlaceholder.phone)).toBeVisible();
    expect(
      screen.getByText(authorInformationPlaceholder.username),
    ).toBeVisible();
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(<AuthorCard {...authorInformationPlaceholder} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
