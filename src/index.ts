import express, {Request, Response} from 'express';
import cors from 'cors';
import {router as personaRoutes} from './Routes/PersonasR';
import {router as cvRoutes} from './Routes/CentroVacunacionR';
import {router as chRoutes} from './Routes/CentroHospitalizacionR';

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

//configure the app.
app.use('/personas', personaRoutes);
app.use('/cv', cvRoutes);
app.use('/ch', chRoutes);