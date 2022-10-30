import Joi from 'joi'
import joiObjectid from 'joi-objectid'
Joi.objectId = joiObjectid(Joi)

export const newcarSchema = Joi.object({
  carModel: Joi.string().required().max(30),
  carBrand: Joi.string().required().max(20),
  carColor: Joi.string().required().max(30),
  carDescription: Joi.string().required().max(70),
  carYear: Joi.string().required().max(4).min(4),
  carPlate: Joi.string().required().max(15),
  carPrice: Joi.string().required().max(15)
})

export const filterSchema = Joi.object({
  carBrand: Joi.string().required().max(25),
  carColour: Joi.string().required().max(30),
  carYear: Joi.string().required().max(4).min(4),
  LowestPrice: Joi.string(),
  HighestPrice: Joi.string()
})

export const deleteCarSchema = Joi.object({
  id: Joi.objectId().required()
})

export const editCarSchema = Joi.object({
  id: Joi.objectId(),
  carModel: Joi.string(),
  carBrand: Joi.string(),
  carColor: Joi.string(),
  carDescription: Joi.string(),
  carYear: Joi.string(),
  carPlate: Joi.string(),
  carPrice: Joi.string(),
  isLiked: Joi.boolean()
})
