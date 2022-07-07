/*A. Por cada virus se tienen que almacenar tres virus variantes con datos del país de
origen y la eficacia de las vacunas para la variante.
*/

INSERT INTO pais VALUES (default, 'Venezuela');
INSERT INTO pais VALUES (default, 'Colombia');
INSERT INTO pais VALUES (default, 'Ecuador');
INSERT INTO pais VALUES (default, 'Perú');
INSERT INTO pais VALUES (default, 'Argentina');
INSERT INTO pais VALUES (default, 'Brasil');
INSERT INTO pais VALUES (default, 'Mexico');
INSERT INTO pais VALUES (default, 'Estados Unidos');
INSERT INTO pais VALUES (default, 'Canadá');
INSERT INTO pais VALUES (default, 'España');
INSERT INTO pais VALUES (default, 'Alemania');
INSERT INTO pais VALUES (default, 'Francia');
INSERT INTO pais VALUES (default, 'China');
INSERT INTO pais VALUES (default, 'Holanda');
INSERT INTO pais VALUES (default, 'India');
INSERT INTO pais VALUES (default, 'Inglaterra');
----------------------------------
INSERT INTO virus_variante VALUES ('Alpha', 'B.1.1.7',2019, 5, 'VOC',1 );
INSERT INTO virus_variante VALUES ('Beta', 'B.1.35', 2020, 8, 'VOI',7);
INSERT INTO virus_variante VALUES ('Gamma', 'P.1', 2021, 2, 'VUM',13);



/*
B. Se debe almacenar por lo menos 5 estados con 5 municipios cada uno.
*/
INSERT INTO estado_provincia VALUES (default, 'Caracas', 1);
INSERT INTO municipio VALUES (default, 'Libertador', 1);
INSERT INTO municipio VALUES (default, 'Sucre', 1);
INSERT INTO municipio VALUES (default, 'El Hatillo', 1);
INSERT INTO municipio VALUES (default, 'Baruta', 1);
INSERT INTO municipio VALUES (default, 'Chacao', 1);
-----------

INSERT INTO estado_provincia VALUES (default, 'Bogotá',2);
INSERT INTO municipio VALUES (default, 'Soacha', 2);
INSERT INTO municipio VALUES (default, 'Mosquera', 2);
INSERT INTO municipio VALUES (default, 'Cota', 2);
INSERT INTO municipio VALUES (default, 'El Rosal', 2);
INSERT INTO municipio VALUES (default, 'Tabio', 2);
---------------------
INSERT INTO estado_provincia VALUES (default, 'Quito',3);
INSERT INTO municipio VALUES (default, 'Nayón', 3);
INSERT INTO municipio VALUES (default, 'Zámbiza', 3);
INSERT INTO municipio VALUES (default, 'Puéllaro', 3);
INSERT INTO municipio VALUES (default, 'Chavezpamba', 3);
INSERT INTO municipio VALUES (default, 'Atahualpa', 3);
-----------
INSERT INTO estado_provincia VALUES (default, 'Buenos Aires',5);
INSERT INTO municipio VALUES (default, 'Bolívar', 4);
INSERT INTO municipio VALUES (default, 'Colón', 4);
INSERT INTO municipio VALUES (default, 'Dolores', 4);
INSERT INTO municipio VALUES (default, 'Mercedes', 4);
INSERT INTO municipio VALUES (default, 'Mar Chiquita', 4);
----------------
INSERT INTO estado_provincia VALUES (default, 'New York',8);
INSERT INTO municipio VALUES (default, 'Bronx', 5);
INSERT INTO municipio VALUES (default, 'Brooklyn', 5);
INSERT INTO municipio VALUES (default, 'Manhattan', 5);
INSERT INTO municipio VALUES (default, 'Queens', 5);
INSERT INTO municipio VALUES (default, 'Staten Island', 5);
--------------------------

/*
C. Se tiene información de al menos 10 pacientes.
*/

INSERT INTO persona VALUES ('V29554823','Juan','Perez','M','1998-10-12');
INSERT INTO persona VALUES ('V29555823','Jose','Nuñez','F','2000-10-12');
INSERT INTO persona VALUES ('V29585647','Maria','Perez','F','1975-10-12');
INSERT INTO persona VALUES ('V29558989','Eduardo','Consalvo','M','2001-10-12');
INSERT INTO persona VALUES ('V28553829','Shakira','Samina','F','1998-10-12');
INSERT INTO persona VALUES ('V25553823','Daniela','Rodriguez','F','1998-10-12');
INSERT INTO persona VALUES ('V23553823','Alexandra','Gonzales','F','1998-10-17');
INSERT INTO persona VALUES ('V22553825','Juana','Cubana','F','1998-10-18');
INSERT INTO persona VALUES ('V25553826','Marco','Fidel','M','1998-10-14');
INSERT INTO persona VALUES ('V21553827','Andres','Gonzalez','M','1901-10-12');--------pacientes hasta aquí
INSERT INTO persona VALUES ('V19553823','Jian','Achú','M','1998-10-12');
INSERT INTO persona VALUES ('V19553824','Pedro','CasaBlanca','M','1970-10-12');
INSERT INTO persona VALUES ('V18553324','Steiker','Mora','M','2002-10-12');
INSERT INTO persona VALUES ('V17553823','Rodrigo','Perez','N/A','1997-10-12');
INSERT INTO persona VALUES ('V16553823','Camila','Torres','M','1995-11-12');
INSERT INTO persona VALUES ('V15553823','Jesus','Ferran','N/A','1992-10-12');
INSERT INTO persona VALUES ('V14553823','Marie','Curie','F','1998-10-12');
INSERT INTO persona VALUES ('E13553823','Lana','Roberts','F','1980-10-01');
------
INSERT INTO paciente VALUES ('V29554823');
INSERT INTO paciente VALUES ('V29555823');
INSERT INTO paciente VALUES ('V29585647');
INSERT INTO paciente VALUES ('V29558989');
INSERT INTO paciente VALUES ('V28553829');
INSERT INTO paciente VALUES ('V25553823');
INSERT INTO paciente VALUES ('V23553823');
INSERT INTO paciente VALUES ('V22553825');
INSERT INTO paciente VALUES ('V25553826');
INSERT INTO paciente VALUES ('V21553827');
-------------
/*
D. Se tiene que almacenar 5 médicos con todos sus datos y sus relaciones.
'Asistente medico','Enfermeria', 'Medico'*/

INSERT INTO personal_salud VALUES ('V19553823', 'micorreo@gmail.com','Medico');
INSERT INTO personal_salud VALUES ('V19553824', 'pepito22@gmail.com','Medico');
INSERT INTO personal_salud VALUES ('V18553324', 'st02_m@gmail.com','Medico');
INSERT INTO personal_salud VALUES ('V17553823', 'micorreo1@gmail.com','Medico');
INSERT INTO personal_salud VALUES ('V16553823', 'micorreo_2002@gmail.com','Medico');
----------------
INSERT INTO medico VALUES ('V19553823');
INSERT INTO medico VALUES ('V19553824');
INSERT INTO medico VALUES ('V18553324');
INSERT INTO medico VALUES ('V17553823');
INSERT INTO medico VALUES ('V16553823');



/*
E. Se deben almacenar 5 centro de salud con su ubicación, dos (2) deben ser de
hospitalización y dos (2) de vacunación.
*/

INSERT INTO centro_salud VALUES (default,'Centro de Salud de Caracas', 'Av Caracas, en Caracas', 'V19553823', 1,'2019-10-02');
INSERT INTO centro_salud VALUES (default,'Centro HealthClick', 'Av Vollmer, frente a Galerias Avila', 'V19553824', 2,'2019-12-02');
INSERT INTO centro_salud VALUES (default,'Centro FeelBetter', 'Av Brookling, calle el hambre', 'V18553324', 22,'2020-04-02');
INSERT INTO centro_salud VALUES (default,'Clinicas Caracas', 'Av Caracas, en Caracas', 'V17553823', 3, '2020-10-02');
INSERT INTO centro_salud VALUES (default,'Centro Clinico Razeti', 'Av Caracas, detras del centro comercial Parque Caracas', 'V16553823', 4, '2021-10-02');
----------------------------------
INSERT INTO centro_hospitalizacion VALUES (1);
INSERT INTO centro_hospitalizacion VALUES (2);
----
INSERT INTO centro_vacunacion VALUES (3);
INSERT INTO centro_vacunacion VALUES (4);
INSERT INTO centro_vacunacion VALUES (5);


INSERT INTO vacuna VALUES (default,'Comirnaty',1, 3,'ARNm', 'Pfizer-BioNTech',11);
INSERT INTO vacuna VALUES (default,'AstraZeneca',7, 3,'Vector viral', 'University of Oxford',16);
INSERT INTO vacuna VALUES (default,'Spikevax',12, 3,'Subunidades proteicas', 'Moderna',15);

INSERT INTO vacunada VALUES ('V29554823',1,3,'V19553824','2022-05-06',1);
INSERT INTO vacunada VALUES ('V23553823',1,5,'V17553823','2022-05-13',1);
INSERT INTO vacunada VALUES ('V29554823',1,5,'V17553823','2022-06-06',2);