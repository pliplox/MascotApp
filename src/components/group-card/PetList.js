import React from 'react'
import { List, ListItem, Text } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { shape, oneOfType, string, number, arrayOf } from 'prop-types'

const petObjectShape = shape({
  _id: oneOfType([string, number]),
  name: string,
})

const PetList = ({ pets }) => {
  if (pets?.length === 0) {
    return (
      <Text>No hay mascotas prro</Text>
    )
  }

  const RenderItemIcon = () => <Icon name="pets" size={25} />

  const RenderItem = ({ item }) => (
    <ListItem title={item.name} accessoryLeft={RenderItemIcon} />
  )

  RenderItem.propTypes = { item: petObjectShape }
  RenderItem.defaultProps = { item: { _id: '', name: '' } }

  return <List style={styles.container} data={pets} renderItem={RenderItem} />
}

export default PetList

const styles = StyleSheet.create({
  container: { maxHeight: 192 },
})

PetList.propTypes = { pets: arrayOf(petObjectShape) }
PetList.defaultProps = { pets: [] }
