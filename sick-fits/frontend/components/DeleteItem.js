import React, { Component } from 'react';
import {Mutation, Query} from 'react-apollo';
import gql from 'graphql-tag'; 
import {ALL_ITEMS_QUERY} from './AllItems'

const DELETE_ITEM_MUTATION = gql`
mutation DELETE_ITEM_MUTATION($id: ID!){ 
    deleteItem(id: $id){
        id
    }
}
`

class DeleteItem extends Component {
    update = (cache, payload) => {

        const data = cache.readQuery({query : ALL_ITEMS_QUERY})
        console.log(data,payload, '<--cahce')

        data.items = data.items.filter(item=> item.id != payload.data.deleteItem.id)
         console.log(data)

    }
    render() {
        return (
            <Mutation 
                mutation= { DELETE_ITEM_MUTATION } 
                variables= { {id: this.props.id } }
                update={ this.update}>
                 {(deleteItem, { error }) => (
                     <button onClick={()=>{
                        if(confirm('Are you sure?')){
                            deleteItem() 
                        }
                    }}>delete this</button>
                )}
            </Mutation>
        );
    }
}

export default DeleteItem;