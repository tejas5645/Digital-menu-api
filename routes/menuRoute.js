// const express = require('express')
// const route = express.Router()
// const db = require('./db')

// route.get('/', async (req, res) => {

//     try {
//         const result = await db.query('select mid,mname,fg_name,qtype,price from menu_card,food_group,qty where menu_card.mtype=food_group.fid and menu_card.mqty=qty.qid')
//         res.status(200).json({ menu: result.rows })

//     } catch (err) {
//         console.log(err.message)
//         res.status(500).send('Server Error')

//     }
// });

// route.get('/:mid', async (req, res) => {

//     const { mid } = req.params


//     try {
//         const checkMenu = await db.query('select * from menu_card where mid=$1', [mid])
//         if (checkMenu.rows.length === 0) {
//             return res.status(404).json({ message: "Menu not found" })
//         }

//         const result = await db.query('select * from menu_card where mid=$1', [mid])
//         res.status(200).json({ menu: result.rows })

//     } catch (err) {
//         console.log(err.message)
//         res.status(500).send('Server Error')
//     }
// });

// route.get('/:nm', async (req, res) => {

//     const { nm } = req.params

//     try {
//         const checkMenu = await db.query('select * from menu_card where mname ilike $1', [`%${nm}%`]) //use ilike for case insesitivity
//         if (checkMenu.rows.length === 0) {
//             return res.status(404).json({ message: "Not found" })
//         }

//         res.json({ menu: result.rows })

//     } catch (err) {
//         console.log(err.message)
//         res.status(500).send('Server Error')
//     }
// });

// route.post('/', async (req, res) => {


//     try {
//         const { mname, mtype, mqty, price } = req.body

//         if (!mname || !mtype || !mqty || !price) {
//             res.status(400).json({ message: "All fields are required" })
//         }

//         const checkMenu = await db.query('select * from menu_card where mname=$1', [mname])
//         if (checkMenu.rows.length !== 0) {
//             return res.status(404).json({ message: "Menu already exists" })
//         }

//         const result = await db.query('INSERT INTO menu_card(mname,mtype,mqty,price) VALUES ($1,$2,$3,$4) RETURNING *', [mname, mtype, mqty, price])
//         res.status(201).json({ message: "Added Successfully", menu: result.rows[0] })

//     } catch (err) {
//         console.log(err.message)
//         res.status(500).send('Server Error')
//     }

// });

// route.put('/:mid', async (req, res) => {
//     const { mid } = req.params


//     try {
//         const checkMenu = await db.query('select * from menu_card where mid=$1', [mid])
//         if (checkMenu.rows.length === 0) {
//             return res.status(404).json({ message: "Menu not found" })
//         }

//         const { mname, mtype, mqty, price } = req.body

//         if (!mname || !mtype || !mqty || !price) {
//             res.status(400).json({ message: "All fields are required" })
//         }

//         const result = await db.query('UPDATE menu_card SET mname=$1,mtype=$2,mqty=$3,price=$4 WHERE mid=$5 RETURNING *', [mname, mtype, mqty, price, mid])
//         res.status(200).json({ message: "Updated Successfully", menu: result.rows })

//     } catch (err) {
//         console.log(err.message)
//         res.status(500).send('Server Error')
//     }

// });

// route.put('/price/:mid', async (req, res) => {

//     const { mid } = req.params

//     try {
//         const checkMenu = await db.query('select * from menu_card where mid=$1', [mid])
//         if (checkMenu.rows.length === 0) {
//             return res.status(404).json({ message: "Menu not found" })
//         }

//         const { price } = req.body

//         if (!price) {
//             res.status(400).json({ message: "All fields are required" })
//         }

//         const result = await db.query('UPDATE menu_card SET price=$1 WHERE mid=$2 RETURNING *', [price, mid])
//         res.status(200).json({ message: "Price Updated Successfully", menu: result.rows })

//     } catch (err) {
//         console.log(err.message)
//         res.status(500).send('Server Error')
//     }

// });

// route.delete('/:mid', async (req, res) => {

//     const { mid } = req.params

//     try {
//         const checkMenu = await db.query('select * from menu_card where mid=$1', [mid])
//         if (checkMenu.rows.length === 0) {
//             return res.status(404).json({ message: "Menu not found" })
//         }

//         await db.query('delete from menu_card where mid=$1', [mid])
//         res.status(200).json({ message: "Deleted Successfully" })

//     } catch (err) {
//         console.log(err.message)
//         res.status(500).send('Server Error')
//     }
// });

// module.exports = route



const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

router.get('/', menuController.getMenu);
router.get('/:mid', menuController.getMenuById);
router.get('/name/:nm', menuController.getMenuByName);
router.post('/', menuController.postMenu);
router.put('/:mid', menuController.putMenu);
router.put('/price/:mid', menuController.putMenuPrice);
router.delete('/:mid', menuController.deleteMenu);

module.exports = router;
