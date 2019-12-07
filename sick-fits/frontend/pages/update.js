import React from 'react';
import Link from 'next/link';
import UpdateItem from '../components/UpdateItem'

class Update extends React.Component{
    render(){
        return(
            <div className="row sell">
                <div className="col-6 col-12-medium centered">
                    <h1>Update item</h1>
                    <UpdateItem id={this.props.query.id}/>
                </div>
            </div>
        )
    }
}


export default Update;