const express = require("express");
const cors = require("cors")
const app = express();
const pool = require("./db")

// Middleware
app.use(cors());
app.use(express.json());


// Routes

// Create a question

app.post("/questions", async (req, res)=>{
    try {
        const { question, alternatives, answer_id, quiz, category } = req.body
        const newQuestion= await pool.query("INSERT INTO questions (question, alternatives, answer_id, quiz, category ) VALUES ($1, $2, $3, $4, $5) RETURNING * ", [question, alternatives, answer_id, quiz, category ])
        
        try {
            const newCategory = await pool.query("INSERT INTO categories (category) VALUES ($1)",[category])
        } catch (err) {
            console.error(err.message)
        }

        try {
            const newQuiz = await pool.query("INSERT INTO quizes (quiz) VALUES ($1)",[quiz])
        } catch (err) {
            console.error(err.message)
        }
        
        
        res.json(newQuestion.rows)
    } catch (err) {
        console.error(err.message)
    }
})

// GET 

// Get all questions

app.get("/questions", async (req,res)=>{
    try {
        
        const allQuestions = await pool.query("SELECT * FROM questions")
        res.json(allQuestions.rows)
        res.send("allQuestions")

    } catch (err) {
        console.error(err.message)
    }
})

// Get all categories

app.get("/categories", async (req,res)=>{
    try {
        const cateogries = await pool.query("SELECT * FROM categories")
        res.json(cateogries.rows)

    } catch (err) {
        console.error(err.message)
    }
})


// Get all quizes

app.get("/quizes", async (req,res)=>{
    try {
        const quizes = await pool.query("SELECT * FROM quizes")
        res.json(quizes.rows)

    } catch (err) {
        console.error(err.message)
    }
})

// Get Category

app.get("/categories/:category", async (req,res)=>{
    try {
        const { category } = req.params;
        const cateogries = await pool.query("SELECT quiz FROM questions WHERE category = $1",[category])
        res.json(cateogries.rows)

    } catch (err) {
        console.error(err.message)
    }
})



// Get quiz by name

app.get("/quizes/:quiz", async(req, res)=>{
    try {
        const { quiz } = req.params;
        const quizResponse = await pool.query("SELECT * FROM questions WHERE quiz = $1",[quiz])

        res.json(quizResponse.rows)

    } catch (err) {
        console.error(err.message)
    }
})




// Update a quiz

// app.put("/quizes/:quiz", async (req, res)=>{
//     try {
//         const { quiz } = req.params;
//         const { question } = req.body;

//         const updateQuiz = await pool.query("UPDATE questions SET question = $1 WHERE quiz = $2 ", [question, quiz])
//         res.json("Quiz was updated!")
//     } catch (err) {
//         console.error(err.message)
//     }
// })

// Delete a quiz

app.delete("/quizes/:quiz", async (req, res)=>{
    try {
        
        const { quiz } = req.params;
        const deleteQuiz = await pool.query("DELETE FROM questions WHERE quiz = $1", [quiz])
        res.json("Quiz was deleted!")

    } catch (err) {
        console.error(err.message)
    }
})

const PORT = 5000

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
