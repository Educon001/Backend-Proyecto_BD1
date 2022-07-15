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


/* Top 3 de variantes con mas contagios */
CREATE VIEW Top3_Contagios as
SELECT denom_oms as Variante, count(*) as N_Contagios
FROM contagio
GROUP BY denom_oms
ORDER BY count(*) DESC LIMIT 3;


/* Por centro de salud, debe indicar el tipo de centro de salud, y dependiendo del
tipo de centro: la cantidad de personas vacunadas y/o la cantidad de pacientes */
-- SELECT cs.name, count(DISTINCT(v.idpersona))
-- FROM vacunada v
--         join centro_salud cs on cs.code = v.codecentrov
-- GROUP BY


