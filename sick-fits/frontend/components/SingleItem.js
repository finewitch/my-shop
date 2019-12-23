import React, { Component } from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import Error from './ErrorMessage';
import Head from 'next/head';

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY( $id: ID! ){
        item( where: {id: $id} ){
            id
            price
            title
            description
            largeImage
            negotiable
        }
    }
`


class SingleItem extends Component {
    render() {
        return (
            <Query 
            query={ SINGLE_ITEM_QUERY } 
            variables={ {id: this.props.id} }>

            {({ error, loading, data}) => {
                if ( error ) return <Error error={error}/>
                if ( loading ) return <p>Loading</p>
                if (!data.item) return <p>No item found for {this.props.id}</p>
                console.log(data)
                return (
                   
                    <div className="p_wrapper">
                         <Head>
                            <title>ArtAttack | {data.item.title}</title>
                        </Head>
                        <img src={data.item.largeImage} className="singleItem-img"/>
                        <div className="singleItem-info c-w">
                        <h2>{data.item.title}</h2>
                        {data.item.price}
                        <p>{data.item.description}</p>
                        </div>
                    </div>

                )
            }}

            </Query>
        );
    }
}

export default SingleItem;
export { SINGLE_ITEM_QUERY };