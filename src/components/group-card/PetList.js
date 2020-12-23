import React from 'react'
import { List, ListItem, Text } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { shape, oneOfType, string, number, arrayOf } from 'prop-types'
import { useTranslation } from '../../context/LanguageContext'

const petObjectShape = shape({
  _id: oneOfType([string, number]),
  name: string,
})

const PetList = ({ pets }) => {
  const {
    pet: { petList },
  } = useTranslation()

  if (pets?.length === 0) {
    return <Text style={styles.emptyMessage}>{petList.empty}</Text>
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
  emptyMessage: { margin: 15 }
})

PetList.propTypes = { pets: arrayOf(petObjectShape) }
PetList.defaultProps = { pets: [] }
