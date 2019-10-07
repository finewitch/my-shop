const Mutations = {
  createItem(parent, args, context, info){
        
        const item = context.db.mutation.createItem({
            data:{
                ...args
            }
        }, info)
        .then((response)=>{
            return response
        })

        console.log(item, 'item')

        return item
    }

};

module.exports = Mutations;
