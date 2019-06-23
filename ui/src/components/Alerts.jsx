import Alert from 'react-s-alert';

const Alerts = {
  success(msg) {
    Alert.info(msg, {
      position: 'top-right',
      effect: 'slide',
      timeout: 5000,
    });
  },
  warning(msg) {
    Alert.error(msg, {
      position: 'top-right',
      effect: 'slide',
      timeout: 5000,
    });
  },
};

export default Alerts;
