import React, { Component } from 'react';
import PropTypes from 'prop-types';
import formatMoney from '../lib/formatMoney'
import Link from 'next/link';
import DeleteItem from './DeleteItem';
import AddToCart from './AddToCart';


class Item extends Component {
    render() {
        const { item, index, stateIndex } = this.props;
        return (
            <div className='p_wrapper'>
                
                <span className=" p_wrapper-num c-w">{index}</span>

                <div className='p_wrapper-inner'>

                    <Link 
                        href={{
                            pathname: '/item',
                            query: { id: item.id }
                        }}>
                        <div className="p_wrapper-inner-w">
                            <span>{item.image &&  <img src={item.image} alt={item.title}/> }</span>
                            <span>
                                <div className="c-w">{formatMoney(item.price)}</div>
                                <div className="c-w">{item.title}</div>
                                <div className="c-w">{item.negotiable ? <div>do negocjacji</div> : <div>nie do negocjacji</div>}</div>
                                <div className="c-w"> by author</div>
                            </span>
                        </div>
                    </Link>

                    <div className="p_wrapper-inner-btnlist">
                        <Link
                        href={{
                            pathname : 'update',
                            query: {id: item.id },
                        }}><button>edit</button></Link>
                        <AddToCart id={ item.id }/>
                        <DeleteItem id={ item.id }/>
                    </div> 

                </div>
            </div>
        );
    }
}

Item.propTypes = {
    item:PropTypes.shape({
        title: PropTypes.string.isRequired,
         price: PropTypes.number.isRequired,
    })

};

export default Item;
