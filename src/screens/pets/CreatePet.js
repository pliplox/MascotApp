import React, { useState } from 'react'
import { View } from 'react-native'
import { Text, Button, Input, Icon, Datepicker } from '@ui-kitten/components'
import { shape } from 'prop-types'
import mascotappi from '../../api/mascotappi'
import { mutate } from 'swr'
import { queryKeys } from '../../utils/constants'

const PlusIcon = createPetIconProps => (
  <Icon {...createPetIconProps} name="plus-circle-outline" />
)

const CreatePet = ({ route, navigation }) => {
  const [birthdate, setBirthdate] = useState(new Date())
  const [name, setName] = useState('')

  const handleAddPet = async () => {
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
        navigation.navigate('Groups')
      } else {
        console.log('ke pazo ke pazo', response)
      }
    } catch (e) {
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
    <View>
      <Text>¿Como se llama tu mascota?</Text>
      <Input
        onChangeText={setName}
        autoCapitalize="none"
        value={name}
        placeholder={'Ingresa nombre de la mascota'}
        size="large"
        accessibilityRole="text"
      />
      <Text>¿Cual es la fecha de nacimiento de tu mascota?</Text>
      <Datepicker
        min={minDate}
        max={maxDate}
        date={birthdate}
        onSelect={nextDate => setBirthdate(nextDate)}
      />
      <Button onPress={handleAddPet} accessoryRight={PlusIcon}>
        Add Pet
      </Button>
    </View>
  )
}

export default CreatePet

CreatePet.propTypes = { route: shape({}), navigation: shape({}) }
