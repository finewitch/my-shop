import React, { Component } from 'react';
import {Query} from 'react-apollo';
import { CURRENT_USER_QUERY } from './User';
import SignIn from './SignIn'

const PleaseSignIn = props => {
    return (
        <div>
            <Query query={ CURRENT_USER_QUERY }>
                {( {data, error, loading} )=> {

                    if(loading) <div>Loading ...</div>;

                    if(!data.me){
                        return(
                            <div>
                                <h1>Please sign in</h1>
                                {/* <p>Please sign in</p> */}
                                <SignIn/>
                            </div>
                        )
                    }

                    return props.children 

                }}
            </Query>
        </div>
    );
};

export default PleaseSignIn;