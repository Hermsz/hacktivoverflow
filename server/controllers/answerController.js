const AnswerModel = require('../models/answer')

class AnswerController {

  // Find All Answer
  static findAll(req, res) {
    AnswerModel
        .find()
        .populate('questionId')
        .populate('userId')
        .then(allAnswer => {
          res.status(200).json(allAnswer)
        })
        .catch(err => {
          res.status(500).json(err)
        })
  }

  // Find one Answer
  static findById(req, res) {
    AnswerModel
        .findById(req.params.id)
        .populate('questionId')
        .populate('userId')
        .then(answer => {
          res.status(200).json(answer)
        })
        .catch(err => {
          res.status(500).json(err)
        })
  }

  static findAnswerByQuestion(req, res) {
      AnswerModel
          .find({
            questionId : req.params.questionId
          })
          .populate('userId')
          .then(answer => {
            console.log(answer, '=======')
            console.log('masukkkk sukses find answer')
            res.status(200).json(answer)
          })
          .catch(err => {
            console.log('Masukkkk errorrrrr')
            res.status(500).json(err)
          })
  }

  // Create A New Answer
  static createAnswer(req, res) {

    console

    let newAnswer = {
      title: req.body.title,
      description: req.body.description,
      upvotes: [],
      downvotes: [],
      questionId: req.params.questionId,
      userId: req.authenticatedUser.id
    }

    AnswerModel
        .create(newAnswer)
        .then(answer => {
          res.status(200).json(answer)
        })
        .catch(err => {
          res.status(500).json(err)
        })
  }

  // Update an Answer
  static updateAnswer(req, res) {
    
    AnswerModel
        .findByIdAndUpdate(req.params.id, {...req.body})
        .then(updatedAnswer => {
          res.status(200).json(updatedAnswer)
        })
        .catch(err => {
          res.status(500).json(err)
        })
  }

    // Upvote an Answer
    static upvote(req, res) {

      let userId = req.authenticatedUser.id
  
      AnswerModel
        .findById(req.params.questionId)
        .then(foundQuestion => {
  
          let { upvotes, downvotes } = foundQuestion
          let foundUserUpvote = upvotes.find(e => e == userId)
          let foundUserDownvote = downvotes.find(e => e == userId)
  
          if(foundUserUpvote) {
            res.status(400).json(`You cannot upvote the same answer twice!!`)
          } else if(foundUserDownvote) {
            downvotes = downvotes.filter(user => user != userId)
          } else {
            upvotes.push(userId)
          }

          return QuestionModel
          .findByIdAndUpdate(foundQuestion._id, {
            upvotes,
            downvotes
          })
        })
        .then(() => {
          res.status(200).json(`Succesfully upvote answer`)
        })
        .catch(err => {
          res.status(500).json(err)
        })
    }
  
    // Downvote an Answer
    static downvote(req, res) {
  
      let userId = req.authenticatedUser.id
  
      AnswerModel
        .findById(req.params.questionId)
        .then(foundQuestion => {
          console.log(foundQuestion)
  
          let { upvotes, downvotes } = foundQuestion
  
          let foundUserUpvote = upvotes.find(e => e == userId)
          let foundUserDownvote = downvotes.find(e => e == userId)
  
          if(foundUserDownvote) {
            res.status(400).json(`You cannot downvote the same answer twice!!`)
          } else if(foundUserUpvote) {
            upvotes = upvotes.filter(user => user != userId)
          } else {
            downvotes.push(userId)
          }
          return QuestionModel
          .findByIdAndUpdate(foundQuestion._id, {
            upvotes,
            downvotes
          })
        })
        .then(() => {
          res.status(200).json(`Succesfully downvote answer`)
        })
        .catch(err => {
          res.status(500).json(err)
        })
    }
  

}

module.exports = AnswerController