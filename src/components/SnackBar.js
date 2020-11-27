import Snackbar from 'react-native-snackbar';

export const ShowSnackBar = props => {
  const { message, backgroundColor } = props;
  Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_SHORT,
    backgroundColor: backgroundColor,
  });
};

export const SnackBarDismiss = () => {
  Snackbar.dismiss();
};
