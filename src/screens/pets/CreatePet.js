import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import {
  Text,
  Button,
  Input,
  Icon,
  Datepicker,
  Spinner,
  Divider,
} from '@ui-kitten/components'
import { shape } from 'prop-types'
import mascotappi from '../../api/mascotappi'
import { mutate } from 'swr'
import { queryKeys } from '../../utils/constants'
import { useTranslation } from '../../context/LanguageContext'

const PlusIcon = createPetIconProps => (
  <Icon {...createPetIconProps} name="plus-circle-outline" />
)

const CreatePet = ({ route, navigation }) => {
  const [birthdate, setBirthdate] = useState(new Date())
  const [name, setName] = useState()
  const [loading, setLoading] = useState(false)

  const {
    pet: { questions, placeholders },
    actions,
  } = useTranslation()

  const handleAddPet = async () => {
    setLoading(true)

    const {
      params: { groupId },
    } = route
    try {
      const response = await mascotappi.post('pet', {
        name,
        birthdate,
        familyGroupId: groupId,
      })

      if (response.status === 201) {
        await mutate(queryKeys.groupList) // update group list
        // TODO: discuss if this should go to a pet profile or it is fine just to go back to groupList
        // I think when the pet profile is ready, this should go there
        setLoading(false)
        navigation.navigate('Groups')
      } else {
        setLoading(false)
        console.log('error response: ', response)
      }
    } catch (e) {
      setLoading(false)
      console.error(e.message)
    }
  }

  const maxDate = new Date()
  const minDate = new Date(
    maxDate.getFullYear() - 100,
    maxDate.getMonth(),
    maxDate.getDate(),
  )

  return (
    <View style={styles.container}>
      <View>
        <Text>{questions.name}</Text>
        <Input
          onChangeText={setName}
          autoCapitalize="none"
          value={name}
          placeholder={placeholders.enterName}
          size="large"
          accessibilityRole="text"
        />
      </View>
      <Divider style={styles.divider} />
      <View>
        <Text>{questions.birthdate}</Text>
        <Datepicker
          min={minDate}
          max={maxDate}
          date={birthdate}
          onSelect={nextDate => setBirthdate(nextDate)}
        />
      </View>
      <Divider style={styles.divider} />
      <Button
        style={styles.margin}
        onPress={handleAddPet}
        accessoryRight={
          loading ? () => <Spinner size="small" status="basic" /> : PlusIcon
        }>
        {actions.add}
      </Button>
    </View>
  )
}

export default CreatePet

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginBottom: 10,
    flex: 1,
    justifyContent: 'flex-end',
  },
  margin: { margin: 30 },
  divider: { flex: 0.3 },
})

CreatePet.propTypes = { route: shape({}), navigation: shape({}) }
