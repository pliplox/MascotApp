import 'react-native'
import React from 'react'
import { renderWithProviders } from '../../../utils/testing'
import GroupList from '../GroupList'
import { cleanup, waitFor } from '@testing-library/react-native'
import en from '../../../lang/en.json'

const mockGroupsData = {
  groups: [
    {
      id: 1,
      name: 'First group',
      users: [{ id: 1, name: 'user1' }],
      pets: [{ id: 1, name: 'pet1' }],
    },
    {
      id: 2,
      name: 'Second group',
      users: [{ id: 2, name: 'user2' }],
      pets: [{ id: 2, name: 'pet2' }],
    },
  ],
}

// The request is mocked to return mockGroupsData and to not make an http request
jest.mock('../request', () => {
  return {
    fetchGroups: jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockGroupsData)),
  }
})

describe('GroupList', () => {
  const {
    placeholders: { loadingDots },
    groupList: { subTitles },
  } = en

  let wrapper

  beforeEach(() => {
    wrapper = renderWithProviders(<GroupList />)
  })

  afterEach(cleanup)

  it('renders a loading text', () => {
    expect(wrapper.getByText(loadingDots)).toBeTruthy()
  })

  describe('when fetching groups', () => {
    it('renders a card with group name title', async () => {
      const { groups } = mockGroupsData
      expect(await wrapper.findByText(groups[0].name)).toBeDefined()
      expect(await wrapper.findByText(groups[0].name)).toBeTruthy()
    })

    it('renders pets and members title', async () => {
      const groupListSize = mockGroupsData.groups.length
      await waitFor(() => {
        expect(wrapper.getAllByText(subTitles.members)).toHaveLength(
          groupListSize,
        )
        expect(wrapper.getAllByText(subTitles.pets)).toHaveLength(groupListSize)
      })
    })

    it('shows members', async () => {
      const { groups } = mockGroupsData
      const [firstGroup, secondGroup] = groups
      const { users } = firstGroup
      const { users: usersSecondGroup } = secondGroup
      expect(await wrapper.findByText(users[0].name)).toBeTruthy()
      expect(await wrapper.findByText(usersSecondGroup[0].name)).toBeTruthy()
    })

    it('shows pets', async () => {
      const { groups } = mockGroupsData
      const [firstGroup, secondGroup] = groups
      const { pets } = firstGroup
      const { pets: petsSecondGroup } = secondGroup
      expect(await wrapper.findByText(pets[0].name)).toBeTruthy()
      expect(await wrapper.findByText(petsSecondGroup[0].name)).toBeTruthy()
    })
  })
})
