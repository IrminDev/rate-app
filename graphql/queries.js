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

export const GET_HIGHEST_REPOSITORIES = gql`
    query {
        repositories(orderBy: RATING_AVERAGE, orderDirection: DESC) {
            edges {
                node {
                    ...RepositoryDetails
                }
            }
        }
    }
    ${REPO_DETAILS}
`

export const GET_LOWEST_REPOSITORIES = gql`
    query {
        repositories(orderBy: RATING_AVERAGE, orderDirection: ASC) {
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
    query getCurrentUser($includeReviews: Boolean = false) {
        me {
            id
            username
            reviews @include(if: $includeReviews) {
                edges {
                    node {
                        id
                        text
                        rating
                        createdAt
                        repositoryId
                    }
                }
            } 
        }
    }
`

export const GET_REPOSITORY = gql`
    query getRepository($id: ID!) {
        repository(id: $id) {
            ...RepositoryDetails
            reviews {
                edges {
                    node {
                        id
                        text
                        rating
                        createdAt
                        user {
                            id
                            username
                        }
                    }
                }
            }
        }
    }
    ${REPO_DETAILS}
`