const userServices = require('../services/user.services');

module.exports = {
    create: async (req, h) => {
        let { nome, email, senha, telefones } = req.payload;

        if(!nome || !email || !senha || !telefones) return h.response({ error: 'Dados insuficientes' }).code(400);

        try {
            console.log(userServices.findByEmail(email));
            if(userServices.findByEmail(email)) return h.response({ message: 'E-mail ja cadastrado no sistema!' });

            if(userServices.create(req.payload)) return h.response({ message: 'Usuario cadastrado com sucesso!' }).code(201);
            
        } catch (error) {
            
        }
        
    }
}