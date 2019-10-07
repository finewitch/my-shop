require('dotenv').config({path: '.env'});
const createServer      = require('./createServer'),
db                      = require('./db')

const server = createServer();

server.start({
    cors: {
        credentials: true,
        origin: process.env.FRONTEND_URL,

    },

}, deets=>{
    console.log(`SERVERS RUNS AT PORT  ${deets.port}`)
}
)