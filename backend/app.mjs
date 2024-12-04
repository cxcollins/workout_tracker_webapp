import express from 'express'
const app = express()
import pg from 'pg'
import cors from 'cors'

const { Pool } = pg

const port = 3000

const pool = new Pool({
    user: 'postgres',
    host: 'postgres',
    database: 'mytestdb',
    password: 'mypassword',
    port: 5432
})

app.use(express.json())
app.use(cors())

app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM angular_table')
        res.json(result.rows)
    } catch (err) {
        console.error(err)
        res.status(500).send('error')
    }
  });

  app.get('/:user', async (req, res) => {
    const id = req.params.user
    console.log(id)
    try {
        const result = await pool.query('SELECT exercise_name, TO_CHAR(date, \'YYYY-MM-DD\') AS date, weight, reps FROM angular_table WHERE person = $1', [id])
        res.json(result.rows)
    } catch (err) {
        console.error(err)
        res.status(500).send('error')
    }
  })

  app.post('/save-workout', async(req, res) => {
    const {person, date, exercise_name, weight, reps } = req.body

    const weightInt = parseInt(weight)
    const repsInt = parseInt(reps)

    console.log({person, date, exercise_name, weight, weightInt, reps, repsInt})

    try {
        const result = await pool.query(
            'INSERT INTO angular_table (person, date, exercise_name, weight, reps) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [person, date, exercise_name, weightInt, repsInt]
        )
    res.status(201).json(result.rows[0])
    }
     catch (err) {
        console.error(err)
        res.status(500).send('Error saving workout')
     }
  })
  
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });