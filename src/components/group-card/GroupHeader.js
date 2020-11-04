import React from 'react';
import { View } from 'react-native';
import {
  Avatar,
  Text,
  useStyleSheet,
  StyleService,
} from '@ui-kitten/components';
import { people } from '../../images';

const GroupHeader = ({ name, groupImageUrl }) => {
  const styles = useStyleSheet(themedStyles);

  const source = groupImageUrl || people;

  return (
    <View style={styles.container}>
      <Avatar
        size="giant"
        source={source}
        style={!groupImageUrl && styles.avatar}
      />
      <Text style={styles.groupName} category="h2">
        {name}
      </Text>
    </View>
  );
};

export default GroupHeader;

const themedStyles = StyleService.create({
  container: {
    flexDirection: 'row',
    padding: 15,
  },
  avatar: { borderColor: 'color-neutral-light', borderWidth: 1 },
  groupName: { paddingTop: 3, paddingLeft: 15 },
});
