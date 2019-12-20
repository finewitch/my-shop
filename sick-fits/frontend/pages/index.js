import React from 'react';
import AllItems from '../components/AllItems';
import Search from '../components/Search';


class Home extends React.Component{
    render(){
        return(
            <section>
				<div className="posts">
                    <div className="posts__container">
                        
                        <Search/>
                        <div className="posts__container-nav">
                            <div className="label">
                                <p className="c-w">Your weekly art</p>
                            </div>
                            <div className="info">
                                <p className="c-y">contemporary and urban artists. Our stock includes lithographs, prints, drawings and original work</p>
                            </div>
                        </div>
                        <AllItems page={parseFloat(this.props.query.page) || 1}/>

                    </div>
					
				</div> 
			</section>
        )
    }
}


export default Home;