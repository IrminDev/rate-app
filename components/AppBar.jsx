import { View, StyleSheet, Text } from 'react-native';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#24292e',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10
  }
});

const AppBar = () => {
  return <View style={styles.container}>
    <Link to="/">
        <Text style={styles.text}>Repositories</Text>
    </Link>
    <Link to="/signin">
        <Text style={styles.text}>Sign in</Text>
    </Link>
  </View>;
};

export default AppBar;