// const express = require('express')
// const db = require('./db')
// const body_parser = require('body-parser')
// const menu_card = require('./routes/menu_card')
// const food_group = require('./routes/food_group')
// const quantity = require('./routes/quantity')

// const app = express()
// //middleware
// app.use(body_parser.json())
// app.use('/menu_card', menu_card)
// app.use('/food_group', food_group)
// app.use('/quantity', quantity)

// app.use(cors({
//     origin: '*', 
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'] 
// }));

// app.get('/', (req, res) => {
//     try {
//         res.send("<h1>Digital MenuCard</h1>")
//     } catch (err) {
//         console.log(err.message)
//         res.status(500).send('Server Error')
//     }
// });


// app.listen(3000, '127.0.0.1', () => {
//     console.log('Listening on 127.0.0.1:3000');
// });


const express = require('express')
const db = require('./db')
const body_parser = require('body-parser')
const menu = require('./routes/menuRoute')
const food_group = require('./routes/food_groupRoute')
const quantity = require('./routes/quantityRoute')
const cors = require('cors')

const app = express()

//Middlewares
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'] 
}));

app.use(body_parser.json())
app.use('/menu', menu)
app.use('/food_group', food_group)
app.use('/quantity', quantity)

console.log("connected")

app.get('/', (req, res) => {
    try {
        res.status(200).json({
            message: "Welcome to the Menu-Card API",
            description: "A simple REST API for managing a digital menu card, built with Express.js and PostgreSQL, supporting CRUD operations for menu items.",
            availableEndpoints: [

                { method: 'GET', endpoint: '/menu', description: 'Get all menu' },
                { method: 'GET', endpoint: '/menu/:mid', description: 'Get particular menu by mid' },
                { method: 'GET', endpoint: '/menu/name/:nm', description: 'Get all menu by letter or word' },
                { method: 'POST', endpoint: '/menu', description: 'Add a menu' },
                { method: 'PUT', endpoint: '/menu/:mid', description: 'Update a menu' },
                { method: 'PUT', endpoint: '/menu/price/:mid', description: 'Update a menu price' },
                { method: 'DELETE', endpoint: '/menu/:mid', description: 'Delete a menu by uid' },

                { method: 'GET', endpoint: '/food_group', description: 'Get all food_group' },
                { method: 'GET', endpoint: '/food_group/:fid', description: 'Get particular food_group by fid' },
                { method: 'POST', endpoint: '/food_group', description: 'Add a food_group' },
                { method: 'PUT', endpoint: '/food_group/:fid', description: 'Update a food_group' },
                { method: 'DELETE', endpoint: '/food_group/:fid', description: 'Delete a food_group by fid' },

                { method: 'GET', endpoint: '/quantity', description: 'Get all food_group' },
                { method: 'GET', endpoint: '/quantity/:qid', description: 'Get particular food_group by qid' },
                { method: 'POST', endpoint: '/quantity', description: 'Add a food_group' },
                { method: 'PUT', endpoint: '/quantity/:qid', description: 'Update a food_group' },
                { method: 'DELETE', endpoint: '/quantity/:qid', description: 'Delete a food_group by qid' },


        ]});

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



app.listen(3000, '127.0.0.1', () => {
    console.log('listning on 127.0.0.1:3000')
})