import React from 'react';
import { number } from 'prop-types';
import { View, Text } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useStyleSheet, StyleService } from '@ui-kitten/components';

const ViewPagerDots = ({ size, selectedIndex }) => {
  const styles = useStyleSheet(style);
  let dots = [];
  for (let i = 0; i < size; i++) {
    const name = selectedIndex === i ? 'circle' : 'circle-o';
    dots.push(
      <FontAwesomeIcon name={name} size={20} key={i} style={styles.dot} />,
    );
  }

  return <>{dots}</>;
};

export default ViewPagerDots;

const style = StyleService.create({
  dot: { padding: 1, color: 'color-neutral-light' },
});

ViewPagerDots.defaultProps = {
  size: 1,
  selectedIndex: 0,
};

ViewPagerDots.propTypes = {
  size: number,
  selectedIndex: number,
};
