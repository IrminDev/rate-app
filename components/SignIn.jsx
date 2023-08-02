import SignInForm from './SignInForm'
import * as yup from 'yup'
import useSignIn from '../hooks/useSignIn'
import { useNavigate } from 'react-router-native'

const SignIn = () => {
    const [signIn] = useSignIn();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        const { username, password } = values;
        try{
          const data = await signIn({ username, password });
          if(data.authenticate.accessToken){
            navigate('/');
          }
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
      <SignInForm onSubmit={onSubmit} validation={validationSchema} initialValues={{username: '', password: ''}} />
  )
}

export default SignIn