import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag'; 
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

import ImageGallery from './ImageGallery'

const SIGN_IN_MUTATION  = gql`
  mutation SIGN_IN_MUTATION  (
    $email: String!,
    $password:  String!
    ){ signin (
        email: $email,
        password: $password
    ){ id, email, name }  
  }
`

class SignIn extends Component {
    state = {
        password:'',
        email:''
    }
    handleChange = e =>{
        const { name, type, value} = e.target;
        console.log(type, value)
        // console.log({name, type, value}, '<---');
        this.setState({ [ name ] : value })
    
}

    render() {
        return (
            <div className="form-wrapper">
                <Mutation 
                mutation = { SIGN_IN_MUTATION } 
                variables = {this.state}
                refetchQueries ={[{ query: CURRENT_USER_QUERY }]}>
                        { (signup, {error, loading}) =>(            
                            <form method="post" onSubmit={async (e)=>{
                                e.preventDefault();
                                const res = await signup();
                                console.log(res, '<--res');
                                this.setState({
                                    email:'',
                                    password:''
                                })
                            }}>
                            <Error error={error} />
                                <fieldset disabled={loading} aria-busy={loading}>

                                    <h1 className="c-w">Sign in</h1>

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

export default SignIn;
export { SIGN_IN_MUTATION };