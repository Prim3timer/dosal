const router = require('express').Router()
let Excercise = require('../modules/excercise.model')   

let getAllExcercise = async (req, res)=> {
    // let data = await readFile(filePath2, 'utf-8')
    const excercise = await Excercise.find()
    if (!excercise) res.status(204).json({'message': 'no excercise found'})
    res.status(201).json({excercise})
}

let getAnExcercise = async(req, res) => {
    let id = req.params.id
    let currentExcercise = await Excercise.findById(id)
    res.json(currentExcercise)
}

let createExcercise = async(req, res)=> {
    if(!req.body.username){
        return res.status(400).json({'message': 'username and description, duration and date is required'})
    }
    try {
        const newExcercise = await Excercise.create({
            username: req.body.username,
            description: req.body.description,
            duration: req.body.duration,
            date: req.body.date
        })

        // SORT THE ARRAY
        // let sortedList = employees.sort((a, b) => {
        //     let nameA = a.id
        //     let nameB = b.id
        //    if (nameA < nameB) return -1
        //    if (nameA > nameB) return 1
        //   return 0
        // })
        // let empString = JSON.stringify(sortedList, null, 2)
        // writeFile(filePath, empString)
        res.status(201).send(`Excercise Added`)
    } catch (error) {
        res.status(400).json({'message': error})
    }

     
}

let updateExcercise = async (req, res) =>{
    const id = req.params.id
   
     const currentExcercise = await Excercise.updateOne({
        _id: id}, 
         {
        username: req.body.username,
        description: req.body.description,
        duration: req.body.duration,
        date: Date.parse(req.body.date)

    })
//    await currentExcercise.save()
    res.json(currentExcercise)
}

let deleteExcercise = async (req, res) => {
    let id = req.params.id
    await Excercise.deleteOne({_id: id})
    res.send(`employee with id: ${id} has been  deleted`)

}



router.route('/').get(getAllExcercise)

router.route('/').post(createExcercise)

router.route('/update/:id').put(updateExcercise)

router.route('/:id').get(getAnExcercise)

router.route('/remove/:id').delete(deleteExcercise)
module.exports = router