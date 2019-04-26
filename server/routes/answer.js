const router = require('express').Router()
const answerController = require('../controllers/answerController')
const { authentication } =require('../middlewares/authentication')

router.get('/', answerController.findAll)
router.get('/:id', answerController.findById)
router.get('/:answerId', answerController.findById )
router.get('/all/:questionId', answerController.findAnswerByQuestion)
router.use(authentication)

router.post('/:questionId', answerController.createAnswer)
router.put('/:answerId', answerController.updateAnswer)
router.patch('/upvote/:answerId', answerController.upvote)
router.patch('/downvote/:answerId', answerController.downvote)

router.delete('/:questionId', answerController.deleteAnswer)

module.exports = router