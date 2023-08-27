const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { signupSchema, authSchema } = require('../helpers/validateSchema');

//SIGNUP

/**
 * @swagger
 * /server/auth/signup:
 *   post:
 *     summary: Create a new user 
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */

router.post("/signup", async (req, res) => {
  try {

    const result = await signupSchema.validateAsync(req.body);

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPass,
      isAdmin: req.body.isAdmin
    });

    const user = await newUser.save();
    res.status(200).json("User successfully created");
  } catch (err) {
    if (err.isJoi == true){ res.status = 422; res.json(err.message)}
    else{
      res.status(500).json(err);
    }
  }
});

//LOGIN

/**
 * @swagger
 * /server/auth/login:
 *   post:
 *      tags:
 *          - Authorization
 *      summary: "Returns Authorization Token"
 *      description: "Authorizes default users with username and password set as root to use the endpoints"
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *              example:
 *                  email: "user@root.com"
 *                  password: "root"
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "Authorization token"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                      example:
 *                          "data": "token"
 *
 */

router.post("/login", async (req, res) => {
  try {

    const result = await authSchema.validateAsync(req.body);

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json("Wrong credentials!");
    }

    const validated = await bcrypt.compare(req.body.password, user.password);
    
    if (!validated) {
      return res.status(400).json("Wrong credentials!");
    }
    const generateAccessToken = (user) => {
      return jwt.sign({ email: user.email, isAdmin: user.isAdmin, userId: user._id }, "mySecretKey",);
    };
    const accessToken = generateAccessToken(user);
    const { password, ...others } = user._doc;
    res.status(200).json({others, accessToken});
  }catch (err) {
    if (err.isJoi == true){ res.status = 422; res.json(err.message)}
    else{
      res.status(500).json(err);
  }
}
});

module.exports = router;