import express, {Request, Response} from 'express';
import cors from 'cors';
import {router as personaRoutes} from './Routes/PersonasR';
import {router as cvRoutes} from './Routes/CentroVacunacionR';
import {router as chRoutes} from './Routes/CentroHospitalizacionR';
import {router as paisRoutes} from './Routes/PaisR';
import {router as estadoRoutes} from './Routes/EstadoR';
import {router as municipioRoutes} from './Routes/MunicipioR';
import {router as vacunadaRoutes} from './Routes/VacunadaR';
import {router as vacunaRoutes} from './Routes/VacunaR';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('TEST');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`app started on port ${PORT}`);
});

//configure the app.
app.use('/personas', personaRoutes);
app.use('/cv', cvRoutes);
app.use('/ch', chRoutes);
app.use('/pais', paisRoutes);
app.use('/estado', estadoRoutes);
app.use('/municipio', municipioRoutes);
app.use('/vacunada', vacunadaRoutes);
app.use('/vacuna', vacunaRoutes);