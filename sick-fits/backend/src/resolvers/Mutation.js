const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const promisify = require('util');

const Mutations = {
  async createItem(parent, args, context, info){

    if(!context.request.userId){
        throw Error('You mist be logged in to do that!')
    }
        
    const item = await context.db.mutation.createItem(
        {
          data: {
            // This is how to create a relationship between the Item and the User
            user: {
              connect: {
                id: context.request.userId,
              },
            },
            ...args,
          },
        },
        info
      );

        console.log(item, "<---***************@@@@@@@@@@@@@@!!!!!!!!!!!!!!!!!!       !!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        return item
    },

    updateItem(parent, args, context, info){
        const updates = {...args}
        delete updates.id 
        return context.db.mutation.updateItem({
            data: updates,
            where: {
                id: args.id
                }
            }, info
        )
    },
    async deleteItem(parent, args, context, info){
        const where = {id: args.id}

        const item = await context.db.query.item({ where }, `{id title}`)

        return context.db.mutation.deleteItem({ where }, info)
    },

    async signup(parent, args, context, info){
        // console.log(args, "<--------")
        args.email = args.email.toLowerCase();
        // hashthepass  
        const password = await bcrypt.hash(args.password, 10)

        const user = await context.db.mutation.createUser(
            {
            data:{
                ...args,
                password,
                permissions : {set : ['USER']}

            },
        }, info);

        // console.log(user, "<---USERRR")

        //create jwt token
        const token = jwt.sign({ userId:  user.id}, process.env.APP_SECRET);
        //save as a cookie on the response
        context.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 356 // 1 year
        }) 

        return user

    },

    async signin(parent, {email, password}, context, info){
        //check if there is a user
        const user = await context.db.query.user({where: {email: email}})
        if(!user){
             
        }
        //check if their pass is correct
        const valid = await bcrypt.compare(password, user.password);
        if(!valid){
            throw new Error(`Not valid password`);
        }

        //generate jwt token
        const token = jwt.sign({ userId:  user.id}, process.env.APP_SECRET);
        //set the cookie with the token
        context.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 356 // 1 year
        }) 
        //return the user
        return user

    },  

    signout(parent, {email, password}, context, info){
        context.response.clearCookie('token');
        return {message: 'Good bye'}

    },
    requestReset(parent, args, context, info){

    },
    async addToCart(parent, args, context, info){

        const userId = context.request.userId;

        if(!userId){
            throw new Error('You must be sign in');
        }

        const [existingCartItem] = await context.db.query.cartItems({
            where:{
                user: {id: userId},
                item: {id: args.id}
            }
        });

        if( existingCartItem ){
             console.log('This item is already in cart')

             return context.db.mutation.updateCartItem({
                 where: {id: existingCartItem.id },
                 data:{ quantity: existingCartItem.quantity + 1}
             })

        }
        return context.db.mutation.createCartItem({
            data: {
                user: {connect: {id: userId}},
                item:{ connect: {id: args.id}}
            }
        })
    },
    async removeFromCart(parent,args,context,info){
        console.log(args, 'argggs')
        //find the cart item
        const cartItem = await context.db.query.cartItem(
            {
              where: {
                id: args.id,
              },
            },
            `{ id, user { id }}`
          );

        if(!cartItem) throw new Error ('No cart item found')

        //make sure user owns items
        if(cartItem.user.id !== context.request.userId) throw new Error ('Chetin hhh ')
        //delete


        return context.db.mutation.deleteCartItem({
            where: { id: args.id },
        }, info);
    }
};

module.exports = Mutations;
