import React, { useState } from 'react'
import { View, SafeAreaView, Dimensions } from 'react-native'
import { fetchGroups } from './request'
import useSWR from 'swr'
import {
  Spinner,
  Button,
  ViewPager,
  useStyleSheet,
  StyleService,
  Icon,
  Text,
} from '@ui-kitten/components'
import { useTranslation } from '../../context/LanguageContext'
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

  const handleRedirectToAddPet = ({ groupId }) =>
    navigation.navigate('Pets', { screen: 'CreatePet', params: { groupId } })

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
            <Text style={styles.textButton}>{groupList.create}</Text>
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
  textButton: {
    color: 'white',
  },
})

GroupList.propTypes = { navigation: shape({}) }
GroupList.defaultProps = { navigation: {} }
