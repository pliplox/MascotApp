import React, { useState } from 'react'
import { Text, View, SafeAreaView, Dimensions } from 'react-native'
import { fetchGroups } from './request'
import useSWR from 'swr'
import {
  Spinner,
  Button,
  ViewPager,
  useStyleSheet,
  StyleService,
  Icon,
} from '@ui-kitten/components'
import { useTranslation } from '../../context/LanguageContext'
import { useAuth } from '../../context/AuthContext'
import { GroupCard } from '../../components/group-card'
import ViewPagerDots from '../../components/ViewPagerDots'
import { shape } from 'prop-types'
import { queryKeys } from '../../utils/constants'

const HEIGHT = Dimensions.get('window').height

const GroupList = ({ navigation }) => {
  const styles = useStyleSheet(themedStyles)

  const { data, error: groupError } = useSWR(queryKeys.groupList, () =>
    fetchGroups(),
  )

  const { signOut, loadingUser } = useAuth()

  const [selectedIndex, setSelectedIndex] = useState(0)

  const { groupList, placeholders } = useTranslation()

  if (!data) {
    return (
      <View style={styles.loadingContainer}>
        <Spinner size="large" />
        <Text>{placeholders.loadingDots}</Text>
      </View>
    )
  }

  if (groupError) {
    return (
      <>
        <Text>{groupList.error}</Text>
        <Text>{groupError}</Text>
      </>
    )
  }

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (e) {
      console.error('Error trying to sign out: ', e.message)
    }
  }

  const handleRedirectToAddPet = ({ groupId }) =>
    navigation.navigate('Add Pet', { groupId })

  const groupDataLength = data?.groups?.length
  return (
    <SafeAreaView>
      {groupDataLength === 0 ? (
        <View style={themedStyles.createGroupWrapper}>
          <Text style={themedStyles.noGroupsText}>{groupList.empty}</Text>
          <Button
            onPress={() => navigation.navigate('CreateGroup')}
            accessoryRight={createGroupIconProps => (
              <Icon {...createGroupIconProps} name="plus-circle-outline" />
            )}
            style={themedStyles.createGroupButton}>
            {groupList.create}
          </Button>
        </View>
      ) : (
        <>
          <ViewPager
            selectedIndex={selectedIndex}
            onSelect={index => setSelectedIndex(index)}>
            {data?.groups?.map(groupData => (
              <GroupCard
                key={groupData.id}
                group={groupData}
                redirectToAddPet={handleRedirectToAddPet}
              />
            ))}
          </ViewPager>
          <View style={styles.dots}>
            <ViewPagerDots
              size={groupDataLength}
              selectedIndex={selectedIndex}
            />
          </View>
        </>
      )}
      {/* Temporary button to sign out, this should be removed with bottom navigation implementation */}
      <Button
        onPress={handleSignOut}
        style={styles.buttons}
        accessoryRight={
          loadingUser
            ? () => <Spinner size="small" status="basic" />
            : signOutIconProps => (
                <Icon {...signOutIconProps} name="log-out-outline" />
              )
        }>
        Sign Out
      </Button>
    </SafeAreaView>
  )
}

export default GroupList

const themedStyles = StyleService.create({
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  dots: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingBottom: 3,
  },
  createGroupButton: { marginHorizontal: 25 },
  noGroupsText: { marginTop: '50%', textAlign: 'center', marginHorizontal: 25 },
  createGroupWrapper: {
    height: HEIGHT * 0.8,
    justifyContent: 'space-between',
  },
  buttons: { flex: 0.1, margin: 15 },
})

GroupList.propTypes = { navigation: shape({}) }
GroupList.defaultProps = { navigation: {} }
