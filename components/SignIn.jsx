import SignInForm from './SignInForm'
import { Formik } from 'formik'
import { View } from 'react-native'
import * as yup from 'yup'
import useSignIn from '../hooks/useSignIn'

const SignIn = () => {
    const [signIn] = useSignIn();

    const onSubmit = async (values) => {
        const { username, password } = values;
        try{
          const data = await signIn({ username, password });
          console.log(data);
        } catch(e) {
          console.log(e);
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