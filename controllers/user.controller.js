const userServices = require('../services/user.services');

module.exports = {
    create: async (req, h) => {
        let { nome, email, senha, telefones } = req.payload;

        if(!nome || !email || !senha || !telefones) return h.response({ error: 'Dados insuficientes' }).code(400);

        try {

            if(userServices.findByEmail(email)) return h.response({ message: 'E-mail ja cadastrado no sistema!' }).code(400);

           
            if(userServices.create(req.payload)) return h.response(userServices.findByEmail(email)).code(201);
            
        } catch (error) {
            return h.response({ error: error }).code(400);
        }
        
    }
}