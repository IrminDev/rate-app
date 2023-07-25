import { FlatList, View, StyleSheet, Text, Image } from 'react-native';

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

const repositories = [
  {
    id: 'jaredpalmer.formik',
    fullName: 'jaredpalmer/formik',
    description: 'Build forms in React, without the tears',
    language: 'TypeScript',
    forksCount: 1589,
    stargazersCount: 21553,
    ratingAverage: 88,
    reviewCount: 4,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
  },
  {
    id: 'rails.rails',
    fullName: 'rails/rails',
    description: 'Ruby on Rails',
    language: 'Ruby',
    forksCount: 18349,
    stargazersCount: 45377,
    ratingAverage: 100,
    reviewCount: 2,
    ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/4223?v=4',
  },
  {
    id: 'django.django',
    fullName: 'django/django',
    description: 'The Web framework for perfectionists with deadlines.',
    language: 'Python',
    forksCount: 21015,
    stargazersCount: 48496,
    ratingAverage: 73,
    reviewCount: 5,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/27804?v=4',
  },
  {
    id: 'reduxjs.redux',
    fullName: 'reduxjs/redux',
    description: 'Predictable state container for JavaScript apps',
    language: 'TypeScript',
    forksCount: 13902,
    stargazersCount: 52869,
    ratingAverage: 0,
    reviewCount: 0,
    ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/13142323?v=4',
  },
];

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RenderItem item={item} />}
    />
  );
};

const RenderItem = ({ item }) => {
    return(
        <View style={styles.card} >
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