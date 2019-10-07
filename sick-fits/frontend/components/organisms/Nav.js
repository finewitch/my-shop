import React, { Component } from 'react';
import Link from 'next/link';
import Nprogress from 'nprogress';
import Router from 'next/router';

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
            <div id="sidebar">
                <div className="inner">

        
                        <section id="search" className="alt">
                            <form method="post" action="#">
                                <input type="text" name="query" id="query" placeholder="Search" />
                            </form>
                        </section>

                        <nav id="menu">
                            <header className="major">
                                <h2>Menu</h2>
                            </header>
                            <ul>
                                
                                <Link href="/"><a>Homepage</a></Link>
                                <Link href="/items"><a>Shop</a></Link>
                                <Link href="/sell"><a>Sell</a></Link>
                                <Link href="/"><a>Orders</a></Link>
                                <Link href="/"><a>Accounts</a></Link>
                            </ul>
                        </nav>

                        <section>
                            <header className="major">
                                <h2>Get in touch</h2>
                            </header>
                            {/* <p>Sed varius enim lorem ullamcorper dolore aliquam aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore. Proin sed aliquam facilisis ante interdum. Sed nulla amet lorem feugiat tempus aliquam.</p> */}
                            <ul className="contact">
                                <li className="icon solid fa-envelope"><a href="#">information@untitled.tld</a></li>
                                {/* <li className="icon solid fa-phone">(000) 000-0000</li> */}
                                {/* <li className="icon solid fa-home">1234 Somewhere Road #8254<br />
                                Nashville, TN 00000-0000</li> */}
                            </ul>
                        </section>

                        <footer id="footer">
                            <p className="copyright">&copy; Untitled. All rights reserved. Demo Images: <a href="https://unsplash.com">Unsplash</a>. Design: <a href="https://html5up.net">HTML5 UP</a>.</p>
                        </footer>

                </div>
            </div>
        );
    }
}

export default Nav;