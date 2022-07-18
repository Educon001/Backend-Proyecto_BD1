CREATE DATABASE covid_shield;

\connect covid_shield


--DOMAINS
CREATE DOMAIN COVID_DATE AS DATE CHECK (VALUE BETWEEN '2019-01-01' AND now()); --Fechas desde el año de origen del covid hasta la actualidad
CREATE DOMAIN DATE_RANGE AS DATE CHECK (VALUE BETWEEN '1900-01-01' AND now());

--------------------------ENTIDADES------------------------------
CREATE TABLE Pais(
    Code SMALLSERIAL,
    Name varchar(60) NOT NULL ,
    CONSTRAINT Pais_pk PRIMARY KEY (Code),
    CONSTRAINT Pais_Name_check CHECK(Name NOT SIMILAR TO '%[0-9]%') --El nombre de un pais no debe contener numeros
);

CREATE TABLE Estado_Provincia(
    Code SERIAL,
    Name VARCHAR(60) NOT NULL ,
    CodePais SMALLINT NOT NULL ,
    CONSTRAINT EstadoProvincia_pk PRIMARY KEY (Code),
    CONSTRAINT EstadoProvincia_Pais_FK FOREIGN KEY (CodePais) REFERENCES Pais(Code),
    CONSTRAINT Persona_Name_check CHECK(Name NOT SIMILAR TO '%[0-9]%') --El nombre de un estado no debe contener numeros
);

CREATE TABLE Municipio(
    Code SERIAL,
    Name VARCHAR(60) NOT NULL,
    CodeEstado SMALLINT NOT NULL,
    CONSTRAINT Municipio_pk PRIMARY KEY (Code),
    CONSTRAINT Municipio_EstadoProvincia_FK FOREIGN KEY (CodeEstado) REFERENCES Estado_Provincia(Code)

);

CREATE TABLE Persona(
    ID VARCHAR(10),
    Name VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Sex VARCHAR(3) NOT NULL,
    Birthdate DATE_RANGE,
    HighRisk BOOLEAN,
    CONSTRAINT Persona_pk PRIMARY KEY (ID),
    CONSTRAINT Persona_sex_check CHECK(Sex IN ('M','F','N/A')),
    CONSTRAINT Persona_Name_check CHECK(Name NOT SIMILAR TO '%[0-9]%'), --Los nombres no pueden contener numeros
    CONSTRAINT Persona_LastName_check CHECK(LastName NOT SIMILAR TO '%[0-9]%'), --Los apellidos no pueden contener numeros
    CONSTRAINT Persona_Cedula_check CHECK (ID ~* '^[VE]{1}[0-9]+$') --Las cedulas deben seguir el formato V/E seguida de numeros
);

CREATE TABLE Paciente(
    ID_Persona VARCHAR(10),
    CONSTRAINT Paciente_pk PRIMARY KEY (ID_Persona),
    CONSTRAINT Paciente_Persona_fk FOREIGN KEY (ID_Persona) REFERENCES persona(ID)
);

CREATE TABLE Vacuna(
    Code SERIAL,
    Name VARCHAR(30) NOT NULL,
    Lote INT,
    CantDosis SMALLINT,
    Type VARCHAR(23) NOT NULL,
    Laboratory VARCHAR(20),
    Code_Pais SMALLINT,
    CONSTRAINT Vacuna_PK PRIMARY KEY (Code),
    CONSTRAINT Vacuna_type_Check CHECK(Type IN ('ARNm','Vector viral','Subunidades proteicas')),
    CONSTRAINT Vacuna_CantDosis_Check CHECK(CantDosis BETWEEN 1 AND 5),
    CONSTRAINT Vacuna_Lote_Check CHECK(Lote > 0 ),
    CONSTRAINT Vacuna_Pais_FK FOREIGN KEY (Code_Pais) REFERENCES Pais(Code)
);

CREATE TABLE Personal_Salud(
    ID_Persona VARCHAR(10),
    Email VARCHAR(50),
    Type VARCHAR(16) NOT NULL ,
    CONSTRAINT PersonalSalud_pk PRIMARY KEY (ID_Persona),
    CONSTRAINT PersonalSalud_Email_check CHECK (Email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'), --Formato de correo electronico
    CONSTRAINT PersonalSalud_Persona_fk FOREIGN KEY (ID_Persona) REFERENCES persona(ID),
    CONSTRAINT PersonalSalud_type_check CHECK(Type IN ('Asistente medico','Enfermeria', 'Medico'))
);

CREATE TABLE Medico(
    ID_Medico VARCHAR(10),
    CONSTRAINT Medico_Personal_FK FOREIGN KEY (ID_Medico) REFERENCES Personal_Salud(ID_Persona),
    CONSTRAINT Medico_PK PRIMARY KEY (ID_Medico)
);

CREATE TABLE Centro_Salud(
    Code SERIAL,
    Name VARCHAR(50) NOT NULL ,
    Address TEXT,
    ID_Medico VARCHAR(10),
    Code_Municipio INT ,
    Manager_Date DATE,
    CONSTRAINT CentroSalud_PK PRIMARY KEY (Code),
    CONSTRAINT CentroSalud_MedicoID_FK FOREIGN KEY (ID_Medico) REFERENCES Medico(ID_Medico),
    CONSTRAINT CentroSalud_Municipio_FK FOREIGN KEY (Code_Municipio) REFERENCES Municipio(Code)
);

CREATE TABLE Centro_Hospitalizacion(
    CodeCentroH INT,
    CONSTRAINT CentroHospitalizacion_CentroSalud_FK FOREIGN KEY (CodeCentroH) REFERENCES Centro_Salud(Code),
    CONSTRAINT CentroHospitalizacion_PK PRIMARY KEY (CodeCentroH)
);

CREATE TABLE Centro_Vacunacion(
    CodeCentroV INT,
    CONSTRAINT CentroVacunacion_CentroSalud_FK FOREIGN KEY (CodeCentroV) REFERENCES Centro_Salud(Code),
    CONSTRAINT CentroVacunacion_PK PRIMARY KEY (CodeCentroV)
);

CREATE TABLE Virus_Variante(
    Denom_OMS VARCHAR(20),
    Linaje VARCHAR(20),
    Origin_Year SMALLINT ,
    Origin_Month SMALLINT ,
    Clasification VARCHAR(3) NOT NULL ,
    Code_Pais SMALLINT,
    CONSTRAINT VirusVariante_pk PRIMARY KEY (Denom_OMS),
    CONSTRAINT VirusVariante_Pais_fk FOREIGN KEY (Code_Pais) REFERENCES Pais(Code),
    CONSTRAINT VirusVariante_type_check CHECK(Clasification IN ('VOC','VOI','VUM')),
    CONSTRAINT VirusVariante_Origin_Year_Check CHECK(Origin_Year BETWEEN 2019 AND EXTRACT(year FROM now())),
    CONSTRAINT VirusVariante_Origin_Month_Check CHECK(Origin_Month BETWEEN 1 AND 12)
);

CREATE TABLE Medicamento (
    Code SERIAL,
    Name VARCHAR(50) NOT NULL ,
    Component VARCHAR(50),
    Concentration REAL,
    CONSTRAINT Medicamento_pk PRIMARY KEY (Code),
    CONSTRAINT Medicamento_Concentration_check CHECK(Concentration > 0)
);

CREATE TABLE Tratamiento(
    Code SERIAL,
    Description TEXT,
    CONSTRAINT Tratamiento_pk PRIMARY KEY (Code)
);

CREATE TABLE Sintoma_Efecto(
    Code SERIAL,
    Description TEXT,
    CONSTRAINT SintomaEfecto_pk PRIMARY KEY (Code)
);

--------------------------------------------RELACIONES-------------------------------------------------

CREATE TABLE Consiste(
    CodeTratamiento INT,
    CodeMedicamento INT,
    CantDays INT,
    Frecuency VARCHAR(20),
    Dosis INT,
    CONSTRAINT Tratamiento_ConsisteFK FOREIGN KEY (CodeTratamiento) REFERENCES Tratamiento(Code),
    CONSTRAINT Medicamento_ConsisteFK FOREIGN KEY (CodeMedicamento) REFERENCES Medicamento(Code),
    CONSTRAINT TratamientoMedicamento_ConsistePK PRIMARY KEY (CodeTratamiento, CodeMedicamento),
    CONSTRAINT Consiste_CantDays_Check CHECK(CantDays > 0 ),
    CONSTRAINT Consiste_Dosis_Check CHECK(Dosis > 0 )
);

CREATE TABLE Requiere(
    CodeTratamiento INT,
    IdPaciente VARCHAR(10),
    Date COVID_DATE,
    Estado VARCHAR(10),
    CONSTRAINT Tratamiento_RequiereFK FOREIGN KEY (CodeTratamiento) REFERENCES Tratamiento(Code),
    CONSTRAINT Paciente_RequiereFK FOREIGN KEY (IdPaciente) REFERENCES Paciente(ID_Persona),
    CONSTRAINT DateTratamientoMedicamento_RequierePK PRIMARY KEY (Date, CodeTratamiento, IdPaciente),
    CONSTRAINT Estado_Requiere_Check CHECK (Estado IN('En curso','Finalizado' ))
);

CREATE TABLE Reside(
    CodeProvincia SMALLINT,
    IdPersona VARCHAR(10),
    DateReside DATE_RANGE,
    CONSTRAINT Provincia_ResideFK FOREIGN KEY (CodeProvincia) REFERENCES Estado_Provincia(Code),
    CONSTRAINT Persona_ResideFK FOREIGN KEY (IdPersona) REFERENCES Persona(ID),
    CONSTRAINT PersonaProvincia_ResidePK PRIMARY KEY (CodeProvincia, IdPersona, DateReside)
);

CREATE TABLE Contagio(
    IdPersona VARCHAR(10),
    Denom_OMS VARCHAR(20),
    DateContagio COVID_DATE,
    RestTime SMALLINT,
    CasaHospitalizado BOOLEAN,
    CONSTRAINT Persona_ContagioPK FOREIGN KEY (IdPersona) REFERENCES Persona(ID),
    CONSTRAINT Virus_ContagioFK FOREIGN KEY (Denom_OMS) REFERENCES Virus_Variante(Denom_OMS),
    CONSTRAINT PersonaVirus_ContagioPK PRIMARY KEY (IdPersona, Denom_OMS, DateContagio),
    CONSTRAINT Contagio_RestTime_Check CHECK(RestTime > 0 )
);

CREATE TABLE Asignado (
    IDPersonalSalud VARCHAR(10),
    CodeCentroSalud INT,
    DateAsignado DATE_RANGE,
    CONSTRAINT Personal_AsignadoPK FOREIGN KEY (IDPersonalSalud) REFERENCES Personal_Salud(ID_Persona),
    CONSTRAINT CentroSalud_AsignadoFK FOREIGN KEY (CodeCentroSalud) REFERENCES Centro_Salud(Code),
    CONSTRAINT PersonalCentroSaludDate_AsignadoPK PRIMARY KEY (IDPersonalSalud, CodeCentroSalud, DateAsignado)
);

CREATE TABLE Tiene(
    CodeSintoma INT,
    Denom_OMS VARCHAR(20),
    CONSTRAINT Sintoma_TieneFK FOREIGN KEY (CodeSintoma) REFERENCES Sintoma_Efecto(Code),
    CONSTRAINT Virus_TieneFK FOREIGN KEY (Denom_OMS) REFERENCES Virus_Variante(Denom_OMS),
    CONSTRAINT SintomaVariante_TienePK PRIMARY KEY (CodeSintoma, Denom_OMS)

);

CREATE TABLE Eficacia(
    Denom_OMS VARCHAR(20),
    CodeVacuna INT,
    Percentage REAL NOT NULL ,
    CONSTRAINT Virus_EficaciaFK FOREIGN KEY (Denom_OMS) REFERENCES Virus_Variante(Denom_OMS),
    CONSTRAINT Vacuna_EficaciaFK FOREIGN KEY (CodeVacuna) REFERENCES Vacuna(Code),
    CONSTRAINT VirusVacuna_EficaciaPK PRIMARY KEY (Denom_OMS, CodeVacuna),
    CONSTRAINT Eficacia_Percentage_Check CHECK(Percentage >=0 AND Percentage <= 100)
);

CREATE TABLE Presenta(
    CodeVacuna INT,
    CodeSintoma INT,
    CONSTRAINT Vacuna_PresentaFK FOREIGN KEY (CodeVacuna) REFERENCES Vacuna(Code),
    CONSTRAINT Sintoma_PresentaFK FOREIGN KEY (CodeSintoma) REFERENCES Sintoma_Efecto(Code),
    CONSTRAINT VacunaSintoma_PresentaPK PRIMARY KEY (CodeVacuna, CodeSintoma)
);

CREATE TABLE Vacunada(
    IDPersona VARCHAR(10),
    CodeVacuna INT,
    CodeCentroV INT,
    IDPersonal VARCHAR(10),
    DateVacuna COVID_DATE,
    Dosis SMALLINT,
    CONSTRAINT Persona_VacunadaFK FOREIGN KEY (IDPersona) REFERENCES Persona(ID),
    CONSTRAINT Vacuna_VacunadaFK FOREIGN KEY (CodeVacuna) REFERENCES Vacuna(Code),
    CONSTRAINT CentroV_VacunadaFK FOREIGN KEY (CodeCentroV) REFERENCES Centro_Vacunacion(CodeCentroV),
    CONSTRAINT Personal_VacunadaFK FOREIGN KEY (IDPersonal) REFERENCES Personal_Salud(ID_Persona),
    CONSTRAINT PersonaVacunaCentroVPersonal_VacunadaPK PRIMARY KEY (IDPersona, CodeVacuna, CodeCentroV, IDPersonal, DateVacuna), --Va la Fecha?????
    CONSTRAINT Vacunada_Dosis_Check CHECK(Dosis BETWEEN 1 AND 10)
);

CREATE TABLE Hospitalizado(
    IDPaciente        VARCHAR(10),
    CodeCentroH       INT,
    DateHospitalizado COVID_DATE,
    CONSTRAINT Paciente_HospitalizadoFK FOREIGN KEY (IDPaciente) REFERENCES Paciente(ID_Persona),
    CONSTRAINT CentroH_HospitalizadoFK FOREIGN KEY (CodeCentroH) REFERENCES Centro_Hospitalizacion(CodeCentroH),
    CONSTRAINT PacienteCentroHDate_HospitalizadoPK PRIMARY KEY (IDPaciente, CodeCentroH, DateHospitalizado)
);

---------------------------------------------TRIGGERS------------------------------------------------------
CREATE FUNCTION  insert_medico() --Inserta un medico cuando se crea un personal de salud de tipo 'Medico'
    RETURNS TRIGGER
    LANGUAGE plpgsql
AS
$$
BEGIN
    IF new.Type = 'Medico' THEN
        INSERT INTO medico (id_medico) VALUES (new.ID_Persona);
    END IF;
    RETURN new;
end;
$$;

CREATE TRIGGER Insert_Personal_Salud_Medico
    AFTER INSERT
    ON Personal_Salud
    FOR EACH ROW
    EXECUTE PROCEDURE insert_medico();

CREATE FUNCTION  update_medico() --Inserta o elimina un medico cuando se actualiza un personal de salud dependiendo del tipo
    RETURNS TRIGGER
    LANGUAGE plpgsql
AS
$$
BEGIN
    IF new.Type = 'Medico' AND old.Type<>new.Type THEN
        INSERT INTO medico (id_medico) VALUES (new.ID_Persona);
    ELSE IF new.Type <> 'Medico' THEN
        DELETE FROM medico where id_medico=new.ID_Persona;
    END IF;
    END IF;
    RETURN new;
end;
$$;

CREATE TRIGGER Alter_Personal_Salud_Medico
    AFTER UPDATE
    ON Personal_Salud
    FOR EACH ROW
    EXECUTE procedure update_medico();

CREATE FUNCTION delete_medico() --Elimina un medico cuando se elimina un personal de salud de tipo 'Medico'
    RETURNS TRIGGER
    LANGUAGE plpgsql
AS
$$
BEGIN
    DELETE FROM medico WHERE id_medico=old.id_persona;
    RETURN old;
end;
$$;

CREATE TRIGGER Delete_Personal_Salud_Medico
    BEFORE DELETE
    ON Personal_Salud
    FOR EACH ROW
    EXECUTE PROCEDURE delete_medico();

CREATE FUNCTION  insert_paciente() --Inserta un paciente cuando una persona esta siendo hospitalizada y/o tratada por primera vez
    RETURNS TRIGGER
    LANGUAGE plpgsql
AS
$$
BEGIN
    IF new.IDPaciente not in (SELECT * FROM Paciente) THEN
        INSERT INTO paciente VALUES (new.IDPaciente);
    END IF;
    RETURN new;
end;
$$;

CREATE TRIGGER create_paciente_hospitalizado
    BEFORE INSERT
    ON Hospitalizado
    FOR EACH ROW
    EXECUTE PROCEDURE insert_paciente();

CREATE TRIGGER create_paciente_tratamiento
    BEFORE INSERT
    ON Requiere
    FOR EACH ROW
    EXECUTE PROCEDURE insert_paciente();

CREATE FUNCTION delete_ps() --Elimina un personal de salud con la misma cedula al eliminar una persona
    RETURNS TRIGGER
    LANGUAGE plpgsql
AS
$$
BEGIN
    DELETE FROM personal_salud WHERE id_persona=old.ID;
    RETURN old;
end;
$$;

CREATE TRIGGER Delete_Persona_ps
    BEFORE DELETE
    ON Persona
    FOR EACH ROW
    EXECUTE PROCEDURE delete_ps();

CREATE FUNCTION delete_paciente() --Elimina un paciente con la misma cedula al eliminar una persona
    RETURNS TRIGGER
    LANGUAGE plpgsql
AS
$$
BEGIN
    DELETE FROM paciente WHERE id_persona=old.ID;
    RETURN old;
end;
$$;

CREATE TRIGGER Delete_Persona_paciente
    BEFORE DELETE
    ON Persona
    FOR EACH ROW
    EXECUTE PROCEDURE delete_paciente();