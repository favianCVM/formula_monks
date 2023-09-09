import Toast from 'react-native-toast-message';

export const displayErrorMessage = (
  errorMessage?: string,
  message = 'Please try again',
) => {
  errorMessage !== 'Aborted' &&
    Toast.show({
      type: 'error',
      text1: 'Something went wrong',
      text2: message,
      position: 'bottom',
    });
};
