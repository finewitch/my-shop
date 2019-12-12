import React, { Component } from 'react';

import gql from 'graphql-tag';
import Item from './Item'
import {Query} from 'react-apollo';
import Pagination from './Pagination';
import { perPage } from '../config';

const ALL_ITEMS_QUERY = gql`
    query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${ perPage }){
     items(skip: $skip, first: $first){
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
            <div>
                <Pagination page={this.props.page}/>

                    <Query 
                    query={ALL_ITEMS_QUERY} 
                    variables={{
                        skip: this.props.page * perPage - perPage,
                        // first:perPage
                    }}>
                        {({ data, error, loading }) => {
                            console.log(data, 'data')
                            let indexNum = perPage * this.props.page - perPage;
                            console.log(indexNum, '<---')
                            if (loading) return <p>Loading...</p>;
                            if (error) return <p>Error: {error.message}</p>;
                            return (
                            <div>{data.items.map((item, index) => <Item item={item} key={item.id} index={index + indexNum}/>)}</div>
                            );
                        }}
                    </Query>

            <Pagination page={this.props.page}/>
            
        </div>
        );
    }
}

export default AllItems;
export { ALL_ITEMS_QUERY };



