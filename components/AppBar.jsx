import { View, StyleSheet,Pressable, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#24292e',
    flexDirection: 'column',
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
    <Pressable>
        <Text style={styles.text}>Repositories</Text>
    </Pressable>
  </View>;
};

export default AppBar;