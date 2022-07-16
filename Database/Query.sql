/*Mostrar nombre y ubicacion( nombre del municipio) de los centros de
  salud con mas personas de sexo masculino vacunadas con tipo "ARNm"*/
CREATE VIEW CS_M_ARNm as
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
                     SELECT count(DISTINCT V.idpersona) AS cuenta
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
SELECT cs.name, (cast(Vac_C.cuenta as real)/Vac.cuenta)*100 as percentage
FROM centro_salud cs,
    (SELECT V.codecentrov, count(distinct (V.idpersona)) as cuenta
      FROM vacunada V
      GROUP BY V.codecentrov
      ) as Vac,
    (SELECT V.codecentrov ,count(distinct(V.idpersona)) as cuenta
    FROM vacunada V,
        (SELECT idpersona, MAX(datecontagio) as ultimo_contagio
        FROM contagio
        GROUP BY idpersona) as C
    WHERE V.idpersona=C.idpersona and V.datevacuna<C.ultimo_contagio
    GROUP BY V.codecentrov) as Vac_C
WHERE Vac.codecentrov = Vac_C.codecentrov and Vac.codecentrov=cs.code;

/* 5. Imprima los países donde vivan más personas contagiadas por cada una de las
distintas variantes existentes */
SELECT denom_oms, idpersona
FROM contagio
GROUP BY denom_oms, idpersona
ORDER BY denom_oms;

SELECT p.code, count(distinct (r.idpersona))
FROM reside r
     join estado_provincia ep on ep.code = r.codeprovincia
     join pais p on p.code = ep.codepais,
     (SELECT idpersona, max(datereside) as fecha
      FROM reside
      GROUP BY idpersona) as RA
WHERE r.idpersona = RA.idpersona
      and r.datereside=RA.fecha
GROUP BY p.code;


/* 6. Top 3 de variantes con mas contagios */
CREATE VIEW Reporte6 as
SELECT denom_oms as Variante, count(*) as N_Contagios
FROM contagio
GROUP BY denom_oms
ORDER BY count(*) DESC LIMIT 3;


/* 7. Por centro de salud, debe indicar el tipo de centro de salud, y dependiendo del
tipo de centro: la cantidad de personas vacunadas y/o la cantidad de pacientes */
CREATE VIEW Reporte7 as
SELECT cs.name, 'Centro de Vacunacion' as tipo, count(DISTINCT(v.idpersona)) as Cant_pacientes_vacunados
FROM vacunada v
        join centro_salud cs on cs.code = v.codecentrov
GROUP BY v.codecentrov, cs.name
UNION
SELECT cs.name, 'Centro de Hospitalizacion' as tipo, count(DISTINCT(h.idpaciente)) as Cant_pacientes_vacunados
FROM hospitalizado h
        join centro_salud cs on cs.code = h.codecentroh
GROUP BY h.codecentroh, cs.name;