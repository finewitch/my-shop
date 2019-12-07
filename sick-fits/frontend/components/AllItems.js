import React, { Component } from 'react';

import gql from 'graphql-tag';
import Item from './Item'
import {Query} from 'react-apollo';

const ALL_ITEMS_QUERY = gql`
    query ALL_ITEMS_QUERY{
     items{
         id
         title
         price
         description
         image
         largeImage
         negotiable
     } 
    }
`;

class AllItems extends Component {
    render() {
        return (
            <Query query={ALL_ITEMS_QUERY}>
                {({ data, error, loading }) => {
                    console.log(data, 'data')
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error: {error.message}</p>;
                    return (
                    <div className="p_container">{data.items.map(item => <Item item={item} key={item.id} />)}</div>
                    );
                }}
        </Query>
        );
    }
}

export default AllItems;
export { ALL_ITEMS_QUERY };



