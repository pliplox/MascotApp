import React from 'react';
import { View } from 'react-native';
import {
  StyleService,
  useStyleSheet,
  Text,
  Icon,
  Button,
} from '@ui-kitten/components';

const OtherAccess = props => {
  const styles = useStyleSheet(themedStyles);

  const googleIcon = props => <Icon {...props} name="google" />;
  const facebookIcon = props => <Icon {...props} name="facebook" />;

  const {
    contentButtun,
    googleStyle,
    facebookStyle,
    label,
    labelStyle,
  } = props;

  return (
    <>
      <Text status="info" style={labelStyle || styles.others}>
        {label || 'Label'}
      </Text>
      <View style={contentButtun || styles.otherAccess}>
        <View style={{ flex: 1 }}>
          <Button
            accessoryLeft={googleIcon}
            style={googleStyle || [styles.btnOtherAcces, { marginEnd: 5 }]}>
            Google
          </Button>
        </View>
        <View style={{ flex: 1 }}>
          <Button
            accessoryLeft={facebookIcon}
            style={facebookStyle || [styles.btnOtherAcces, { marginStart: 5 }]}>
            Facebook
          </Button>
        </View>
      </View>
    </>
  );
};

const themedStyles = StyleService.create({
  others: {
    marginBottom: 5,
    color: 'white',
    marginHorizontal: 50,
  },
  otherAccess: {
    marginHorizontal: 50,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  btnOtherAcces: {
    backgroundColor: 'color-button-100',
    borderRadius: 10,
  },
});

export default OtherAccess;
