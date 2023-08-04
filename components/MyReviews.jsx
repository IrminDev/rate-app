import { useQuery } from "@apollo/client";
import { View, StyleSheet, Text, FlatList, Pressable, Alert } from "react-native"
import { ME } from "../graphql/queries";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";

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
    },
    rating:{
        width: 50,
        height: 50,
        borderRadius: 25,
        borderColor: '#0366d6',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    button: {
        backgroundColor: '#0366d6',
        padding: 10,
        margin: 10,
        borderRadius: 5,
        alignItems: 'center',
    }
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
    const { data, loading } = useQuery(ME, {
        fetchPolicy: 'cache-and-network',
        variables: { includeReviews: true }
    })

    if (loading) return <Text>Loading...</Text>

    const reviews = data.me.reviews.edges.map(edge => edge.node)

    return (
        <FlatList
            data={reviews}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => <ReviewItem item={item} />}
        />
    )
}

const ReviewItem = ({ item }) => {
    const navigate = useNavigate()
    const [mutate] = useMutation(DELETE_REVIEW)

    const viewRepository = () => {
        navigate(`/repository/${item.repositoryId}`)
    }

    const deleteReview = async () => {
        try {
            Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Delete',
                    onPress: async () => {
                        await mutate({ variables: { id: item.id } })
                    }
                }
            ])
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <View style={styles.card}>
            <View style={{flexDirection: 'row'}}>
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.rating}>
                        <Text style={{color: '#0366d6', fontSize: 20, fontWeight: 'bold'}}>{item.rating}</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'column'}}>
                    <Text style={{fontWeight: 'bold'}}>{item.repositoryId}</Text>
                    <Text>{item.createdAt}</Text>
                    <Text>{item.text}</Text>
                </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <Pressable onPress={viewRepository} style={styles.button}>
                    <Text style={{color: 'white'}}>View repository</Text>
                </Pressable>
                <Pressable onPress={deleteReview} style={[styles.button, {backgroundColor: 'red'}]}>
                    <Text style={{color: 'white'}}>Delete review</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default MyReviews