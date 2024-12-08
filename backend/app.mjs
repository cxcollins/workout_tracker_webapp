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

  app.get('/:user/:exercise', async (req, res) => {
    const id = req.params.user
    const exercise = req.params.exercise

    try {
        const result = await pool.query('SELECT exercise_name, TO_CHAR(date, \'YYYY-MM-DD\') AS date, weight, reps FROM angular_table WHERE person = $1 AND exercise_name = $2', [id, exercise])
        res.json(result.rows)
    } catch (err) {
        console.error(err)
        res.status(500).send('error')
    }
  })

  app.get('/:user/:exercise/:date', async (req, res) => {
    const id = req.params.user
    const exercise = req.params.exercise
    const date = req.params.date
    try {
        const result = await pool.query('SELECT exercise_name, TO_CHAR(date, \'YYYY-MM-DD\') AS date, weight, reps FROM angular_table WHERE person = $1 AND TO_CHAR(date, \'YYYY-MM-DD\') = $3 AND exercise_name = $2', [id, exercise, date])
        res.json(result.rows)
    } catch (err) {
        console.error(err)
        res.status(500).send('error')
    }
  })

  app.get('/lookup-user/:user', async (req, res) => {
    const id = req.params.user
    console.log(id)
    try {
        const result = await pool.query('SELECT exercise_name, TO_CHAR(date, \'YYYY-MM-DD\') AS date, weight, reps FROM angular_table WHERE person = $1', [id])
        if(result.rows.length > 0){res.json(result.rows)}
        else {res.status(404).send('No users found')}
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

    if(weightInt > 0 && repsInt > 0) {
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
  }
  else {
    res.status(204)
  }
})
  
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });