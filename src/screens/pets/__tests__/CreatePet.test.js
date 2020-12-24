import 'react-native'
import React from 'react'
import { renderWithProviders, MockedNavigator } from '../../../utils/testing'
import CreatePet from '../CreatePet'
import mascotapiMock from '../../../api/mascotappi'
import { fireEvent, waitFor } from '@testing-library/react-native'
import en from '../../../lang/en.json'

const groupId = 1

jest.mock('../../../api/mascotappi', () => ({
  post: jest.fn((url, pet) =>
    Promise.resolve({
      data: { pet, message: 'Mascota creada con éxito' },
      status: 201,
    }),
  ),
  create: jest.fn(),
}))

describe('CreatePet', () => {
  const {
    pet: { questions, placeholders },
    actions,
  } = en

  let wrapper

  beforeEach(() => {
    wrapper = renderWithProviders(
      <MockedNavigator component={CreatePet} params={{ groupId }} />,
    )
  })

  it('renders elements correctly', () => {
    // renders the name question text
    expect(wrapper.getByText(questions.name)).toBeTruthy()

    // renders the birthdate question text
    expect(wrapper.getByText(questions.birthdate)).toBeTruthy()

    // renders the placeholder text
    expect(wrapper.getByPlaceholderText(placeholders.enterName)).toBeTruthy()

    // renders the add pet button
    expect(wrapper.getByText(actions.add)).toBeTruthy()
  })

  describe('when adding a pet', () => {
    it('sends a post request to add a pet', async () => {
      const addButton = wrapper.getByText(actions.add)
      const inputText = wrapper.getByPlaceholderText(placeholders.enterName)

      const newPetName = 'Wesos'

      fireEvent.changeText(inputText, newPetName)
      fireEvent.press(addButton)

      await waitFor(() => expect(mascotapiMock.post).toHaveBeenCalledTimes(1))
    })
  })
})
