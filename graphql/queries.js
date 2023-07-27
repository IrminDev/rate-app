import { gql } from '@apollo/client';
const REPO_DETAILS = require('./fragments').REPO_DETAILS

export const GET_REPOSITORIES = gql`
    query {
        repositories {
            ...RepositoryDetails
        }
    }
    ${REPO_DETAILS}
`