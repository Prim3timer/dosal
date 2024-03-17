const router = require('express').Router()
let User = require('../modules/user.model')

let getAllUsers = async (req, res)=> {
    // let data = await readFile(filePath2, 'utf-8')
    const users = await User.find()
    if (!users) res.status(204).json({'message': 'no employees found'})
    res.send(users)
   
}

let createUser = async(req, res)=> {
    
    if(!req?.body?.username){
        return res.status(400).json({'message': 'username required'})
    }
    try {
        const newUser = await User.create({
            username: req.body.username
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
        res.status(201).json(newUser) 
    } catch (error) {
        res.status(400).json({'message': error})
    }

     
}

let deleteUser =async (req, res)=> {
    let id = req.params.id
    await User.deleteOne({_id: id})
    res.json({msg: `user with id: ${id} deleted`})
}



router.route('/').get(getAllUsers)

router.route('/post').post(createUser)

router.route('/delete/:id').delete(deleteUser)

module.exports = router