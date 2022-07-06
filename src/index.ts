import express, {Request, Response} from 'express';
import cors from 'cors';
import {router as personaRoutes} from './Routes/PersonasR';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('MARICO EL QUE LO LEA');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`app started on port ${PORT}`);
});

//import the routes

//configure the app.
app.use('/personas', personaRoutes);