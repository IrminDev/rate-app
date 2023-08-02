import { render, fireEvent, screen, waitFor  } from '@testing-library/react-native';
import { RepositoryListContainer } from '../components/RepositoryList';
import SignInForm from '../components/SignInForm';
import * as yup from 'yup'
import { act } from 'react-test-renderer';

describe('RepositoryList', () => {
    describe('RepositoryListContainer', () => {
      it('renders repository information correctly', () => {
        const repositories = {
          totalCount: 8,
          pageInfo: {
            hasNextPage: true,
            endCursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
            startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          edges: [
            {
              node: {
                id: 'jaredpalmer.formik',
                fullName: 'jaredpalmer/formik',
                description: 'Build forms in React, without the tears',
                language: 'TypeScript',
                forksCount: 1619,
                stargazersCount: 21856,
                ratingAverage: 88,
                reviewCount: 3,
                ownerAvatarUrl:
                  'https://avatars2.githubusercontent.com/u/4060187?v=4',
              },
              cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
            },
            {
              node: {
                id: 'async-library.react-async',
                fullName: 'async-library/react-async',
                description: 'Flexible promise-based React data loader',
                language: 'JavaScript',
                forksCount: 69,
                stargazersCount: 1760,
                ratingAverage: 72,
                reviewCount: 3,
                ownerAvatarUrl:
                  'https://avatars1.githubusercontent.com/u/54310907?v=4',
              },
              cursor:
                'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
            },
          ],
        };

        render(<RepositoryListContainer repositories={repositories} />);
        const repositoryNodes = screen.getAllByTestId('repositoryItem');
        expect(repositoryNodes[0]).toHaveTextContent('jaredpalmer/formik');
      });
    });
});

describe('SignIn', () => {
    describe('SignInContainer', () => {
        it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
            const onSubmit = jest.fn();
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

            const initialValues = {
                username: '',
                password: '',
            };
            
            render(<SignInForm onSubmit={onSubmit} validation={validationSchema} initialValues={initialValues} />);
            
            fireEvent.changeText(screen.getByPlaceholderText('Username'), 'kalle');
            fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password');
            fireEvent.press(screen.getByTestId('signin'));

            await waitFor(() => {
                expect(onSubmit).toHaveBeenCalledTimes(1);
            });
        });
    });
});