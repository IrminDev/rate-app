import { FlatList, View, StyleSheet, Text, Image } from 'react-native';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  image: {
    width: 50,
    height: 50,
  },
  card:{
    backgroundColor: 'white',
    padding: 10,
    width: '100%',
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories } = useRepositories();

  return <RepositoryListContainer repositories={repositories} />;
};

export const RepositoryListContainer = ({ repositories }) => {
  const repoNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repoNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
    />
  )
};

const RepositoryItem = ({ item }) => {
    return(
        <View testID='repositoryItem' style={styles.card} >
            <View style={{flexDirection: 'row'}}>
                <Image source={{uri: item.ownerAvatarUrl}} style={styles.image} />
                <View style={{width: '100%'}}>
                    <Text style={{marginLeft: 10, fontWeight: 'bold'}} >{item.fullName}</Text>
                    <Text style={{marginLeft: 10, marginTop: 5}} >{item.description}</Text>
                    <Text style={{marginLeft: 10, marginTop: 5, backgroundColor: '#0366d6', color: 'white', width: 75, textAlign: 'center', borderRadius: 5}} >{item.language}</Text>
                </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 10}}>
                <View style={{alignItems: 'center'}}>
                    <Text style={{fontWeight: 'bold'}} >{Math.round(item.stargazersCount*0.001)} K</Text>
                    <Text>Stars</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                    <Text style={{fontWeight: 'bold'}} >{Math.round(item.forksCount*0.001)} K</Text>
                    <Text>Forks</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                    <Text style={{fontWeight: 'bold'}} >{item.reviewCount}</Text>
                    <Text>Reviews</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                    <Text style={{fontWeight: 'bold'}} >{item.ratingAverage} </Text>
                    <Text>Ratings</Text>
                </View>
            </View>
        </View>
    )
}

export default RepositoryList;