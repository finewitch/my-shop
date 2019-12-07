import React from 'react';
import AllItems from '../components/AllItems';


class Home extends React.Component{
    render(){
        return(
            <section>
				<div className="posts">
					
					<AllItems/>
					
				</div> 
			</section>
        )
    }
}


export default Home;