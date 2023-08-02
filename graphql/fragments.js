import { gql } from '@apollo/client';

export const REPO_DETAILS = gql`
    fragment RepositoryDetails on Repository {
        id
        fullName
        description
        language
        forksCount
        stargazersCount
        ratingAverage
        reviewCount
        ownerAvatarUrl
        url
    }
`