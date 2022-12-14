const Joi = require('joi');
const knl = require('../knl');
const { Op } = require("sequelize");
const adress = require('../models/adress');

knl.post('order', async(req, resp) => {
    const schema = Joi.object({
        fkclient   : Joi.number().integer().required(),
        DTemission : Joi.string().min(1).max(100).required(),
        DTdelivery : Joi.string().min(1).max(100).required(),
        fkadress   : Joi.number().integer().required(),
        total      : Joi.number().required(),
        ProdOrder : Joi.array().items(Joi.object({
            fkproduct   : Joi.number().integer().required(),
            amount      : Joi.number().required(),
            UNITvalue   : Joi.number().required(),
            descont     : Joi.number().allow(0),
            addition    : Joi.number().allow(0),
            total       : Joi.number().required()
        }))
    });

    knl.validate(req.body, schema);

    // Salvar a tabela de cliente
    //------------------------------------------------------------------------------------------------
    const customer = knl.sequelize().models.Order.build({
        fkclient     : req.body.fkclient,
        DTemission   : req.body.DTemission,
        DTdelivery   : req.body.DTdelivery,
        fkadress     : req.body.fkadress,
        total        : req.body.total,
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
    for (const address of req.body.ProdOrder){
        const record = knl.sequelize().models.ProdOrder.build({
            fkclient   : address.fkclient,
            DTemission : address.DTemission,
            DTdelivery : address.DTdelivery,
            fkadress   : address.fkadress,
            total      : address.total,
            status     : 1
        })

        await record.save();  
    }
    //------------------------------------------------------------------------------------------------      

    resp.json(result);
});

knl.put('order', async(req, resp) => {
    const schema = Joi.object({
        fkclient   : Joi.number().integer(),
        DTemission : Joi.date().raw(),
        DTdelivery : Joi.date().raw(),
        fkadress   : Joi.number().integer(),
        total      : Joi.number(),
        ProdOrder : Joi.array().items(Joi.object({
            fkorder     : Joi.number().integer(),
            fkproduct   : Joi.number().integer(),
            amount      : Joi.number(),
            UNITvalue   : Joi.number(),
            descont     : Joi.number().allow(0),
            addition    : Joi.number().allow(0),
            total       : Joi.number()
        }))
    });

    knl.validate(req.body, schema);    

    // Deleta todos os enderecos
    //------------------------------------------------------------------------------------------------    
    await knl.sequelize().models.Order.destroy({
        where : {fkclient : req.body.id}
    });
    //------------------------------------------------------------------------------------------------    

    // Atualiza a tabela de cliente
    //------------------------------------------------------------------------------------------------
    await knl.sequelize().models.Client.update({
        fkclient    : req.body.fkclient,
        DTemission  : req.body.DTemission,
        DTdelivery  : req.body.DTdelivery,
        fkadress    : req.body.fkadress,
        total       : req.body.fkadress,
        status      : 1
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
        const record = knl.sequelize().models.ProdOrder.build({
            fkproduct   : Joi.number().integer(),
            amount      : Joi.number(),
            UNITvalue   : Joi.number(),
            descont     : Joi.number().allow(0),
            addition    : Joi.number().allow(0),
            total       : Joi.number(),
            status : 1
        })

        await record.save();  
    }
    //------------------------------------------------------------------------------------------------      

    resp.status(200);
    resp.end();
})

////////////

knl.get('order', async (req, resp) => {

    const orders =  knl.objects.copy(await knl.sequelize().models.Order.findAll({
        where: {
            status: 1
        }
    }));

    // DROP DE ADRESS
    if(!knl.objects.isEmptyArray(orders)){
        for(const order of orders){
            const adress = await knl.sequelize().models.Adress.findAll({
                where : {
                    id : order.fkadress
                }
            })
            if(!knl.objects.isEmptyArray(adress)){
                order.adress_street = adress[0].street
            }
            console.log(adress)
        }
     }

     // DROP DE CLIENT
     if(!knl.objects.isEmptyArray(orders)){
        for(const order of orders){
            const client = await knl.sequelize().models.Client.findAll({
                where : {
                    id : order.fkclient
                }
            })



            if(!knl.objects.isEmptyArray(client)){
                order.client_nameFantasy = client[0].nameFantasy
                console.log(client)
            }
        }
     }

    resp.json(orders);
    resp.end();

});

knl.get('order/:id', async (req, resp) => {

    const customers =  knl.objects.copy(await knl.sequelize().models.Order.findAll({
        where: {
            id : req.params.id,
            status: 1
        }
    }));

    for(const customer of customers){
        const products = knl.objects.copy(await knl.sequelize().models.ProdOrder.findAll({
            where: {
                fkorder : customer.id,
                status: 1
            }
        }))

        customer.products = products;
    }

    resp.json(customers[0]);
})

knl.patch('order', async (req, resp) => {
    if(req.body.status == 1){
         await knl.sequelize().models.Order.update({
            status: "1"
        }, {
            where: {
                id: req.body.id,
            }
        });
        resp.send("Ativado");
    } else {
        await knl.sequelize().models.Order.update({
            status: "0"
        }, {
            where: {
                id: req.body.id,
            }
        });
        resp.send("Desativado");
    }
       
});

knl.get("ordersearch/:fkclient", async (req, resp) => {
    const query = `%${req.params.fkclient}%`; 

    const result = await knl.sequelize().models.Order.findAll({
      where: { Order: { [Op.like]: query },
    status : 1 }
    });

    resp.json(result);
})

