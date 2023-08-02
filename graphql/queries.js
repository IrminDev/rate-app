import { gql } from '@apollo/client';
const REPO_DETAILS = require('./fragments').REPO_DETAILS

export const GET_REPOSITORIES = gql`
    query {
        repositories {
            edges {
                node {
                    ...RepositoryDetails
                }
            }
        }
    }
    ${REPO_DETAILS}
`

export const SIGN_IN = gql`
    mutation authenticate($username: String!, $password: String!) {
        authenticate(credentials: { username: $username, password: $password }) {
            accessToken
        }
    }
`

export const ME = gql`
    {
        me {
            id
            username
        }
    }
`

export const GET_REPOSITORY = gql`
    query getRepository($id: ID!) {
        repository(id: $id) {
            ...RepositoryDetails
        }
    }
    ${REPO_DETAILS}
`