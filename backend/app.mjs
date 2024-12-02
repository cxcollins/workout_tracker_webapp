import express from 'express'
const app = express()
import pg from 'pg'

const { Pool } = pg

const port = 3000

const pool = new Pool({
    user: 'postgres',
    host: 'postgres',
    database: 'mytestdb',
    password: 'mypassword',
    port: 5432
})

app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM angular_table')
        res.json(result.rows)
    } catch (err) {
        console.error(err)
        res.status(500).send('error')
    }
  });

  app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM angular_table')
        res.json(result.rows)
    } catch (err) {
        console.error(err)
        res.status(500).send('error')
    }
  });
  
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });