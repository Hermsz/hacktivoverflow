const QuestionModel = require('../models/question')
const AnswerModel = require('../models/answer')

class QuestionController {

  // Find All Questions Listed Already
  static findAll(req, res) {

    // console.log('masukkkk kesiniii: 1 Find All Question')

    QuestionModel
      .find()
      .populate('userId')
      .then(allAnswer => {
        res.status(200).json(allAnswer)
      })
      .catch(err => {
        console.log('Masuk Error Find All Question 1')
        res.status(500).json(err)
      })
  }

  // Find One Question in List by Question ID
  static findById(req, res) {

    QuestionModel
      .findById(req.params.questionId)
      .populate('userId')
      .then(foundQuestion => {
        res.status(200).json(foundQuestion)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  // Find User Question
  static findUserQuestion(req, res) {

    let userId = req.authenticatedUser.id

    QuestionModel
      .findById(userId)
      .then(usersQuestion => {
        console.log(usersQuestion)
        console.log('masuk success findUserQuestion')
        res.status(200).json(usersQuestion)
      })
      .catch(err => {
        console.log('masuk error findUser Question')
        res.status(500).json(err)
      })
  }



  // Create new Question
  static createQuestion(req, res) {

    let newQuestion = {
      title: req.body.title,
      description: req.body.description,
      upvotes: [],
      downvotes: [],
      userId: req.authenticatedUser.id
    }

    QuestionModel
      .create(newQuestion)
      .then(question => {
        res.status(200).json(question)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  // Update a Question
  static updateQuestion(req, res) {
    console.log('masukkkkkkkkkk')

    QuestionModel
      .findByIdAndUpdate(req.params.questionId, { ...req.body })
      .then(updatedQuestion => {
        res.status(200).json(updatedQuestion)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  // Delete a Question
  static deleteQuestion(req, res) {
    QuestionModel
      .findByIdAndDelete(req.params.questionId)
      .then(deletedQuestion => {
        res.status(200).json(deletedQuestion)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
  

  // Upvote a Question
  static upvote(req, res) {


    let userId = req.authenticatedUser.id

    QuestionModel
      .findById(req.params.questionId)
      .then(foundQuestion => {

        let { upvotes, downvotes } = foundQuestion
        let foundUserUpvote = upvotes.find(e => e == userId)
        let foundUserDownvote = downvotes.find(e => e == userId)

        if(foundUserUpvote) {
          res.status(400).json(`You cannot upvote the same question twice!!`)
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
        res.status(200).json(`Succesfully updated question`)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  // Downvote a Question
  static downvote(req, res) {

    let userId = req.authenticatedUser.id

    QuestionModel
      .findById(req.params.questionId)
      .then(foundQuestion => {
        console.log(foundQuestion)

        let { upvotes, downvotes } = foundQuestion

        let foundUserUpvote = upvotes.find(e => e == userId)
        let foundUserDownvote = downvotes.find(e => e == userId)

        if(foundUserDownvote) {
          res.status(400).json(`You cannot downvote the same question twice!!`)
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
        res.status(200).json(`Succesfully downvote question`)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }



}

module.exports = QuestionController