import express, {Request, Response} from 'express';

const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("gay");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`app started on port ${PORT}`)
});

//import the routes
const personaRoutes = require('./Routes/PersonasR');

//configure the app.
app.use(personaRoutes);