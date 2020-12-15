import React from 'react';
import { View } from 'react-native';
import {
  StyleService,
  useStyleSheet,
  Text,
  Icon,
  Button,
} from '@ui-kitten/components';
import PropTypes from 'prop-types';

const OtherAccess = props => {
  const styles = useStyleSheet(themedStyles);

  const googleIcon = props => <Icon {...props} name="google" />;
  const facebookIcon = props => <Icon {...props} name="facebook" />;

  const {
    container,
    contentButtun,
    googleStyle,
    facebookStyle,
    label,
    labelStyle,
  } = props;

  return (
    <View style={container || styles.container}>
      <Text status="info" style={labelStyle || styles.others}>
        {label}
      </Text>
      <View style={contentButtun || styles.otherAccess}>
        <View style={styles.btnContainer}>
          <Button
            accessoryLeft={googleIcon}
            style={googleStyle || [styles.btnOtherAcces, { marginEnd: 5 }]}>
            Google
          </Button>
        </View>
        <View style={styles.btnContainer}>
          <Button
            accessoryLeft={facebookIcon}
            style={facebookStyle || [styles.btnOtherAcces, { marginStart: 5 }]}>
            Facebook
          </Button>
        </View>
      </View>
    </View>
  );
};

const themedStyles = StyleService.create({
  container: {
    marginTop: 20,
  },
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
  btnContainer: {
    flex: 1,
  },
});

OtherAccess.propTypes = {
  container: PropTypes.object,
  contentButtun: PropTypes.object,
  googleStyle: PropTypes.object,
  facebookStyle: PropTypes.object,
  label: PropTypes.string,
  labelStyle: PropTypes.object,
};

export default OtherAccess;
