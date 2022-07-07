/*A. Por cada virus se tienen que almacenar tres virus variantes con datos del país de
origen y la eficacia de las vacunas para la variante.
*/

INSERT INTO pais VALUES (1, 'Venezuela');
INSERT INTO pais VALUES (2, 'Colombia');
INSERT INTO pais VALUES (3, 'Ecuador');
INSERT INTO pais VALUES (4, 'Perú');
INSERT INTO pais VALUES (5, 'Argentina');
INSERT INTO pais VALUES (6, 'Brasil');
INSERT INTO pais VALUES (7, 'Mexico');
INSERT INTO pais VALUES (8, 'Estados Unidos');
INSERT INTO pais VALUES (9, 'Canadá');
INSERT INTO pais VALUES (10, 'España');
INSERT INTO pais VALUES (11, 'Alemania');
INSERT INTO pais VALUES (12, 'Francia');
INSERT INTO pais VALUES (13, 'China');
INSERT INTO pais VALUES (14, 'Holanda');
INSERT INTO pais VALUES (15, 'India');
INSERT INTO pais VALUES (16, 'Inglaterra');
----------------------------------
INSERT INTO virus_variante VALUES ('Alpha', 'B.1.1.7',2019, 5, 'VOC',1 );
INSERT INTO virus_variante VALUES ('Beta', 'B.1.35', 2020, 8, 'VOI',7);
INSERT INTO virus_variante VALUES ('Gamma', 'P.1', 2021, 2, 'VUM',13);



/*
B. Se debe almacenar por lo menos 5 estados con 5 municipios cada uno.
*/
INSERT INTO estado_provincia VALUES (1, 'Caracas', 1);
INSERT INTO municipio VALUES (1, 'Libertador', 1);
INSERT INTO municipio VALUES (2, 'Sucre', 1);
INSERT INTO municipio VALUES (3, 'El Hatillo', 1);
INSERT INTO municipio VALUES (4, 'Baruta', 1);
INSERT INTO municipio VALUES (5, 'Chacao', 1);
-----------

INSERT INTO estado_provincia VALUES (2, 'Bogotá',2);
INSERT INTO municipio VALUES (6, 'Soacha', 2);
INSERT INTO municipio VALUES (7, 'Mosquera', 2);
INSERT INTO municipio VALUES (8, 'Cota', 2);
INSERT INTO municipio VALUES (9, 'El Rosal', 2);
INSERT INTO municipio VALUES (10, 'Tabio', 2);
---------------------
INSERT INTO estado_provincia VALUES (3, 'Quito',3);
INSERT INTO municipio VALUES (11, 'Nayón', 3);
INSERT INTO municipio VALUES (12, 'Zámbiza', 3);
INSERT INTO municipio VALUES (13, 'Puéllaro', 3);
INSERT INTO municipio VALUES (14, 'Chavezpamba', 3);
INSERT INTO municipio VALUES (15, 'Atahualpa', 3);
-----------
INSERT INTO estado_provincia VALUES (4, 'Buenos Aires',5);
INSERT INTO municipio VALUES (16, 'Bolívar', 4);
INSERT INTO municipio VALUES (17, 'Colón', 4);
INSERT INTO municipio VALUES (18, 'Dolores', 4);
INSERT INTO municipio VALUES (19, 'Mercedes', 4);
INSERT INTO municipio VALUES (20, 'Mar Chiquita', 4);
----------------
INSERT INTO estado_provincia VALUES (5, 'New York',8);
INSERT INTO municipio VALUES (21, 'Bronx', 5);
INSERT INTO municipio VALUES (22, 'Brooklyn', 5);
INSERT INTO municipio VALUES (23, 'Manhattan', 5);
INSERT INTO municipio VALUES (24, 'Queens', 5);
INSERT INTO municipio VALUES (25, 'Staten Island', 5);
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

INSERT INTO centro_salud VALUES (1,'Centro de Salud de Caracas', 'Av Caracas, en Caracas', 'V19553823', 1,'2019-10-02');
INSERT INTO centro_salud VALUES (2,'Centro HealthClick', 'Av Vollmer, frente a Galerias Avila', 'V19553824', 2,'2019-12-02');
INSERT INTO centro_salud VALUES (3,'Centro FeelBetter', 'Av Brookling, calle el hambre', 'V18553324', 22,'2020-04-02');
INSERT INTO centro_salud VALUES (4,'Clinicas Caracas', 'Av Caracas, en Caracas', 'V17553823', 3, '2020-10-02');
INSERT INTO centro_salud VALUES (5,'Centro Clinico Razeti', 'Av Caracas, detras del centro comercial Parque Caracas', 'V16553823', 4, '2021-10-02');
----------------------------------
INSERT INTO centro_hospitalizacion VALUES (1);
INSERT INTO centro_hospitalizacion VALUES (2);
----
INSERT INTO centro_vacunacion VALUES (3);
INSERT INTO centro_vacunacion VALUES (4);


INSERT INTO vacuna VALUES (1,'Comirnaty',1, 3,'ARNm', 'Pfizer-BioNTech',11);
INSERT INTO vacuna VALUES (2,'AstraZeneca',7, 3,'Vector viral', 'University of Oxford',16);
INSERT INTO vacuna VALUES (3,'Spikevax',12, 3,'Subunidades proteicas', 'Moderna',15);
