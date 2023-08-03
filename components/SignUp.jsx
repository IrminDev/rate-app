import { View, StyleSheet, Pressable, Text } from 'react-native'
import { Formik } from 'formik'
import FormikTextInput from './FormikTextInput'
import * as yup from 'yup'
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../graphql/mutations'
import { useNavigate } from 'react-router-native'

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

const SignUpContainer = ({ onSubmit }) => {
    return (
        <View>
            <FormikTextInput style={styles.input} name="username" placeholder="Username" />
            <FormikTextInput style={styles.input}  name="password" placeholder="Password" secureTextEntry />
            <FormikTextInput style={styles.input}  name="passwordConfirmation" placeholder="Password confirmation" secureTextEntry />
            <Pressable onPress={onSubmit}>
                <Text style={styles.button} testID="signin">Sign in</Text>
            </Pressable>
        </View>
    )
}

const FormikSignup = ({ onSubmit, validation, initialValues }) => {
    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validation}>
            {({handleSubmit}) => <SignUpContainer onSubmit={handleSubmit} />}
        </Formik>
    )
}

const SignUp = () => {
    const navigate = useNavigate()
    const [mutate] = useMutation(CREATE_USER)

    const onSubmit = async (values) => {
        const { username, password } = values
        try {
            const { data } = await mutate({ variables: { username, password } })
            navigate('/signin')
            console.log(data)
        } catch (e) {
            console.log(e)
        }
    }

    const validationSchema = yup.object().shape({
        username: yup
            .string()
            .min(3, 'Username must be at least 3 characters')
            .required('Username is required'),
        password: yup
            .string()
            .min(4, 'password must be at least 4 characters')
            .required('password is required'),
        passwordConfirmation: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('Password confirmation is required')
    })

    const initialValues = {
        username: '',
        password: '',
        passwordConfirmation: ''
    }


    return (
        <FormikSignup onSubmit={onSubmit} validation={validationSchema} initialValues={initialValues} />
    )
}

export default SignUp