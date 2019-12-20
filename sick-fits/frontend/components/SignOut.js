import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag'; 
import { CURRENT_USER_QUERY } from './User';

const SIGN_OUT = gql`
    mutation SIGN_OUT{
        signout{ 
            message 
        }
    }`;

const SignOut = (props) => {
    return (
        <Mutation 
        mutation={ SIGN_OUT}
        refetchQueries ={[{ query: CURRENT_USER_QUERY }]}>

            {(signout)=> <a onClick={signout}>Sign out</a> }

        </Mutation>
    );
};

export default SignOut;