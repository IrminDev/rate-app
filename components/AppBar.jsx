import { View, StyleSheet, Text, ScrollView, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import { useApolloClient } from '@apollo/client';
import { useAuthStorage } from '../hooks/useAuthStorage';

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
  const { data } = useQuery(ME);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signOut = () => {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
  }

  return <View style={styles.container}>
    <ScrollView horizontal>
      <Link to="/">
          <Text style={styles.text}>Repositories</Text>
      </Link>
      {data && data.me ? <>
        <Pressable onPress={signOut}>
          <Text style={styles.text}>
            Sign out
          </Text>
        </Pressable>
      </> : 
      <Link to="/signin">
        <Text style={styles.text}>Sign in</Text>
      </Link>
      }
    </ScrollView>
  </View>;
};

export default AppBar;