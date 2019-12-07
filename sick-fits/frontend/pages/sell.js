import React from 'react';
import Link from 'next/link';
import CreateItem from '../components/CreateItem'

class Sell extends React.Component{
    render(){
        return(
            <div className="row sell">
                <div className="col-6 col-12-medium centered">
                    <h1>Sell a <span className="f-lecker">toy</span></h1>
                    <CreateItem />
                </div>
            </div>
        )
    }
}


export default Sell;