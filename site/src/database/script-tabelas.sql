CREATE DATABASE FREEBOOK;
USE FREEBOOK;


CREATE TABLE USUARIO
(idUsuario int primary key auto_increment,
nome varchar(45),
sobrenome varchar(45),
email varchar(255),
senha varchar(100),
img longtext
);

CREATE TABLE METRICA
(
idMetrica int auto_increment,
dtMetrica date,
qtdVisita int,
livrosPublicados int,
downloads int,
fkUsuario int,foreign key(fkUsuario) references Usuario(idUsuario),
PRIMARY KEY(idMetrica,fkUsuario)
);

CREATE TABLE LIVROS
(idLivro int auto_increment primary key,
titulo varchar(45),
autor varchar(45),
dtLanc date,
img longtext,
descricao longtext,
fkUsuario int, foreign key(fkUsuario) references Usuario(idUsuario)
);
select * from usuario;



