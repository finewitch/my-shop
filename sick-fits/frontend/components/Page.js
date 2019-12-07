import React, { Component } from 'react';
import Meta from './Meta';
import Header from './atoms/Header';
import Nav from './organisms/Nav';
import Banner from './organisms/Banner';

class Page extends Component {
    render() {
        return (
            // <div id="wrapper">
                <div id="main">
                    <Nav/>
                    <div className="inner">
                        <Meta/>
                        {/* <Header/> */}

						{/* <Banner/> */}
						
						{ this.props.children }
						
                    </div>
                {/* </div> */}
            </div>
        );
    }
}

export default Page;