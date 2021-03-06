function Person (name, foods){
    this.name = name;
    this.foods = foods
}
 Person.prototype.fetchFavFoods = function(){
     return new Promise((resolve, reject)=>{
        setTimeout(()=> resolve(this.foods), 2000)
     })
 }

describe('mocking', ()=>{
    it('can create a person', ()=>{
        const me = new Person('Wes', ['pizza', 'pasta']);
        expect(me.name).toBe('Wes')
    });
    it('can fetch foods', async ()=>{
        const me = new Person('Wes', ['pizza', 'pasta']);
        //mock
        me.fetchFavFoods= jest.fn().mockResolvedValue(['sushi', 'ramen']);
        const favFoods = await me.fetchFavFoods();

        console.log(favFoods, 'log');
        expect(favFoods).toContain('sushi')

    })

})