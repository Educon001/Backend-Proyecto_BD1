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
import {router as tratamientoRoutes} from './Routes/TratamientoR';
import {router as medicamentoRoutes} from './Routes/MedicamentoR';
import {router as varianteRoutes} from './Routes/VarianteR';
import {router as contagioRoutes} from './Routes/ContagioR';
import {router as resideRoutes} from './Routes/ResideR';
import {router as tieneRoutes} from './Routes/TieneR';
import {router as requiereRoutes} from './Routes/RequiereR';
import {router as hospitalizadoRoutes} from './Routes/HospitalizadoR';
import {router as eficaciaRoutes} from './Routes/EficaciaR';
import {router as consisteRoutes} from './Routes/ConsisteR';
import {router as asignadoRoutes} from './Routes/AsignadoR';
import {router as reporteRoutes} from './Routes/ReportesR';

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

//configure the app.                               //CRUD
app.use('/personas', personaRoutes);               //listo
app.use('/cv', cvRoutes);                          //listo
app.use('/ch', chRoutes);                          //listo
app.use('/pais', paisRoutes);                      //listo
app.use('/estado', estadoRoutes);                  //listo
app.use('/municipio', municipioRoutes);            //listo
app.use('/vacunada', vacunadaRoutes);              //listo
app.use('/vacuna', vacunaRoutes);                  //listo
app.use('/tratamiento', tratamientoRoutes);        //listo
app.use('/medicamento', medicamentoRoutes);        //listo
app.use('/variante', varianteRoutes);              //listo
app.use('/contagio', contagioRoutes);
app.use('/reside', resideRoutes);
app.use('/tiene', tieneRoutes);
app.use('/requiere', requiereRoutes);
app.use('/hospitalizado', hospitalizadoRoutes);
app.use('/eficacia', eficaciaRoutes);              //listo
app.use('/consiste', consisteRoutes);              //listo
app.use('/asignado', asignadoRoutes);
app.use('/reportes', reporteRoutes);               //A medias



