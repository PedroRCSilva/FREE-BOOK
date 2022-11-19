
CREATE DATABASE FREEBOOK;
USE FREEBOOK;
CREATE TABLE USUARIO
(idUsuario int primary key auto_increment,
nome varchar(45),
sobrenome varchar(45),
email varchar(255) UNIQUE,
senha varchar(100),
img longtext
);

CREATE TABLE METRICA
(
idMetrica int auto_increment,
dtMetrica datetime,
qtdVisita int,
fkUsuario int,foreign key(fkUsuario) references Usuario(idUsuario),
PRIMARY KEY(idMetrica,fkUsuario)
);

CREATE TABLE LIVRO
(idLivro int auto_increment primary key,
titulo varchar(45),
autor varchar(45),
dtLanc date,
img longtext,
url longtext,
descricao longtext,
downloads int,
fkUsuario int, foreign key(fkUsuario) references Usuario(idUsuario)
);

select * from usuario;
select * from metrica;
select * from livros;




