const Joi = require('joi');
const knl = require('../knl');
const { Op } = require("sequelize")
knl.post('product', async (req, resp) => {
    const schema = Joi.object({
        description: Joi.string().min(1).max(100).required(),
        price: Joi.number().min(0.01).required(),
        fkgroup: Joi.number().min(1).required(),
        fksubgroup: Joi.number().min(1).required(),
        fkcollection: Joi.number().min(1).required(),
    })

    knl.validate(req.body, schema);

    const result = await knl.sequelize().models.Product.findAll({
        where: {
            description: req.body.description,
            price: req.body.price,
            status: 1,
            fkgroup : req.body.fkgroup,
            fksubgroup : req.body.fksubgroup,
            fkcollection : req.body.fkcollection
        }
    })

    knl.createException('0009', '', !knl.objects.isEmptyArray(result));

    const description = knl.sequelize().models.Product.build({
        description: req.body.description,
        price: req.body.price,
        status: 1,
        fkgroup : req.body.fkgroup,
        fksubgroup : req.body.fksubgroup,
        fkcollection : req.body.fkcollection
    });

    await description.save();
    resp.end();
})

// knl.get('product', async (req, resp) => {
//     const result = await knl.sequelize().models.Product.findAll({
//         where: {
//             status: 1
//         }
//     })
//     resp.send(result);
//     resp.end();
// });


knl.get('product', async(req, resp) => {

    const products = knl.objects.copy(await knl.sequelize().models.Product.findAll({
        where : {
            status : 1
        }
     }))

    // DROP DE GRUPO
     if(!knl.objects.isEmptyArray(products)){
        for(const product of products){
            const group = await knl.sequelize().models.Group.findAll({
                where : {
                    id : product.fkgroup
                }
            })
            if(!knl.objects.isEmptyArray(group)){
                product.group_description = group[0].description
            }
            console.log(product.group_description)
        }
     }

      // DROP DE SUBGRUPO
     if(!knl.objects.isEmptyArray(products)){
        for(const product of products){
            const subgroup = await knl.sequelize().models.Subgroup.findAll({
                where : {
                    id : product.fksubgroup
                }
            })
            if(!knl.objects.isEmptyArray(subgroup)){
                product.subgroup_description = subgroup[0].description
            }
        }
     }

     
      // DROP DE COLEÇÃO
     if(!knl.objects.isEmptyArray(products)){
        for(const product of products){
            const collection = await knl.sequelize().models.Collection.findAll({
                where : {
                    id : product.fkcollection
                }
            })
            if(!knl.objects.isEmptyArray(collection)){
                product.collection_description = collection[0].description
            }
        }
     }
    resp.send(products);
    resp.end();

});

knl.put('product', async (req, resp) => {
    const result = await knl.sequelize().models.Product.update({
        description: req.body.description,
        price: req.body.price,
        fkgroup : req.body.fkgroup,
        fksubgroup : req.body.fksubgroup,
        fkcollection : req.body.fkcollection
    }, {
        where: {
            id: req.body.id
        }
    });

    resp.send(result);
})


knl.patch('product', async (req, resp) => {
    if(req.body.status == 1){
         await knl.sequelize().models.Product.update({
            status: "1"
        }, {
            where: {
                id: req.body.id,
            }
        });
        resp.send();
    } else {
         await knl.sequelize().models.Product.update({
            status: "0"
        }, {
            where: {
                id: req.body.id,
            }
        });
        resp.send();
    }
       
});

knl.get("productsearch/:productname", async (req, resp) => {
    const query = `%${req.params.productname}%`; 

    const result = await knl.sequelize().models.Product.findAll({
      where: { description: { [Op.like]: query },
      status : 1 }
    });

    resp.json(result);
})

knl.get("product/:id", async (req, resp) => {
    const query = `%${req.params.id}%`; 

    const result = await knl.sequelize().models.Product.findAll({
      where: { id: { [Op.like]: query },
    status : 1 }
    });

    resp.json(result);
})

