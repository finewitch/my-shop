import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag'; 
import Error from './ErrorMessage'

import ImageGallery from './ImageGallery'

const SIGN_UP_MUTATION = gql`
  mutation SIGN_UP_MUTATION (
    $email: String!,
    $name: String!,
    $password:  String!
    ){signup(
        email: $email,
        name: $name,
        password: $password
    ){ id }  
  }
`

class SignUp extends Component {
    state = {
        name:'',
        password:'',
        email:''
    }
    handleChange = e =>{
        const {name, type, value} = e.target;
        // console.log({name, type, value}, '<---');
        this.setState({ [ name ] : value })
    
}

    render() {
        return (
            <div className="form-wrapper">
                <Mutation mutation = { SIGN_UP_MUTATION} variables = {this.state}>
                        { (signup, {error, loading}) =>(            
                            <form method="post" onSubmit={async (e)=>{
                                e.preventDefault();
                                const res = await signup();
                                console.log(res, '<--res');
                                this.setState({
                                    name: '',
                                    email:'',
                                    password:''
                                })
                            }}>
                            <Error error={error} />
                                <fieldset disabled={loading} aria-busy={loading}>

                                    <h1 className="c-w">Sign up</h1>

                                    <div className="col-12">
                                        <input 
                                        type="email" 
                                        name="email"
                                        value={this.state.email} 
                                        id="email" 
                                        placeholder="E-mail" 
                                        onChange={this.handleChange}
                                        />
                                    </div>

                                    <div className="col-12">
                                        <input 
                                        type="text" 
                                        name="name"
                                        value={this.state.name} 
                                        id="name" 
                                        placeholder="Name" 
                                        onChange={this.handleChange}
                                        />
                                    </div>

                                    <div className="col-12">
                                        <input 
                                        type="password" 
                                        name="password"
                                        value={this.state.password} 
                                        id="password" 
                                        placeholder="Password" 
                                        onChange={this.handleChange}
                                        />
                                    </div>

                                    <button type="submit">Submit</button>

                                </fieldset>
                            </form>

                        )}
                </Mutation>
            </div>
        );
    }
}

export default SignUp;
export { SIGN_UP_MUTATION };