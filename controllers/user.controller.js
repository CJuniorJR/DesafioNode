const userServices = require('../services/user.services');
const moment = require('moment');
const utils = require('../utils/utils');
const lodash = require('lodash');

module.exports = {
    create: async (req, h) => {
        let { nome, email, senha, telefones } = req.payload;

        if(!nome || !email || !senha || !telefones) 
            return handleError(h, "Dados insuficientes",400);

        try {
            let user = userServices.findByEmail(email);
            
            if(user != null) 
                return handleError(h, 'E-mail ja existente', 400);

           
            let created = userServices.create(req.payload);
            if(created != null)
                return h.response(lodash.omit(created, 'senha')).code(201);

            return handleError(h, 'Não foi possível cadastrar o usuario', 500);
            
        } catch (error) {
            console.log(error);
            return handleError(h, 'Ocorreu um erro inesperado', 500);
        }
    },
    signin: async (req, h) => {
        try {
            let { email, senha } = req.payload;

            if(!email || !senha)
                return handleError(h, 'Dados insuficientes', 400);
            
            let user = userServices.findByEmail(email);
            if(user == null || !utils.compare(senha, user.senha))
                return handleError(h, 'Usuario e/ou senha inválidos', 401);
            
            user = userServices.signinUpdate(user.id);

            return h.response(lodash.omit(user, 'senha')).code(200);

        } catch (error) {
            console.log(error);
            return handleError(h, 'Ocorreu um erro inesperado', 500);
        }
    },
    get: async (req, h) => {
        try {
            if(req.params.id == null)
                return handleError(h, 'Informe o id do usuario', 400);

            let auth = req.headers.authorization;
            if(auth == null)
                return handleError(h, 'Não autorizado', 401);

            let user = userServices.get(req.params.id);
            if(user == null)
                return handleError(h,'Usuario não encontrado',404);

            let authTokens = auth.split(" ");

            if(authTokens[0].toLowerCase() != "bearer" || authTokens[1] == null)
                return handleError(h, 'Não autorizado', 401);

            if(user.token != authTokens[1])
                return handleError(h, 'Não autorizado', 401);

            let lastLogin = moment(user.ultimo_login);
            let now = moment();

            if(moment().diff(moment(lastLogin), 'minutes') > 30)
                return handleError(h, 'Sessão Invalida', 401);
            
            
            return lodash.omit(user, 'senha');

        } catch (error) {
            console.log(error);
            return handleError(h, 'Ocorreu um erro inesperado', 500);
        }
    }

};

function handleError(h, msg, statusCode){
    return h.response({ message: msg }).code(statusCode);
}