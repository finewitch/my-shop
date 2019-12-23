import React, { Component } from 'react';
import Link from 'next/link';
import Nprogress from 'nprogress';
import Router from 'next/router';
import User from '../User';
import SignOut from '../SignOut';
import {Query, Mutation} from 'react-apollo';
import { LOCAL_STATE_QUERY, LOCAL_STATE_MUTATION } from '../Cart';
// LOCAL_STATE_QUERY
// LOCAL_STATE_MUTATION

Router.onRouteChangeStart = ()=>{
    console.log('routeChangeStart trggered')
    Nprogress.start();
}

Router.onRouteChangeComplete = ()=>{
    console.log('routeChangeComplete trggered')
    Nprogress.done();
}

Router.onRouteChangeErro = ()=>{
    Nprogress.done();
	console.log('routeChangeErro trggered')
}
class Nav extends Component {
    render() {
        return (
            <nav id="menu">
                <Link href="/">
                    <img className="menu-logo" src="/static/LOGO-ART.svg"/>
                </Link>

                <User>

                    {({data: { me }}) =>(
                        <ul>
                            

                            <Link href="/items"><a>Shop</a></Link>
                            {me && (

                                <>
                                
                                <Link href="/sell"><a>Sell</a></Link>
                                <Link href="/"><a className="disabledp">Orders</a></Link>
                                <Mutation mutation = { LOCAL_STATE_MUTATION }> 
                                {(mutationFun)=>(
                                    <a onClick={mutationFun}>cart </a>
                                )}
                                </Mutation>
                                
                                <SignOut/>

                                <Link href="/"><a>Account</a></Link>
                                <a className="logged">logged in as: {me.name}</a>
                                </>

                            )}
                            {!me && (
                            <Link href="/signup"><a>signup</a></Link>
                            )}

                        </ul>
                    )}

                </User>
            </nav>                       
        );
    }
}

export default Nav;