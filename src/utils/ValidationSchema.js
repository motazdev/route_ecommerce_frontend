import joi from "joi";

const priceFilterValidator = (value, helper) => {
  const { min, max } = value;
  console.log("min : ", min);
  console.log("max : ", max);
  console.log("Asfasf111111111111");
  if (min > max) {
    console.log("asdy8oasihfhay8sfuhkj");
    console.log("helpers: ", helper);
    return helper.message("Please enter a valid price");
  }

  return value;
};

export const registerSchema = joi
  .object({
    email: joi
      .string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.base": `Please enter a valid email address`,
        "string.empty": `Please enter a valid email address`,
        "any.required": `Please enter a valid email address`,
      }),
    username: joi.string().min(3).max(10).required().messages({
      "string.base": `Please enter a valid username`,
      "string.empty": `Please enter a valid username`,
      "any.required": `Please enter a valid username`,
      "string.min": `Username must be at least 3 characters long`,
      "string.max": `Username must be at most 10 characters long`,
    }),
    password: joi.string().min(6).max(20).required().messages({
      "string.empty": `Please enter a valid password`,
      "string.min": `Password must be at least 6 characters long`,
      "string.max": `Password must be at most 20 characters long`,
      "any.required": `Please enter a valid password`,
    }),
    cpassword: joi.string().valid(joi.ref("password")).messages({
      "any.only": `Password doesn't match`,
    }),
    address: joi.any(),
    gender: joi.string().required().messages({
      "string.required": `please specify a gender`,
      "string.base": `please specify a gender`,
    }),
  })
  .required();

export const loginSchema = joi
  .object({
    email: joi
      .string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.base": `Please enter a valid email address`,
        "string.empty": `Please enter a valid email address`,
        "any.required": `Please enter a valid email address`,
        "string.email": `Please enter a valid email address`,
      }),
    password: joi.string().min(6).max(20).required().messages({
      "string.empty": `Please enter a valid password`,
      "string.min": `Password must be at least 6 characters long`,
      "string.max": `Password must be at most 20 characters long`,
      "any.required": `Please enter a valid password`,
    }),
    remeberMe: joi.boolean(),
  })
  .required();

export const forgetCodeSchema = joi
  .object({
    email: joi
      .string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.base": `Please enter a valid email address`,
        "string.empty": `Please enter a valid email address`,
        "any.required": `Please enter a valid email address`,
        "string.email": `Please enter a valid email address`,
      }),
  })
  .required();

export const resetPasswordSchema = joi.object({
  code: joi.string().required(),
  password: joi.string().min(6).max(20).required().messages({
    "string.empty": `Please enter a valid password`,
    "string.min": `Password must be at least 6 characters long`,
    "string.max": `Password must be at most 20 characters long`,
    "any.required": `Please enter a valid password`,
  }),
  confirmPassword: joi.string().valid(joi.ref("password")).required().messages({
    "string.base": `Please enter a valid password`,
    "any.only": `Password doesn't match`,
  }),
});

export const changePasswordSchema = joi.object({
  currentPassword: joi.string().min(6).max(20).required().messages({
    "string.empty": `Please enter a valid password`,
    "string.min": `Password must be at least 6 characters long`,
    "string.max": `Password must be at most 20 characters long`,
    "any.required": `Please enter a valid password`,
  }),
  password: joi.string().min(6).max(20).required().messages({
    "string.empty": `Please enter a valid password`,
    "string.min": `Password must be at least 6 characters long`,
    "string.max": `Password must be at most 20 characters long`,
    "any.required": `Please enter a valid password`,
  }),
  confirmPassword: joi.string().valid(joi.ref("password")).required().messages({
    "string.base": `Please enter a valid password`,
    "any.only": `Password doesn't match`,
  }),
});

export const priceFilterSchema = joi
  .object({
    min: joi.number().min(100).required().messages({
      "number.empty": `Please enter a valid price`,
      "number.min": `Minimum price must be at least 100`,
      "number.base": `Minimum price must be at least 100`,
      "any.required": `Please enter a valid price`,
    }),
    max: joi.number().min(100).required().messages({
      "number.empty": `Please enter a valid price`,
      "number.base": `Maximum price must be at least 100`,
      "number.max": `Minimum price must be at least 100`,
      "any.required": `Please enter a valid price`,
    }),
  })
  .custom(priceFilterValidator);
