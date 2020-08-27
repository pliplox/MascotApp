import React, { useState } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import mascotappi from '../../api/mascotappi';
import useSWR from 'swr';
import {
  Spinner,
  Button,
  ViewPager,
  Divider,
  useStyleSheet,
  StyleService,
  Icon,
} from '@ui-kitten/components';
import { useTranslation } from '../../context/LanguageContext';
import { GroupCard } from '../../components/group-card';
import ViewPagerDots from '../../components/ViewPagerDots';

const fetchGroups = async () => {
  try {
    const response = await mascotappi.get('family/groups');
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

const GroupList = ({ navigation }) => {
  const styles = useStyleSheet(themedStyles);

  // TODO: discuss or modify backend endpoint to return groups, its members and pets
  const { data: groupsData, error: groupError } = useSWR('family/groups', () =>
    fetchGroups(),
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const { groupList, placeholders } = useTranslation();

  if (!groupsData) {
    return (
      <View style={styles.loadingContainer}>
        <Spinner size="large" />
        <Text>{placeholders.loadingDots}</Text>
      </View>
    );
  }

  if (groupError) {
    return (
      <>
        <Text>There was an error trying to get the groups.</Text>
        <Text>{groupError}</Text>
      </>
    );
  }

  const groupDataLength = groupsData?.length;
  return (
    <View>
      {groupDataLength === 0 ? (
        <Text>
          There is no groups, you might want to create one pressing the button
          below
        </Text>
      ) : (
        <SafeAreaView>
          <ViewPager
            selectedIndex={selectedIndex}
            onSelect={index => setSelectedIndex(index)}>
            {groupsData.map(groupData => (
              <GroupCard key={groupData.id} name={groupData.name} />
            ))}
          </ViewPager>
          <View style={styles.dots}>
            <ViewPagerDots
              size={groupDataLength}
              selectedIndex={selectedIndex}
            />
          </View>
          <Divider />
          <Button
            onPress={() => navigation.navigate('CreateGroup')}
            accessoryRight={createGroupIconProps => (
              <Icon {...createGroupIconProps} name="plus-circle-outline" />
            )}
            style={themedStyles.createGroupButton}>
            {groupList.create}
          </Button>
        </SafeAreaView>
      )}
    </View>
  );
};

export default GroupList;

const themedStyles = StyleService.create({
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  dots: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingBottom: 3,
  },
  createGroupButton: { marginHorizontal: 25 },
});
