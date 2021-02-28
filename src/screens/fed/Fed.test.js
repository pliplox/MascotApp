import 'react-native'
import React from 'react'
import { renderWithProviders } from '../../utils/testing'
import Fed from './Fed'
import { waitFor, cleanup } from '@testing-library/react-native'
import mascotappiMock from '../../api/mascotappi'
import moment from 'moment'

jest.mock('../../api/mascotappi', () => ({
  get: jest.fn(),
  create: jest.fn(),
}))

describe('Fed', () => {
  let wrapper

  beforeEach(() => {
    const { get } = mascotappiMock
    get.mockImplementation(url => {
      switch (url) {
        case 'family/groups':
          return Promise.resolve({
            data: [{ name: 'groupName', id: 'groupId' }],
            status: 200,
          })
        case 'pets/groupId':
          return Promise.resolve({
            data: {
              pets: [
                {
                  _id: 'petId',
                  name: 'PetName',
                  birthdate: '2020-05-04',
                  feds: [
                    {
                      _id: 'fedId',
                      currentDateTime: '2020-06-08T00:54:34.468Z',
                      user: { name: 'Elon' },
                    },
                  ],
                },
              ],
            },
            status: 200,
          })
        default:
          return Promise.reject(new Error('not found'))
      }
    })

    wrapper = renderWithProviders(<Fed />)
  })

  afterEach(cleanup)

  it('renders correctly', () => {
    expect(wrapper).toBeTruthy()
  })

  it('fetchs and renders the data correctly', async () => {
    const { getByText } = await wrapper
    await waitFor(() => {
      expect(getByText('PetName, birthdate: 04/05/2020')).toBeTruthy()
      expect(getByText('Elon')).toBeTruthy()
      const fedTime = moment('2020-06-08T00:54:34.468Z').format('HH:mm:ss')
      expect(getByText(fedTime)).toBeTruthy()
    })
  })
})
