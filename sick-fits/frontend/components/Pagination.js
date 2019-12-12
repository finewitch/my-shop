import React from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import { perPage } from '../config'
import { ApolloLink } from 'apollo-link';
import Link from 'next/link';

const PAGINATION_QUERY = gql`
    query PAGINATION_QUERY{
        itemsConnection{
            aggregate{
                count
            }
        }
    }
`

const Pagination = (props) => {
    return (
        <div className="pagination">
            <Query query={ PAGINATION_QUERY }>

            {({data, loading, error}) => {
                if(loading) return <p>Loading...</p>
                const count = data.itemsConnection.aggregate.count
                const pages = Math.ceil(count / perPage)
                const page = props.page;
                return(
                    <div>

                        <Link
                        prefetch 
                        href={{
                            pathname:'items',
                            query : { page: page - 1 }
                        }}>
                            <a className="arrows" aria-disabled={  page <= 1 }>◀</a>
                        </Link>

                            <p className="pagination-page">page {props.page} of  { pages }</p> 
                            <p className="pagination-pagetotal"> { count } total items</p>

                        <Link href={{
                            pathname:'items',
                            query : { page: page + 1 }
                        }}>
                            <a className="arrows" aria-disabled={  page >= pages }>▶</a>
                        </Link>
                    </div>
                )
            }
            
            }
            </Query>
        </div>
    );
};

export default Pagination;