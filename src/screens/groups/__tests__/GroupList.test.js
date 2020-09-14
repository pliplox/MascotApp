import 'react-native';
import React from 'react';
import { renderWithProviders } from '../../../utils/testing';
import GroupList from '../GroupList';
import { cleanup, waitFor } from '@testing-library/react-native';
import en from '../../../lang/en.json';

// if there is more warnings in other tests about animation, this shoul be moved to a single file
// and called it from jest setUpFiles configuration
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

const mockGroupsData = [
  { id: 1, name: 'First group' },
  { id: 2, name: 'Second group' },
];

// The request is mocked to return mockGroupsData and to not make an http request
jest.mock('../request', () => {
  return {
    fetchGroups: jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockGroupsData)),
  };
});

describe('GroupList', () => {
  const {
    placeholders: { loadingDots },
    groupList: { subTitles },
  } = en;

  let wrapper;

  beforeEach(() => {
    wrapper = renderWithProviders(<GroupList />);
  });

  afterEach(cleanup);

  it('renders a loading text', async () => {
    expect(wrapper.getByText(loadingDots)).toBeTruthy();
  });

  describe('when a list of group is fetched', () => {
    it('renders a card with group name title', async () => {
      await waitFor(() => {
        expect(wrapper.getByText(mockGroupsData[0].name)).toBeDefined();
        expect(wrapper.getByText(mockGroupsData[0].name)).toBeTruthy();
      });
    });

    it('renders pets and members title', async () => {
      const groupListSize = mockGroupsData.length;
      await waitFor(() => {
        expect(wrapper.getAllByText(subTitles.members)).toHaveLength(
          groupListSize,
        );
        expect(wrapper.getAllByText(subTitles.pets)).toHaveLength(
          groupListSize,
        );
      });
    });

    // TODO: implement following tests when backend feature is ready
    it.todo('shows members');
    it.todo('shows pets');
  });
});
