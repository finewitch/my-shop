import formatMoney from '../lib/formatMoney';

describe('formatMoney function', ()=>{

    it('works with fractional dolars', ()=>{
        expect(formatMoney(1)).toEqual('$0.01')
        expect(formatMoney(10)).toEqual('$0.10')
    })

    it('leaves cents off for whole dollars', ()=>{
        expect(formatMoney(5000)).toEqual('$50')
        expect(formatMoney(100)).toEqual('$1')
        expect(formatMoney(500000)).toEqual('$5,000')
    })
})
