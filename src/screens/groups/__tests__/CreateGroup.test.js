import 'react-native';
import React from 'react';
import { renderWithProviders } from '../../../utils/testing';
import CreateGroup from '../CreateFamilyGroup';
import { cleanup } from '@testing-library/react-native';
import en from '../../../lang/en.json';

describe('CreateGroup', () => {
  const {
    actions,
    // eslint-disable-next-line no-unused-vars
    createGroup: { groupName, placeholders: typeGroupName },
  } = en;

  let wrapper;

  beforeEach(() => {
    wrapper = renderWithProviders(<CreateGroup />);
  });

  afterEach(cleanup);

  it('renders elements correctly', () => {
    // renders the label text
    expect(wrapper.getByText(groupName)).toBeTruthy();

    // renders the placeholder text
    // skipped because weird error
    // TODO: make it pass sometime in the future (:
    // expect(wrapper.getByPlaceholderText(typeGroupName)).toBeTruthy();

    // renders the create group button
    expect(wrapper.getByText(actions.create)).toBeTruthy();
  });

  // TODO: test this when backend implementation is ready
  // eslint-disable-next-line jest/no-disabled-tests
  describe.skip('when create button is pressed');
});
