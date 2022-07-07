import express from 'express';
import * as MunicipioC from '../Controllers/MunicipioC';

export const router = express.Router();

//Get Municipios
router.get('/', MunicipioC.getMunicipios);

//Crear un municipio
router.post('/', MunicipioC.createMunicipio);

//Actualizar una municipio
router.put('/:municipioCode', MunicipioC.updateMunicipio);

//Eliminar una municipio
router.delete('/:municipioCode', MunicipioC.deleteMunicipio);