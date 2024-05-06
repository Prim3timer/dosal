const router = require('express').Router()
const Result = require('../modules/result.model')
const MongoReq = require('../modules/mongoReq.model')
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const getAllQuestions = async (req, res)=> {
    const questions = await Result.find()
    if (!questions) res.status(204).json({'message': 'no questions found'})
    res.status(201).json({questions})
} 

const generateQuestions = async (req, res)=> {
  
    try {
        const result = await Result.create({
            candidate: req.body.candidate,
            q_no: req.body.q_no,
            questions: req.body.questions,
            attempt: req.body.attempt,
            answer: req.body.answer,
            date: req.body.date
        })
        
        const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `date:  ${dateTime}
    id: ${uuid()} 
     method: ${req.method} 
     origin: ${req.headers.origin} 
     address: ${req.url}`;
    MongoReq.create({
        log: logItem
    })
    
        res.status(201).send(`Question Added`)
    } catch (error) {
        res.status(400).json({'message': error})
    }
}
const getAResult = async(req, res)=> {
    
    const response = await Result.findOne({candidate: req.body.candidate})
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
      const logItem = `date:  ${dateTime}
      id: ${uuid()} 
       method: ${req.method} 
       origin: ${req.headers.origin} 
       address: ${req.url}`;
      MongoReq.create({
          log: logItem
      })
    res.json(response)
}




router.route('/').get(getAllQuestions)
router.route('/:candidate').get(getAResult)
router.route('/').post(generateQuestions)
module.exports = router