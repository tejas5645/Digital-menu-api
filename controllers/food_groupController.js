const db=require('../db')

const getFood_group = async (req, res) => {

    try {
        const result = await db.query('select * from food_group')
        res.status(200).json({ food_groups: result.rows })

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
}

const getFood_groupById = async (req, res) => {

    const { fid } = req.params

    try {
        const result = await db.query('select * from food_group where fid=$1', [fid]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Food_group not found" });
        }

        res.status(200).json({ food_group: result.rows })

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
}

const postFood_group = async (req, res) => {

    try {
        const { fg_name } = req.body;

        if (!fg_name) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const checkFood_group = await db.query('select * from food_group where fg_name=$1', [fg_name]);
        if (checkFood_group.rows.length > 0) {
            return res.status(404).json({ message: "Food_group already exists" });
        }

        const result = await db.query('INSERT INTO food_group(fg_name) VALUES ($1) RETURNING *', [fg_name])
        res.status(201).json({ message: "Added Successfully", food_group: result.rows[0] });

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
}

const putFood_group = async (req, res) => {

    const { fid } = req.params

    try {
        const checkFood_group = await db.query('select * from food_group where fid=$1', [fid]);
        if (checkFood_group.rows.length === 0) {
            return res.status(404).json({ message: "Food_group not found" });
        }

        const { fg_name } = req.body

        if (!fg_name) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const result = await db.query('UPDATE food_group SET fg_name=$1 WHERE fid=$2 RETURNING *', [fg_name, fid])
        res.status(200).json({ message: "Updated Successfully", food_group: result.rows })

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
}

const deleteFood_group = async (req, res) => {

    const { fid } = req.params

    try {
        const checkFood_group = await db.query('select * from food_group where fid=$1', [fid]);
        if (checkFood_group.rows.length === 0) {
            return res.status(404).json({ message: "Food_group not found" });
        }

        await db.query('delete from food_group where fid=$1', [fid])
        res.status(200).json({ message: "Deleted Successfully" })

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
}

module.exports = {
    getFood_group,
    getFood_groupById,
    postFood_group,
    putFood_group,
    deleteFood_group
}
