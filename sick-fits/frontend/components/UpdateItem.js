import React, { Component } from 'react';
import {Mutation, Query} from 'react-apollo';
import formatMoney from '../lib/formatMoney';
import gql from 'graphql-tag'; 
import Error from './ErrorMessage'
import { de } from 'date-fns/locale';

import ImageGallery from './ImageGallery'

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($id: ID!){ 
        item(where:{id: $id}){
            id
            title
            description
            price
            negotiable
        }
    }
`

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $price: Int
    $negotiable: Boolean
    $description:String
    ){
    updateItem(
        id: $id
        title: $title
        price: $price 
        negotiable: $negotiable
        description: $description
    ){ 
        id
        title
        description
        price
    }  
  }
`

class UpdateItem extends Component {
    state = {}
    handleChange = e =>{
        console.log(e.target.value)
        const {name, type, value} = e.target;
        console.log({name, type, value}, '<---');
        const val = type === 'number' ? parseFloat(value) : value;

        this.setState({
            [ name ] : val
        })
    }

    updateItem = async (e, mutationfunction) =>{
        e.preventDefault();
        console.log('updating item...');
        console.log(this.state)
        const res = await mutationfunction({
            variables:{
                id: this.props.id,
                ...this.state,
            }
        })
        console.log('updateed!!!');
}

    render() {
        return (

            <Query query={SINGLE_ITEM_QUERY} variables={{id: this.props.id}}>
                {({data, loading})=>{

                    if (loading)  return <p>Loading ...</p>
                    if(!data.item) return <p>No item found for id: {this.props.id}</p>

                    return (
                    <Mutation mutation = { UPDATE_ITEM_MUTATION } variables = {this.state}>
                        {(mutationfunction, {loading, error}) =>(  
                            
                            <form method="post" onSubmit={(e)=>{
                                this.updateItem(e, mutationfunction)
                            }}>

                            <Error error={error}/>

                            <fieldset disabled={loading} aria-busy={loading}>

                            <div className="row gtr-uniform">
                                <div className="col-12">
                                    <input 
                                        type="text" 
                                        name="title" 
                                        id="title" 
                                        defaultValue={data.item.title} 
                                        placeholder="Title" 
                                        required 
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className="col-12">

                                    <input 
                                        type="number" 
                                        name="price" 
                                        id="price" 
                                        defaultValue={data.item.price} 
                                        placeholder="Price" 
                                        required 
                                        onChange={this.handleChange}/>
                                </div>

                                <div className="col-12">
                                    <textarea 
                                    type="text" 
                                    name="description" 
                                    id="desc" 
                                    defaultValue={data.item.description} 
                                    // defaultChecked={data.item.negotiable ? true: false} 
                                    placeholder="Enter a description" 
                                    required 
                                    onChange={this.handleChange}
                                    />
                                </div>

                                <div className="col-4 col-12-small">
                                    <input 
                                    type="radio" 
                                    id="nodis"
                                    name="negotiable" 
                                    value={false} 
                                    defaultChecked={data.item.negotiable ? false : true}
                                    onChange={this.handleChange}
                                    />
                                    <label htmlFor="nodis">non negotiable</label>
                                </div>

                                <div className="col-4 col-12-small">
                                    <input 
                                    type="radio" 
                                    id="dis" 
                                    defaultChecked={data.item.negotiable ? true: false}
                                    value={true} 
                                    name="negotiable" 
                                    onChange={this.handleChange}
                                    />
                                    <label htmlFor="dis">negotiable</label>
                                </div>

                                <div className="col-12">

                                    <ul className="actions">
                                        <button type="submit" className="primary">Sav{loading ? 'ing' : 'e'} changes</button>
                                        {/* <button type="reset" className="secondary" onClick={()=>this.handleReset()}>Reset</button> */}
                                    </ul>
                                </div>

                            </div>
                        </fieldset>
                    </form>
                    )}
                </Mutation>
                ) 
            }}
        </Query>
        );
    }
}

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };