import { View, Text, Pressable, StyleSheet } from 'react-native'
import FormikTextInput from './FormikTextInput'

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

const SignInForm = ({onSubmit}) => {
  return (
    <View>
        <Text style={styles.text}>Sign in</Text>
        <FormikTextInput style={styles.input} name="username" placeholder="Username" />
        <FormikTextInput style={styles.input}  name="password" placeholder="Password" secureTextEntry />
        <Pressable onPress={onSubmit}>
            <Text style={styles.button}>Sign in</Text>
        </Pressable>
    </View>
  )
}

export default SignInForm