const UserModel = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('../helpers/jwtConvert')

class UserController {

  //Find All Question
  static findAll(req, res) {
    UserModel
      .find()
      .then(users => {
        res.status(200).json(users)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  //Register a User
  static register(req, res) {
    UserModel
      .create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
      })
      .then(newUser => {
        res.status(201).json(newUser)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  // Local Login
  static webLogin(req, res) {
    UserModel
    .findOne({
      email: req.body.email
    })
    .then(foundUser => {
      if(!foundUser) {
        res.status(401).json('You are not registered')
      } else {
        const verifyPassword = bcrypt.compareSync(req.body.password, foundUser.password)
        if(!verifyPassword) {
          res.status(401).json({
            message: `Wrong password`
          })
        } else {
          let token = jwt.sign({
            id: foundUser._id,
            email: foundUser.email
          }, process.env.JWT_SECRET )
          req.headers.token = token
          res.status(200).json({
            token,
            foundUser
          })
        }
      }
    })
    .catch(err => {
        res.status(500).json(err)
      })
  }

}

module.exports = UserController
