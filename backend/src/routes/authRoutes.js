const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const authController = require("../controllers/authContoller");

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(12).required(),
  password: Joi.string().min(6).max(12).required(),
  mail: Joi.string().email().required(),
});
const loginSchema = Joi.object({
  password: Joi.string().min(6).max(12).required(),
  mail: Joi.string().email().required(),
});

router.post("/login", validator.body(loginSchema), authController.login);
router.post(
  "/register",
  validator.body(registerSchema),
  authController.register
);
router.post("/logout", authController.logout);
router.get("/refresh", authController.refresh);

module.exports = router;
