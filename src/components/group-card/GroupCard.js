import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Card, Text, Divider, Icon, Button } from '@ui-kitten/components'
import GroupHeader from './GroupHeader'
import MemberList from './MemberList'
import PetList from './PetList'
import { string, arrayOf, shape, func, oneOfType, number } from 'prop-types'
import { useTranslation } from '../../context/LanguageContext'

const PlusIcon = props => <Icon {...props} name="plus-circle-outline" />

const GroupCard = ({ group, redirectToAddPet }) => {
  const { actions, groupList } = useTranslation()

  const { name, users: members, pets, id } = group

  const handleRedirectToAddPet = () => redirectToAddPet({ groupId: id })

  return (
    <Card header={() => <GroupHeader name={name} />} style={styles.container}>
      <Text category="h3">{groupList.subTitles.members}</Text>
      <MemberList members={members} />
      <Divider style={styles.divider} />
      <View style={styles.petListHeader}>
        <Text category="h3">{groupList.subTitles.pets}</Text>

        <Button
          size="small"
          style={styles.addPetButton}
          appearance="outline"
          accessoryRight={PlusIcon}
          onPress={handleRedirectToAddPet}>
          {actions.add}
        </Button>
      </View>
      <PetList pets={pets} />
    </Card>
  )
}

export default GroupCard

const styles = StyleSheet.create({
  container: { margin: 15 },
  divider: { height: 2 },
  petListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addPetButton: { height: 15, width: 70 },
})

GroupCard.defaultProps = {
  group: {
    id: null,
    name: null,
    users: [],
    pets: [],
  },
  redirectToAddPet: () => {},
}

GroupCard.propTypes = {
  group: shape({
    id: oneOfType([string, number]),
    name: string,
    users: arrayOf(shape({})),
    pets: arrayOf(shape({})),
  }),
  redirectToAddPet: func,
}
