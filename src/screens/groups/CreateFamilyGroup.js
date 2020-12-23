import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Input, Spinner, Text } from '@ui-kitten/components';
import mascotapi from '../../api/mascotappi';
import { useTranslation } from '../../context/LanguageContext';
import { mutate } from 'swr';
import { queryKeys } from '../../utils/constants'

const CreateFamilyGroup = ({ navigation }) => {
  const [groupName, setGroupName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { actions, createGroup, messages } = useTranslation();

  const handleCreateGroup = async () => {
    setLoading(true);
    try {
      const response = await mascotapi.post('family/group', {
        name: groupName,
      });

      if (response.status === 201) {
        await mutate(queryKeys.groupList) // update group list
        navigation.navigate('Groups');
      } else {
        setError(messages.errors.standard);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Input
        size="large"
        style={styles.nameInput}
        value={groupName}
        disabled={loading}
        label={createGroup.groupName}
        placeholder={createGroup.placeholders.typeGroupName}
        onChangeText={nextValue => setGroupName(nextValue)}
      />
      <Text>{error}</Text>
      <Button
        disabled={loading}
        onPress={handleCreateGroup}
        style={styles.button}
        accessoryRight={
          loading && (() => <Spinner size="small" status="basic" />)
        }>
        {actions.create}
      </Button>
    </View>
  );
};

export default CreateFamilyGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameInput: { paddingVertical: 15 },
  button: { position: 'absolute', bottom: '5%', width: '100%' },
});
