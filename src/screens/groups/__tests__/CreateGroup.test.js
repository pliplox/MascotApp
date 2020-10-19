import 'react-native';
import React from 'react';
import { renderWithProviders } from '../../../utils/testing';
import CreateGroup from '../CreateFamilyGroup';
import mascotapiMock from '../../../api/mascotappi';
import { fireEvent, waitFor } from '@testing-library/react-native';
import en from '../../../lang/en.json';

jest.mock('../../../api/mascotappi', () => ({
  post: jest.fn(),
  create: jest.fn(),
}));

describe('CreateGroup', () => {
  const {
    actions,
    createGroup: {
      groupName,
      placeholders: { typeGroupName },
    },
  } = en;

  let wrapper;

  beforeEach(() => {
    wrapper = renderWithProviders(<CreateGroup />);
  });

  it('renders elements correctly', () => {
    // renders the label text
    expect(wrapper.getByText(groupName)).toBeTruthy();

    // renders the placeholder text
    expect(wrapper.getByPlaceholderText(typeGroupName)).toBeTruthy();

    // renders the create group button
    expect(wrapper.getByText(actions.create)).toBeTruthy();
  });

  describe('when creating a group', () => {
    it('sends a post request to create a group', async () => {
      const createButton = wrapper.getByText(actions.create);
      const inputText = wrapper.getByPlaceholderText(typeGroupName);

      const newGroupName = 'Los Simpson';

      fireEvent.changeText(inputText, newGroupName);
      fireEvent.press(createButton);

      const { post } = mascotapiMock;
      post.mockImplementation(() =>
        Promise.resolve({
          data: {
            message: 'Grupo familiar creado con éxito',
            familyGroup: { id: '1', name: newGroupName, users: [] },
          },
          status: 201,
        }),
      );

      await waitFor(() => expect(mascotapiMock.post).toHaveBeenCalled());
    });
  });
});
