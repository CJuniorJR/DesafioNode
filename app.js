const hapi = require('hapi');
const userRoute = require('./routes/user.routes');

const server = hapi.server({
    host: '0.0.0.0',
    port: process.env.PORT || 8000,
    routes: {
        cors: true
    }
});

server.route(userRoute);

const start = async function(){
    try {
        await server.start();
        console.log('Servidor rodando em: ',server.info.uri);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

start();
