import SignInForm from './SignInForm'
import { Formik } from 'formik'
import { View } from 'react-native'

const SignIn = () => {
    const onSubmit = (values) => {
        console.log(values)
    }
  
    return (
    <View>
        <Formik initialValues={{username: '', password: ''}} onSubmit={onSubmit}>
            {({handleSubmit}) => <SignInForm onSubmit={handleSubmit} />}
        </Formik>
    </View>
  )
}

export default SignIn