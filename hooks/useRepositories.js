import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES, GET_HIGHEST_REPOSITORIES, GET_LOWEST_REPOSITORIES} from '../graphql/queries';

const useRepositories = ( query ) => {
    let queryTo = GET_REPOSITORIES;
    if(query === 'highest'){
        queryTo = GET_HIGHEST_REPOSITORIES
    } else {
        if(query === 'lowest'){
        queryTo = GET_LOWEST_REPOSITORIES
        }
    }

    const { data, error, loading } = useQuery(queryTo, {
        fetchPolicy: 'cache-and-network',
    });
    
    return { repositories: data?.repositories, error, loading };
}

export default useRepositories;