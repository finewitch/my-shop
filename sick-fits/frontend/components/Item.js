import React, { Component } from 'react';
import PropTypes from 'prop-types';
import formatMoney from '../lib/formatMoney'
import Link from 'next/link';

class Item extends Component {
    render() {
        const { item, index, stateIndex } = this.props;
        return (
            <div className='p_container-product'>
                <div className="c-w">0{index}</div>
                {item.image &&  <img src={item.image} alt={item.title}/> }
                <div className="p_container-product-inner-w">
                    <div className="c-w">{formatMoney(item.price)}</div>
                    <div className="c-g">{item.title}</div>
                    <div className="c-g">{item.negotiable ? <div>do negocjacji</div> : <div>nie do negocjacji</div>}</div>
                    <div className="c-g"> by author</div>
                </div>

                <div className="product-btnlist">
                    <Link
                    href={{
                        pathname : 'update',
                        query: {id: item.id },
                    }}><a className="button">edit</a></Link>
                    <button>add to cart</button>
                    <button>delete</button>
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
