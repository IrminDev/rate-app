import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import * as Linking from 'expo-linking';

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

const RepositoryInfo = ({ repository }) => {
    return (
        <View testID='repositoryItem' style={styles.card} >
          <View style={{flexDirection: 'row'}}>
              <Image source={{uri: repository.ownerAvatarUrl}} style={styles.image} />
              <View style={{width: '100%'}}>
                  <Text style={{marginLeft: 10, fontWeight: 'bold'}} >{repository.fullName}</Text>
                  <Text style={{marginLeft: 10, marginTop: 5}} >{repository.description}</Text>
                  <Text style={{marginLeft: 10, marginTop: 5, backgroundColor: '#0366d6', color: 'white', width: 75, textAlign: 'center', borderRadius: 5}} >{repository.language}</Text>
              </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 10}}>
              <View style={{alignItems: 'center'}}>
                  <Text style={{fontWeight: 'bold'}} >{Math.round(repository.stargazersCount*0.001)} K</Text>
                  <Text>Stars</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                  <Text style={{fontWeight: 'bold'}} >{Math.round(repository.forksCount*0.001)} K</Text>
                  <Text>Forks</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                  <Text style={{fontWeight: 'bold'}} >{repository.reviewCount}</Text>
                  <Text>Reviews</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                  <Text style={{fontWeight: 'bold'}} >{repository.ratingAverage} </Text>
                  <Text>Ratings</Text>
              </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 10}}>
                <View style={{backgroundColor: '#0366d6', width: '90%', borderRadius: 5}}>
                    <Text style={{color: 'white', textAlign: 'center', padding: 10}} onPress={() => Linking.openURL(repository.url)} >Open in GitHub</Text>
                </View>
          </View>
        </View>
    )
}

const ReviewItem = ({ review }) => {
    return (
        <View testID='reviewItem' style={styles.card} >
            <View style={{flexDirection: 'row'}}>
                <Image source={{uri: review.user?.avatarUrl}} style={styles.image} />
                <View style={{width: '100%'}}>
                    <Text style={{marginLeft: 10, fontWeight: 'bold'}} >{review.user?.username}</Text>
                    <Text style={{marginLeft: 10, marginTop: 5}} >{review.createdAt}</Text>
                    <Text style={{marginLeft: 10, marginTop: 5}} >{review.text}</Text>
                </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 10}}>
                <View style={{alignItems: 'center'}}>
                    <Text style={{fontWeight: 'bold'}} >{review.rating}</Text>
                    <Text>Rating</Text>
                </View>
            </View>
        </View>
    )
}

const SingleRepository = () => {
    const {id} = useParams()
    const {data, loading} = useQuery(GET_REPOSITORY, {
        variables: {id: id},
        fetchPolicy: 'cache-and-network'
    })

    if(loading){
        return <Text>Loading...</Text>
    }

    const item = data.repository

    const reviews = item.reviews.edges.map(edge => edge.node)

    return (
        <FlatList
            data={reviews}
            renderItem={({item}) => <ReviewItem review={item} />}
            keyExtractor={({id}) => id}
            ListHeaderComponent={() => <RepositoryInfo repository={item} />}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
    )
}

export default SingleRepository