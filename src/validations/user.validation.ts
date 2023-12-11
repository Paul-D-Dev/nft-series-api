import Joi from 'joi';

export const createUser = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    nameSeo: Joi.string().optional(),
    bio: Joi.string().optional(),
    isVerified: Joi.boolean().optional(),
    contractAddress: Joi.string().optional(),
    socialNetworks: Joi.array().items(Joi.object().keys({
        socialNetworkId: Joi.number().required(),
        profileUrl: Joi.string().required(),
        name: Joi.string().optional(),
        updatedAt: Joi.date().iso().optional()
      })
    ).required(),
    image: Joi.object().keys({
      alt: Joi.string().optional()
    }).optional()
  }),
  file: Joi.string().optional()
};

export const updateUser = {
  params: Joi.object().keys({
    id: Joi.number().integer(),
  }),
  body: {
    name: Joi.string().optional(),
    nameSeo: Joi.string().optional(),
    bio: Joi.string().optional(),
    isVerified: Joi.boolean().optional(),
    contractAddress: Joi.string().optional(),
  }
};
