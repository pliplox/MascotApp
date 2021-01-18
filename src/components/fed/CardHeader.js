import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import moment from 'moment'
import { string, instanceOf } from 'prop-types'

const CardHeader = ({ name, birthdate }) => (
  <View style={styles.header}>
    <Text>
      {`${name}, birthdate: ${moment.utc(birthdate).format('DD/MM/YYYY')}`}
    </Text>
  </View>
)

export default CardHeader

const styles = StyleSheet.create({
  header: { padding: 15 },
})

CardHeader.propTypes = {
  name: string.isRequired,
  birthdate: instanceOf(Date).isRequired,
}
