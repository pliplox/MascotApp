import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';

const COLOR = {
  veryDarkViolet: '#390350',
  darkViolet: '#3a0252',
  violet: '#52007c',
};

const Gradient = ({ children, styleContainer, colors }) => {
  const { veryDarkViolet, darkViolet, violet } = COLOR;
  return (
    <LinearGradient
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 0 }}
      colors={
        colors || [
          veryDarkViolet,
          darkViolet,
          violet,
          darkViolet,
          veryDarkViolet,
        ]
      }
      style={styleContainer || ''}>
      {children}
    </LinearGradient>
  );
};

Gradient.propTypes = {
  children: PropTypes.object && PropTypes.node.isRequired,
  styleContainer: PropTypes.object,
  colors: PropTypes.array,
};

export default Gradient;
