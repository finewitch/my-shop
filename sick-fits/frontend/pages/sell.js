import React from 'react';
import Link from 'next/link'


class Sell extends React.Component{
    render(){
        return(
            <div>
                <div>SELL HERE</div>
                <Link href="/"><a>sell link</a></Link>
            </div>
        )
    }
}


export default Sell;