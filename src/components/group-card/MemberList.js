import React from 'react'
import { Icon, List, ListItem } from '@ui-kitten/components'
// import ButtonAccesory from './ButtonAccessory';
import { StyleSheet } from 'react-native'
import { arrayOf, oneOfType, shape, string, number } from 'prop-types'

const memberObjectShape = shape({
  _id: oneOfType([string, number]),
  name: string,
})

const MemberList = ({ members }) => {
  const renderItemIcon = props => (
    <Icon {...props} name="person" style={styles.memberIcon} />
  )

  const RenderItem = ({ item }) => (
    <ListItem
      title={item.name}
      accessoryLeft={renderItemIcon}
      // TODO: uncomment this when edit and or remove features (edit and/or remove) are ready
      // accessoryRight={ButtonAccesory}
    />
  )
  RenderItem.propTypes = { item: memberObjectShape }
  RenderItem.defaultProps = { item: { name: '' } }

  return (
    <List style={styles.container} data={members} renderItem={RenderItem} />
  )
}

export default MemberList

const styles = StyleSheet.create({
  container: { maxHeight: 192 },
  memberIcon: {
    width: 27,
    height: 27,
    tintColor: '#000',
    marginHorizontal: 0,
  },
})

MemberList.propTypes = { members: arrayOf(memberObjectShape) }
MemberList.defaultProps = { members: [] }
