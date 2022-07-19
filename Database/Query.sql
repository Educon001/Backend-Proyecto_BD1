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
);


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
WHERE Vac.codecentrov = Vac_C.codecentrov and Vac.codecentrov=cs.code;

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
WHERE e.denom_oms = t.denom_oms;