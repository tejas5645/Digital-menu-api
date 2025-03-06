const db = require('../db')

const getMenu = async (req, res) => {

    try {
        // const result = await db.query('select mid,mname,fg_name,qtype,price from menu_card,food_group,qty where menu_card.mtype=food_group.fid and menu_card.mqty=qty.qid')

        const result = await db.query('select * from menu_card ')


        res.status(200).json({ menu: result.rows })

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')

    }
}

const getMenuById = async (req, res) => {

    const { mid } = req.params

    try {

        const checkMenu = await db.query('select mid,mname,fg_name,qtype,price from menu_card,food_group,qty where mid=$1 and menu_card.mtype=food_group.fid and menu_card.mqty=qty.qid', [mid])
        if (checkMenu.rows.length === 0) {
            return res.status(404).json({ message: "Menu not found" })
        }


        const result = await db.query('select mid,mname,fg_name,qtype,price from menu_card,food_group,qty where  mid=$1 and menu_card.mtype=food_group.fid and menu_card.mqty=qty.qid', [mid])
        res.status(200).json({ menu: result.rows })

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
}

const getMenuByName = async (req, res) => {

    const { nm } = req.params

    try {
        const checkMenu = await db.query('select mid,mname,fg_name,qtype,price from menu_card,food_group,qty where mname ilike $1 and  menu_card.mtype=food_group.fid and menu_card.mqty=qty.qid', [`%${nm}%`]) //use ilike for case insesitivity
        if (checkMenu.rows.length === 0) {
            return res.status(404).json({ message: "Not found" })
        }

        res.status(200).json({ menu: checkMenu.rows })

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
}

const postMenu = async (req, res) => {

    try {
        const { mname, mtype, mqty, price } = req.body

        if (!mname || !mtype || !mqty || !price) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const checkMenu = await db.query('select * from menu_card where mname ilike $1', [`%${mname}%`])
        if (checkMenu.rows.length !== 0) {
            return res.status(404).json({ message: "Menu already exists" })
        }

        const checkFoodGroup = await db.query('select * from food_group where fid=$1', [mtype])
        if (checkFoodGroup.rows.length === 0) {
            return res.status(404).json({ message: "Food_Group not found" })
        }

        const checkQuantity = await db.query('select * from qty where qid=$1', [mqty])
        if (checkQuantity.rows.length === 0) {
            return res.status(404).json({ message: "Quantity not found" })
        }

        const result = await db.query('INSERT INTO menu_card(mname,mtype,mqty,price) VALUES ($1,$2,$3,$4) RETURNING *', [mname, mtype, mqty, price])
        res.status(201).json({ status:201, message: "Added Successfully", menu: result.rows[0] })

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
}

const putMenu = async (req, res) => {

    const { mid } = req.params

    try {
        const checkMenu = await db.query('select * from menu_card where mid=$1', [mid])
        if (checkMenu.rows.length === 0) {
            return res.status(404).json({ message: "Menu not found" })
        }

        const { mname, mtype, mqty, price } = req.body

        if (!mname || !mtype || !mqty || !price) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const checkFoodGroup = await db.query('select * from food_group where fid=$1', [mtype])
        if (checkFoodGroup.rows.length === 0) {
            return res.status(404).json({ message: "Food_Group not found" })
        }

        const checkQuantity = await db.query('select * from qty where qid=$1', [mqty])
        if (checkQuantity.rows.length === 0) {
            return res.status(404).json({ message: "Quantity not found" })
        }

        const result = await db.query('UPDATE menu_card SET mname=$1,mtype=$2,mqty=$3,price=$4 WHERE mid=$5 RETURNING *', [mname, mtype, mqty, price, mid])
        res.status(200).json({ message: "Updated Successfully", menu: result.rows })

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
}

const putMenuPrice = async (req, res) => {

    const { mid } = req.params

    try {
        const checkMenu = await db.query('select * from menu_card where mid=$1', [mid])
        if (checkMenu.rows.length === 0) {
            return res.status(404).json({ message: "Menu not found" })
        }

        const { price } = req.body

        if (!price) {
            res.status(400).json({ message: "All fields are required" })
        }

        const result = await db.query('UPDATE menu_card SET price=$1 WHERE mid=$2 RETURNING *', [price, mid])
        res.status(200).json({ message: "Price Updated Successfully", menu: result.rows })

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
}


const deleteMenu = async (req, res) => {

    const { mid } = req.params

    try {
        const checkMenu = await db.query('select * from menu_card where mid=$1', [mid])
        if (checkMenu.rows.length === 0) {
            return res.status(404).json({ message: "Menu not found" })
        }

        await db.query('delete from menu_card where mid=$1', [mid])
        res.status(200).json({ message: "Deleted Successfully" })

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }

}


module.exports = {
    getMenu,
    getMenuById,
    getMenuByName,
    postMenu,
    putMenu,
    putMenuPrice,
    deleteMenu
}
