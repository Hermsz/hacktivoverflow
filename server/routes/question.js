const router = require('express').Router()
const questionController = require('../controllers/questionController')
const { authentication } = require('../middlewares/authentication')

router.get('/', questionController.findAll)
router.get('/:id', questionController.findById )
router.use(authentication)

// Find User Question
router.get('/:userId', questionController.findUserQuestion)

router.post('/', questionController.createQuestion)
router.delete('/', questionController.deleteQuestion)
router.patch('/upvote/:questionId', questionController.upvote)
router.patch('/downvote/:questionId', questionController.downvote)

module.exports = router