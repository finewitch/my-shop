const cookieParser = require('cookie-parser');
require('dotenv').config({path: '.env'});
const jwt  = require('jsonwebtoken');
const createServer      = require('./createServer'),
db                      = require('./db')

const server = createServer();
server.express.use(cookieParser());

//decode the jwt
server.express.use((req,res,next)=>{
    // console.log("Hey I'm a midddleware")
    const { token } = req.cookies;
    if(token){
        const { userId } = jwt.verify(token, process.env.APP_SECRET);
        //put user id into request
        req.userId = userId;
    }
    next();
})

server.start({
    cors: {
        credentials: true,
        origin: process.env.FRONTEND_URL,

    },

}, deets=>{
    console.log(`SERVERS RUNS AT PORT  ${deets.port}`)
}
)