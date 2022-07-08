/*Mostrar nombre y ubicacion( nombre del municipio) de los centros de
  salud con mas personas de sexo masculino vacunadas con tipo "ARNm"*/

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


