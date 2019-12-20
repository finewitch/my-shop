import React from 'react';
import Link from 'next/link';
import CreateItem from '../components/CreateItem'
import PleaseSignIn from '../components/PleaseSignIn'

class Sell extends React.Component{
    render(){
        return(
            <div className="row sell">
                <div className="col-6 col-12-medium centered">

                    <PleaseSignIn>

                        <CreateItem />

                    </PleaseSignIn>

                </div>
            </div>
        )
    }
}


export default Sell;