describe( 'sample test 101', ()=>{

    it('handle ranges just fine', ()=>{
        const age = 200;
        expect(age).toBeGreaterThan(100)
         
    })

    xit('list of dogs', ()=>{

        const dogs = ['snickers', 'hugo'];
        expect(dogs).toContain('hugo')

         
    })

}) 