import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Card, Modal, Text, Spinner } from '@ui-kitten/components'

const LoadingModal = () => {
  const [visible, setVisible] = React.useState(false)

  return (
    <View style={styles.container}>
      <Modal visible backdropStyle={styles.backdrop}>
        <Card disabled={true}>
          <Spinner size="large" />
        </Card>
      </Modal>
    </View>
  )
}

export default LoadingModal

const styles = StyleSheet.create({
  container: {
    minHeight: 192,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
})
