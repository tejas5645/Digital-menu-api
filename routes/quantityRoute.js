// const express = require('express')
// const route = express.Router()
// const db = require('./db')


// route.get('/', async (req, res) => {

//     try {
//         const result = await db.query('select * from qty')
//         res.json({ qtypes: result.rows })

//     } catch (err) {
//         console.log(err.message)
//         res.status(500).send('Server Error')

//     }
// });

// route.get('/:qid', async (req, res) => {

//     const { qid } = req.params

//     try {
//         const checkQuantity = await db.query('select * from qty where qid=$1', [qid])
//         if (checkQuantity.rows.length === 0) {
//             return res.status(404).json({ message: "Quantity not found" })
//         }

//         const result = await db.query('select * from qty where qid=$1', [qid])
//         res.json({ qtype: result.rows })

//     } catch (err) {
//         console.log(err.message)
//         res.status(500).send('Server Error')
//     }
// });

// route.post('/', async (req, res) => {

//     try {
//         const { qtype } = req.body

//         if (!qtype) {
//             res.status(400).json({ message: "All fields are required" })
//         }

//         const checkQtype = await db.query('select * from quantity where qtype=$1', [qtype])
//         if (checkQtype.rows.length > 0) {
//             return res.status(404).json({ message: "Qauntity already exists" })
//         }

//         const result = await db.query('INSERT INTO qty(qtype) VALUES ($1) RETURNING *', [qtype])
//         res.status(201).json({ message: "Added Successfully", qtype: result.rows })

//     } catch (err) {
//         console.log(err.message)
//         res.status(500).send('Server Error')
//     }
// });

// route.put('/:qid', async (req, res) => {

//     const { qid } = req.params

//     try {
//         const checkQuantity = await db.query('select * from qty where qid=$1', [qid])
//         if (checkQuantity.rows.length === 0) {
//             return res.status(404).json({ message: "Quantity not found" })
//         }

//         const { qtype } = req.body
//         const result = await db.query('UPDATE qty SET qtype=$1 WHERE qid=$2 RETURNING *', [qtype, qid])
//         res.status(200).json({ message: "Updated Successfully", qtype: result.rows })

//     } catch (err) {
//         console.log(err.message)
//         res.status(500).send('Server Error')
//     }
// });

// route.delete('/:qid', async (req, res) => {

//     const { qid } = req.params

//     try {
//         const checkQuantity = await db.query('select * from qty where qid=$1', [qid])
//         if (checkQuantity.rows.length === 0) {
//             return res.status(404).json({ message: "Quantity not found" })
//         }

//         await db.query('delete from qty where qid=$1', [qid])
//         res.status(200).json({ message: "Deleted Successfully" })

//     } catch (err) {
//         console.log(err.message)
//         res.status(500).send('Server Error')
//     }
// });

// module.exports = route


const express = require('express');
const router = express.Router();
const qauntityController = require('../controllers/quantityController');

router.get('/', qauntityController.getQuantity);
router.get('/:qid', qauntityController.getQuantityById);
router.post('/', qauntityController.postQuantity);
router.put('/:qid', qauntityController.putQuantity);
router.delete('/:qid', qauntityController.deleteQuantity);

module.exports = router;
