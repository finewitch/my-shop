import React, { Component } from 'react';
import {Mutation} from 'react-apollo';
import formatMoney from '../lib/formatMoney';
import gql from 'graphql-tag'; 
import Error from './ErrorMessage'
import { de } from 'date-fns/locale';

import ImageGallery from './ImageGallery'

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $image:String
    $largeImage:String
    $price: Int!
    $negotiable: Boolean!
    $description:String
    ){
    createItem(
        title: $title
        image: $image
        largeImage: $largeImage
        price: $price 
        negotiable: $negotiable
        description: $description
    ){ 
        id
    }  
  }
`

class CreateItem extends Component {
    state = {
        title:'',
        image:'',
        largeImage:'',
        price:'',
        negotiable: true,
        description:''
    }
    handleChange = e =>{
        // console.log(e.target)
        const {name, type, value} = e.target;
        console.log({name, type, value}, '<---');
        const val = type === 'number' ? parseFloat(value) : value;

        this.setState({
            [ name ] : val
        })
    }

    updateFile = async ( e ) =>{

        let file = e.target.files[0]
        let data = new FormData()

        data.append('file', file)
        data.append('upload_preset', 'myshop')

        const res = await fetch('https://api.cloudinary.com/v1_1/dmlp9artf/image/upload' , {
            method: 'POST',
            body: data
        } )

        const resData = await res.json()
        console.log(resData)
        this.setState({
            image: resData.secure_url,
            largeImage: resData.eager[0].secure_url
        })
        

    }

    handleReset = () =>{
        this.setState({
            ...this.default,
    })
}

    render() {
        return (
            <Mutation mutation = { CREATE_ITEM_MUTATION } variables = {this.state}>
                {(mutationfunction, {loading, error}) =>(  

                <form method="post" onSubmit={ async e =>{
                    e.preventDefault();
                    console.log(this.state);
                    const res = await mutationfunction()
                    console.log(res);
                }} >

                <Error error={error}/>

                <fieldset disabled={loading} aria-busy={loading}>

                <div className="row gtr-uniform">

                    <div className="col-12">
                        <input 
                        type="file" 
                        name="file" 
                        id="filesend" 
                        placeholder="Upload an image" 
                        required 
                        onChange={this.updateFile}
                        />
                    </div>

                    <div className="col-12">
                        <input 
                        type="text" 
                        name="title" 
                        id="title" 
                        value={this.state.title} 
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
                            value={this.state.price} 
                            placeholder="Price" 
                            required 
                            onChange={this.handleChange}/>
                    </div>

                    <div className="col-12">
                        <textarea 
                        type="text" 
                        name="description" 
                        id="desc" 
                        value={this.state.description} 
                        placeholder="Enter a description" 
                        required 
                        onChange={this.handleChange}/>
                    </div>

                    <div className="col-4 col-12-small">
                        <input 
                        type="radio" 
                        id="nodis" value='true' 
                        name="negotiable" 
                        defaultChecked={this.state.negotiable} 
                        onChange={this.handleChange}/>
                        <label htmlFor="nodis">non negotiable</label>
                    </div>

                    <div className="col-4 col-12-small">
                        <input type="radio" id="demo-priority-normal" value='false' name="negotiable" onChange={this.handleChange}/>
                        <label htmlFor="demo-priority-normal">negotiable</label>
                    </div>

                    <div className="col-12">

                        <ul className="actions">
                            <button type="submit" className="primary">Submit</button>
                            <button type="reset" className="secondary" onClick={()=>this.handleReset()}>Reset</button>
                        </ul>
                    </div>

                </div>
                </fieldset>
            </form>
        )}
        </Mutation>
        );
    }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };