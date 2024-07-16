// Start the server independently as it needs to load some environment variables(dont use concurrently from other directory)
const connectToMongo = require("./db");
connectToMongo();

const express = require('express')
const app = express();
const port = 5000;
const cors = require('cors')
app.use(cors({
    origin :["https://note-cloud-frontend-of0mwfz7f-starlander0047s-projects.vercel.app/login"],
    methods: ["POST", "PUT", "DELETE"],
    credentials: true
}));


app.use(express.json()); ///Middleware

// An API Just to test the Server
app.get("/", (req, res) =>{
    res.status(200).json({success: true, message: "Server is live"});
})
//Available Routes
app.use("/api/auth",require("./routes/auth.js"))
app.use("/api/notes",require("./routes/notes.js"))

app.listen(port,()=>{
    console.log(`iNoteBook Backend Listening at http://127.0.0.1:${port}`)
})

