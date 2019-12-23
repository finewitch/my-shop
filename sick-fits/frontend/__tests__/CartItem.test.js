import CartItemComponent from '../components/CartItem';
import {shallow, mount} from 'enzyme';
import toJSON from 'enzyme-to-json';

const fakeItem = {
id: "ck4hjcero355k0993dhxylnv9",
item: {price: 1213, title: "fotka", description: "123123"},
quantity: 1
}

describe('<CartItemComponent/>',()=>{

    it('renders', ()=>{
        shallow(<CartItemComponent item={fakeItem}/>)
    })

    it('matches the snapshop', ()=>{
        const wrapper = shallow(<CartItemComponent item={fakeItem}/>)
        expect(toJSON(wrapper)).toMatchSnapshot()
    })

    it('updates via props', ()=>{

        const wrapper = shallow(<CartItemComponent item={fakeItem}/>)
        expect(toJSON(wrapper)).toMatchSnapshot()
        wrapper.setProps({item:{...fakeItem, quantity: 2} })
        expect(toJSON(wrapper)).toMatchSnapshot()

    })
    
})