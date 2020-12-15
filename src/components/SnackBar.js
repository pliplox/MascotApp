import Snackbar from 'react-native-snackbar';
import PropTypes from 'prop-types';

export const ShowSnackBar = ({ message, backgroundColor }) => {
  Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_SHORT,
    backgroundColor: backgroundColor,
  });
};

ShowSnackBar.propTypes = {
  message: PropTypes.string,
  backgroundColor: PropTypes.string,
};

export const dismissSnackBar = () => {
  Snackbar.dismiss();
};
