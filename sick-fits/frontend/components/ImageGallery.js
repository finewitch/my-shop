import React, { Component } from 'react';
import imagesData from './atoms/imagesData';
class ImageGallery extends Component {
    render() {
        return (
            <div className="imgpicker">
                <label>Pick your toy</label>
                <div className="imgpicker__wrapper">
                { imagesData.map( (el, index) => { return (
                    <div className="imgpicker__wrapper-box">
                        <input id={el.item} defaultChecked={index === 0 ? true : false} type="radio" value={el.path} name="image" onChange={this.props.onChange}/>
                        <label htmlFor={el.item}>
                            <img src={el.path}/>
                        </label>
                    </div>
                )})}
                </div>
            </div>
        );
    }
}

export default ImageGallery;