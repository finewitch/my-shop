import React from 'react';
import Link from 'next/link';
import SignUp from '../components/SignUp'
import SignIn from '../components/SignIn'

class SignUpPage extends React.Component{
    render(){
        return(
            <div className="row sell">
            <div className="col-6 col-12-medium centered">
                
                <SignUp />
                <SignIn />
                {/* <SignUp /> */}
                
            </div>
        </div>
        )
    }
}


export default SignUpPage;