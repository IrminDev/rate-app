import SignInForm from './SignInForm'
import { Formik } from 'formik'
import { View } from 'react-native'
import * as yup from 'yup'

const SignIn = () => {
    const onSubmit = (values) => {
        console.log(values)
    }

    const validationSchema = yup.object().shape({
        username: yup
          .string()
          .min(3, 'Username must be at least 3 characters')
          .required('Username is required'),
        password: yup
          .number()
          .min(4, 'password must be at least 4 characters')
          .required('password is required'),
      });
  
    return (
    <View>
        <Formik initialValues={{username: '', password: ''}} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({handleSubmit}) => <SignInForm onSubmit={handleSubmit} />}
        </Formik>
    </View>
  )
}

export default SignIn