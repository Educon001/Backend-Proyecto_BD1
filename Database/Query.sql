/* 9. Mostrar nombre y ubicacion( nombre del municipio) de los centros de
  salud con mas personas de sexo masculino vacunadas con tipo "ARNm" */
CREATE VIEW Reporte9 as
SELECT CS.Name AS Centro_Salud, M.Name AS Municipio
FROM Centro_Salud CS
         JOIN Municipio M ON (CS.code_municipio=M.code)
WHERE CS.code IN (
    SELECT V.codecentrov
    FROM vacunada V
             JOIN persona P ON V.idpersona = P.id
             JOIN vacuna VAC ON V.codevacuna = VAC.code
    WHERE P.sex = 'M'AND VAC.type = 'ARNm'
    GROUP BY V.codecentrov
    HAVING count(Distinct V.idpersona) = max ((
            SELECT max(NumPersonas.cuenta)
            FROM (
                     SELECT count(DISTINCT V.idpersona) AS cuenta --N° personas de sexo 'M' vacunados con ARNm
                     FROM vacunada V
                              JOIN persona P ON V.idpersona = P.id
                              JOIN vacuna VAC ON V.codevacuna = VAC.code
                     WHERE P.sex = 'M'AND VAC.type = 'ARNm'
                     GROUP BY V.codecentrov
                 ) as NumPersonas
        ))
)
ORDER BY centro_salud, Municipio;


/* 1. Por estado/provincia indicar la cantidad de pacientes que han sido contagiados más
de una vez y si estuvo hospitalizado o guardó reposo en casa */
CREATE VIEW Reporte1 AS
SELECT ep.name as Estado_Provincia, p.name as Pais, count(distinct c2H.idpersona) as cantidad, sum(c2H.hospitalizado) as Hospitalizados, (count(distinct c2H.idpersona) - sum(c2H.hospitalizado)) as enCasa
FROM estado_provincia ep
     join pais p on p.code = ep.codepais
     join (SELECT r.codeprovincia, r.idpersona --Estado/provincia de residencia actual de cada persona
           FROM reside r
                    join (SELECT idpersona, max(datereside) as fecha --La fecha de residencia actual de cada persona
                          FROM reside
                          GROUP BY idpersona) FR on FR.idpersona=r.idpersona
           WHERE r.datereside=FR.fecha) RA on RA.codeprovincia=ep.code
     join (SELECT c2.idpersona, count(H.casahospitalizado) as hospitalizado --Todas las personas que se han contagiado mas de una vez y si han estado hospitalizads
           FROM (SELECT idpersona --Todas las personas que se han contagiado mas de una vez
                 FROM contagio
                 GROUP BY idpersona
                 HAVING count(*)>1) c2
                 left join (SELECT distinct idpersona,casahospitalizado --Todas las personas que han sido hospitalizadas al menos una vez
                            FROM contagio
                            WHERE casahospitalizado=true) H on H.idpersona=c2.idpersona
           GROUP BY c2.idpersona) c2H on c2H.idpersona=RA.idpersona
GROUP BY ep.name, p.name
ORDER BY Pais,Estado_Provincia;


/* 2. El porcentaje de personas vacunadas por centro de vacunación que han estado
contagiados con el virus luego de ser vacunados. */
CREATE VIEW Reporte2 AS
SELECT cs.name, (cast(Vac_C.cuenta as real)/Vac.cuenta)*100 as percentage --Porcentaje = N° contagiados despues de ser vacunados / N° vacunados
FROM centro_salud cs,
    (SELECT V.codecentrov, count(distinct (V.idpersona)) as cuenta --Cantidad de personas vacunadas por centro de salud
      FROM vacunada V
      GROUP BY V.codecentrov
      ) as Vac,
    (SELECT V.codecentrov ,count(distinct(V.idpersona)) as cuenta --Cantidad de personas contagiadas despues de ser vacunadas por centro de salud
    FROM vacunada V,
        (SELECT idpersona, MAX(datecontagio) as ultimo_contagio --La fecha de la ultima vez que la persona se contagio
        FROM contagio
        GROUP BY idpersona) as C
    WHERE V.idpersona=C.idpersona and V.datevacuna<C.ultimo_contagio
    GROUP BY V.codecentrov) as Vac_C
WHERE Vac.codecentrov = Vac_C.codecentrov and Vac.codecentrov=cs.code
ORDER BY percentage;


/* 3. Calcular el valor de la eficacia de cada vacuna con respecto al nivel de contagio y
mostrarlo. */
CREATE VIEW Reporte3 AS
SELECT v.code as Codigo_Vacuna, v.name as Nombre_Vacuna, v.laboratory as Laboratorio_Vacuna, (cast((Vac.cuenta-CDV.cuenta) as real)/Vac.cuenta)*100 as Eficacia --Eficacia = N° personas que no se han contagiado despues de ser vacunados / N° vacunados
FROM vacuna v
     join (SELECT codevacuna, count(distinct(idpersona)) as cuenta --Cantidad de personas vacunadas por vacuna
           FROM vacunada
           GROUP BY codevacuna) Vac on v.code=Vac.codevacuna
     join (SELECT TV.codevacuna, count(Vac_C.ultimo_contagio) as cuenta --Por vacuna cantidad de contagiados despues de ser vacunados (incluye el 0)
           FROM (SELECT distinct codevacuna, idpersona --Por vacuna todas las personas que se han vacunado
                 FROM vacunada) TV
                 left join (SELECT distinct V.codevacuna, V.idpersona ,C.ultimo_contagio --Por vacuna todas las personas que se han contagiado despues de vacunarse y la fecha de su contagio
                            FROM vacunada V
                                 join (SELECT idpersona, MAX(datecontagio) as ultimo_contagio --La fecha de la ultima vez que la persona se contagio
                                       FROM contagio
                                       GROUP BY idpersona) C on V.idpersona = C.idpersona
                            WHERE datevacuna<C.ultimo_contagio) Vac_C on TV.codevacuna=Vac_C.codevacuna and TV.idpersona=Vac_C.idpersona
           GROUP BY TV.codevacuna) CDV on CDV.codevacuna=v.code
ORDER BY Eficacia;


/*. 4. Los tratamientos que se han aplicado a los pacientes que han sido contagiados.
Además se necesita cuál es el virus y las características del mismo */
CREATE VIEW Reporte4 AS
SELECT p.id, p.name, p.lastname, t.code, t.description, r.date, v.denom_oms, v.clasification, v.linaje
FROM tratamiento t
         join requiere r on t.code = r.codetratamiento
         join persona p on p.id = r.idpaciente
         join contagio c on p.id = c.idpersona
         join virus_variante v on v.denom_oms = c.denom_oms
         join (SELECT r.idpaciente, max(c.datecontagio) as fechacontagio --Fecha del contagio para el cual se esta aplicando cada trataiento por persona
               FROM requiere r
                        join paciente p on p.id_persona = r.idpaciente
                        join contagio c on p.id_persona = c.idpersona
               WHERE c.datecontagio<r.date
               GROUP BY r.idpaciente) as FCTP on FCTP.idpaciente=p.id
WHERE c.datecontagio=FCTP.fechacontagio
ORDER BY r.date,p.id;


/* 5. Imprima los países donde vivan más personas contagiadas por cada una de las
distintas variantes existentes */
CREATE VIEW CPVP AS --Numero de contagios por variante por pais
SELECT c.denom_oms, PR.codepais, count(distinct c.idpersona) as Ncontagios
FROM contagio c
         join (SELECT ep.codepais, r.idpersona --Pais de residencia actual de cada persona
               FROM reside r
                        join estado_provincia ep on ep.code = r.codeprovincia
                        join (SELECT idpersona, max(datereside) as fecha --Fecha de recidencia actual de cada persona
                              FROM reside
                              GROUP BY idpersona) RA on RA.idpersona=r.idpersona
               WHERE r.datereside=RA.fecha) PR on c.idpersona=PR.idpersona
GROUP BY c.denom_oms, PR.codepais;

CREATE VIEW Reporte5 AS
SELECT CPVP.denom_oms as variante, p.name as pais, CPVP.Ncontagios
FROM pais p
     join  CPVP on CPVP.codepais=p.code
     join (SELECT denom_oms, max(Ncontagios) as maxContagios --Maximo numero de contagios por variante
           FROM CPVP
           GROUP BY denom_oms) CPV on CPV.denom_oms=CPVP.denom_oms
WHERE CPVP.Ncontagios=CPV.maxContagios --Comprobamos que el numero de contagios por variante por pais sea igual al maximo
ORDER BY variante,CPVP.Ncontagios;



/* 6. Top 3 de variantes con mas contagios */
CREATE VIEW Reporte6 as
SELECT denom_oms as Variante, count(*) as N_Contagios
FROM contagio
GROUP BY denom_oms
ORDER BY count(*) DESC LIMIT 3; --Se ordena de mayor a menor por numero de contagios y se limita el resultado a 3


/* 7. Por centro de salud, debe indicar el tipo de centro de salud, y dependiendo del
tipo de centro: la cantidad de personas vacunadas y/o la cantidad de pacientes */
CREATE VIEW Reporte7 as
SELECT cs.name, 'Centro de Vacunacion' as tipo, count(DISTINCT(v.idpersona)) as Cant_pacientes_vacunados --Cantidad de vacunados por centro de vacunacion
FROM vacunada v
        join centro_salud cs on cs.code = v.codecentrov
GROUP BY v.codecentrov, cs.name
UNION
SELECT cs.name, 'Centro de Hospitalizacion' as tipo, count(DISTINCT(h.idpaciente)) as Cant_pacientes_vacunados --Cantidad de pacientes por centro de hospitalizacion
FROM hospitalizado h
        join centro_salud cs on cs.code = h.codecentroh
GROUP BY h.codecentroh, cs.name;


/* 8. Se quiere un reporte detallado de todos los síntomas asociados a cada uno de los
virus-variante y se quiere conocer la vacuna más eficaz para ese virus. */
CREATE VIEW Reporte8 as
SELECT t.denom_oms as variante, se.description as sintoma, e.name as vacuna_mas_efectiva
FROM  tiene t
        join sintoma_efecto se on se.code = t.codesintoma,
        (SELECT e.denom_oms,v.name --Nombre de la vacuna que corresponde al procentaje de eficacia mas alto para cada virus
        FROM eficacia e
             join vacuna v on e.codevacuna = v.code,
                (SELECT denom_oms, max(percentage) percentage --Porcentaje de eficacia mas alto para cada virus
                FROM eficacia
                GROUP BY denom_oms) as max
        WHERE e.denom_oms = max.denom_oms and
              e.percentage = max.percentage) as e
WHERE e.denom_oms = t.denom_oms
ORDER BY variante;