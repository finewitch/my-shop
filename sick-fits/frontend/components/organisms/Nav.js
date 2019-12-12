import React, { Component } from 'react';
import Link from 'next/link';
import Nprogress from 'nprogress';
import Router from 'next/router';
import User from '../User';

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
                <img className="menu-logo" src="/static/LOGO-ART.svg"/>
                <ul>
                    <User>
                        {(data) =>{
                            console.log(data, "<--USER")
                            return <p>data here</p>
                        }}
                    </User>
                    <Link href="/items"><a>Shop</a></Link>
                    <Link href="/sell"><a>Sell</a></Link>
                    <Link href="/"><a>Orders</a></Link>
                    <Link href="/"><a>Account</a></Link>
                    <Link href="/signup"><a>signup</a></Link>

                </ul>
            </nav>                       
        );
    }
}

export default Nav;