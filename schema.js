const Joi = require('joi');
//ab hm apna schema likhe ke jisse hme validate krna h
module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
      location:Joi.string().required(),
       country:Joi.string().required(),
       price:Joi.number().required().min(0),
         image:Joi.string().allow("",null)

                    
    }).required()
});