const Joi = require('joi');
const knl = require('../knl');
const { Op } = require("sequelize")

knl.post('client', async(req, resp) => {
    const schema = Joi.object({
        nameFantasy  : Joi.string().min(1).max(100),
        CNPJ         : Joi.string().min(1).max(100),
        socialReason : Joi.string().min(1).max(100),
        clientSince  : Joi.date().raw(),
        address      : Joi.array().items(Joi.object({
            district   : Joi.string().min(2).max(30),
            city       : Joi.string().min(3).max(60),
            state      : Joi.string().min(2).max(20),
            cep        : Joi.number().integer(),
            number     : Joi.number().integer(),
            street     : Joi.string().min(3).max(100),
            complement : Joi.string().min(2).max(100).allow('')
        }))
    });

    knl.validate(req.body, schema);

    // Salvar a tabela de cliente
    //------------------------------------------------------------------------------------------------
    const customer = knl.sequelize().models.Client.build({
        nameFantasy  : req.body.nameFantasy,
        CNPJ         : req.body.CNPJ,
        socialReason : req.body.socialReason,
        clientSince  : req.body.clientSince,
        status       : 1
    });
    await customer.save();
    const result = {id : customer.id};
    //------------------------------------------------------------------------------------------------

    // Se não tem endereços vazamos
    //------------------------------------------------------------------------------------------------    
    if (knl.objects.isEmptyArray(req.body.address)){
        resp.json(result);
        return;
    }
    //------------------------------------------------------------------------------------------------  
    
    // Agora vamos salvar os endereços
    //------------------------------------------------------------------------------------------------      
    for (const address of req.body.address){
        const record = knl.sequelize().models.Adress.build({
            street : address.street,
            district : address.district,
            city : address.city,
            state : address.state,
            cep : address.cep,
            complement : address.complement,
            number : address.number,
            fkclient : customer.id,
            status : 1
        })

        await record.save();  
    }
    //------------------------------------------------------------------------------------------------      

    resp.json(result);
});

knl.put('client', async(req, resp) => {
    const schema = Joi.object({
        id           : Joi.number().min(1).required(),
        nameFantasy  : Joi.string().min(1).max(100),
        CNPJ         : Joi.string().min(1).max(100),
        socialReason : Joi.string().min(1).max(100),
        clientSince  : Joi.date().raw(),
        address      : Joi.array().items(Joi.object({
            district   : Joi.string().min(2).max(30),
            city       : Joi.string().min(3).max(60),
            state      : Joi.string().min(2).max(20),
            cep        : Joi.number().integer(),
            number     : Joi.number().integer(),
            street     : Joi.string().min(3).max(100),
            complement : Joi.string().min(2).max(100).allow('')
        }))
    });

    knl.validate(req.body, schema);    

    // Deleta todos os enderecos
    //------------------------------------------------------------------------------------------------    
    await knl.sequelize().models.Adress.destroy({
        where : {fkclient : req.body.id}
    });
    //------------------------------------------------------------------------------------------------    

    // Atualiza a tabela de cliente
    //------------------------------------------------------------------------------------------------
    await knl.sequelize().models.Client.update({
        nameFantasy  : req.body.nameFantasy,
        CNPJ         : req.body.CNPJ,
        socialReason : req.body.socialReason,
        clientSince  : req.body.clientSince,
        status       : 1
    },
    {
        where : {id : req.body.id}
    });
    //------------------------------------------------------------------------------------------------

    // Se não tem endereços vazamos
    //------------------------------------------------------------------------------------------------    
    if (knl.objects.isEmptyArray(req.body.address)){
        resp.status(200);
        resp.end();
        return;
    }
    //------------------------------------------------------------------------------------------------  
    
    // Agora vamos salvar os endereços
    //------------------------------------------------------------------------------------------------      
    for (const address of req.body.address){
        const record = knl.sequelize().models.Adress.build({
            street : address.street,
            district : address.district,
            city : address.city,
            state : address.state,
            cep : address.cep,
            complement : address.complement,
            number : address.number,
            fkclient : req.body.id,
            status : 1
        })

        await record.save();  
    }
    //------------------------------------------------------------------------------------------------      

    resp.status(200);
    resp.end();
})

////////////

knl.get('client', async (req, resp) => {
    
    const customers =  knl.objects.copy(await knl.sequelize().models.Client.findAll({
        where: {
            status: 1
        }
    }));

    resp.json(customers);

});

knl.get('client/:id', async (req, resp) => {

    const customers =  knl.objects.copy(await knl.sequelize().models.Client.findAll({
        where: {
            id : req.params.id,
            status: 1
        }
    }));

    for(const customer of customers){
        const addresses = knl.objects.copy(await knl.sequelize().models.Adress.findAll({
            where: {
                fkclient : customer.id,
                status: 1
            }
        }))

        customer.addresses = addresses;
    }

    resp.json(customers[0]);
})

knl.patch('client', async (req, resp) => {
    if(req.body.status == 1){
         await knl.sequelize().models.Client.update({
            status: "1"
        }, {
            where: {
                id: req.body.id,
            }
        });
        resp.send("Ativado");
    } else {
        await knl.sequelize().models.Client.update({
            status: "0"
        }, {
            where: {
                id: req.body.id,
            }
        });
        resp.send("Desativado");
    }
       
});

knl.get("clientsearch/:nameFantasy", async (req, resp) => {
    const query = `%${req.params.nameFantasy}%`; 

    const result = await knl.sequelize().models.Client.findAll({
      where: { nameFantasy: { [Op.like]: query },
    status : 1 }
    });

    resp.json(result);
})

