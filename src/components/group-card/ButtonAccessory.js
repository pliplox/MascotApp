import React from 'react';
import { Button, Icon } from '@ui-kitten/components';
import { View, StyleSheet } from 'react-native';

// currently this component is not being used, therefore
// translation will not be used here until this component is used
const ButtonAccesory = () => {
  return (
    <View style={styles.container}>
      <Button
        size="small"
        style={styles.button}
        accessoryRight={editIconProps => (
          <Icon name="edit-outline" {...editIconProps} />
        )}>
        EDIT
      </Button>
      <Button
        size="small"
        style={styles.button}
        accessoryRight={deleteIconProps => (
          <Icon name="trash-2" {...deleteIconProps} />
        )}>
        REMOVE
      </Button>
    </View>
  );
};

export default ButtonAccesory;

const styles = StyleSheet.create({
  container: { flexDirection: 'column', justifyContent: 'space-between' },
  button: { padding: 5 },
});
