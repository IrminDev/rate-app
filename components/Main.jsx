import Constants from 'expo-constants';
import { Platform, StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SingleRepository from './SingleRepository';
import ReviewForm from './ReviewForm';
import SignUp from './SignUp';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,
        flexGrow: 1,
        flexShrink: 1,
        fontFamily: Platform.select({
            android: 'sans-serif',
            ios: 'roboto',
            default: 'System'
        })
    }
})

const Main = () => {
    return (
        <View style={styles.container}>
            <AppBar />
            <Routes>
                <Route path="/" element={<RepositoryList />} exact />
                <Route path="/signin" element={<SignIn />} exact />
                <Route path="/repository/:id" element={<SingleRepository />} exact />
                <Route path="/signup" element={<SignUp />} exact />
                <Route path="/MyReviews" element={<MyReviews />} exact />
                <Route path="/review" element={<ReviewForm />} exact />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </View>
    );
}

export default Main;