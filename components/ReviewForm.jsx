import { View, Pressable, StyleSheet, Text } from "react-native"
import FormikTextInput from "./FormikTextInput"
import { Formik } from "formik"
import * as yup from 'yup'
import { useMutation } from "@apollo/client"
import { CREATE_REVIEW } from "../graphql/mutations"

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#24292e',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        borderRadius: 5
    },
    button: {
        backgroundColor: '#0366d6',
        padding: 10,
        margin: 10,
        borderRadius: 5,
        width: '20%',
        color: 'white',
        textAlign: 'center'
    }
})

const ReviewFormContainer = ({ onSubmit }) => {
  return (
    <View>
        <FormikTextInput style={styles.input} name="ownerName" placeholder="Repository owner name" />
        <FormikTextInput style={styles.input}  name="repositoryName" placeholder="Repository name" />
        <FormikTextInput style={styles.input}  name="rating" placeholder="Rating between 0 and 100" />
        <FormikTextInput style={styles.input}  name="text" placeholder="Review" />
        <Pressable onPress={onSubmit}>
            <Text style={styles.button} testID="signin">Create a review</Text>
        </Pressable>
    </View>
  )
}

const FormikReviewForm = ({ onSubmit, validation, initialValues }) => {
    return (
        <View>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validation}>
                {({handleSubmit}) => <ReviewFormContainer onSubmit={handleSubmit} />}
            </Formik>
        </View>
    )
}

const ReviewForm = () => {
    const [mutate] = useMutation(CREATE_REVIEW);

    const onSubmit = async (values) => {
        const { ownerName, repositoryName, rating, text } = values;
        try{
          const data = await mutate({ variables: { ownerName, repositoryName, rating, text } });
          console.log(data);
        } catch(e) {
          console.log(e);
        }
    }

    const validationSchema = yup.object().shape({
        ownerName: yup
            .string()
            .required('Repository owner name is required'),
        repositoryName: yup
            .string()
            .required('Repository name is required'),
        rating: yup
            .number()
            .required('Rating is required')
            .min(0, 'Rating must be between 0 and 100')
            .max(100, 'Rating must be between 0 and 100'),
    });

    const initialValues = {
        ownerName: '',
        repositoryName: '',
        rating: '',
    }

    return (
        <FormikReviewForm onSubmit={onSubmit} validation={validationSchema} initialValues={initialValues} />
    )
}

export default ReviewForm