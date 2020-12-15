import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { house, paws } from '../../images';
import PropTypes from 'prop-types';

const FooterImages = ({ houseStyle, pawsStyle }) => {
  return (
    <>
      <Image
        testID="house-png"
        source={house}
        style={houseStyle || styles.house}
      />
      <Image testID="paws-png" source={paws} style={pawsStyle || styles.paws} />
    </>
  );
};

const styles = StyleSheet.create({
  house: {
    width: 85,
    height: 80,
    resizeMode: 'stretch',
    marginTop: 10,
    alignSelf: 'center',
  },
  paws: {
    width: 130,
    height: 50,
    resizeMode: 'stretch',
    marginBottom: 10,
    marginHorizontal: 30,
  },
});

FooterImages.prototype = {
  houseStyle: PropTypes.object,
  pawsStyle: PropTypes.object,
};

export default FooterImages;
