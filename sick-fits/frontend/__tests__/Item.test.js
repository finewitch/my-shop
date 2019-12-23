import ItemComponent from '../components/Item';
import {shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

const fakeItem = {
    id: 'ABC',
    title: 'cool item',
    description: 'uhuh',
    image: 'dog.jpg',
    largeImage: 'dog1.jpg',
    negotiable: true,
    price: 4000
}

// describe('<Item/>', ()=>{
//     it('renders and displays properly', ()=>{
//         const wrapper = shallow(<ItemComponent item={fakeItem}/>);
//         console.log(wrapper.find('.price').text());
//         expect(wrapper.find('.price').text()).toBe('$30');
//     })
// })  

describe('<Item/>', ()=>{
    it('renders and matches snapshot', ()=>{
        // const price = '$50,34'; 
        // expect(price).toMatchSnapshot(); 
        const wrapper = shallow(<ItemComponent item={fakeItem}/>);
        expect(toJSON(wrapper)).toMatchSnapshot();
    })
})