/*
  Script de criação do banco de dados "Trio Bit Garage"
*/

CREATE DATABASE IF NOT EXISTS trio_bit_garage_db
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE trio_bit_garage_db;

CREATE TABLE IF NOT EXISTS Usuario (
  id 		INT 		 	NOT NULL 	AUTO_INCREMENT,
  nome 		VARCHAR(150) 	NOT NULL,
  email 	VARCHAR(100) 	NOT NULL,
  perfil 	ENUM('CLIENTE', 'ADMIN', 'FUNCIONARIO') NOT NULL,
  cpf 		VARCHAR(11)  	NOT NULL,
  cnh 		VARCHAR(11)  	NOT NULL,
  telefone  VARCHAR(15),
  senha		VARCHAR(255),
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_email (email),
  UNIQUE KEY uk_cpf (cpf),
  UNIQUE KEY uk_cnh (cnh)
);

CREATE TABLE IF NOT EXISTS Categoria (
  id 		   INT 		      NOT NULL AUTO_INCREMENT,
  nome 		   VARCHAR(45)    NOT NULL,
  descricao    VARCHAR(255),
  valor_diaria DECIMAL(10, 2) NOT NULL,
  
  PRIMARY KEY (id)
);


CREATE TABLE IF NOT EXISTS Veiculo (
  id 		INT 		  NOT NULL AUTO_INCREMENT,
  placa 	VARCHAR(10)   NOT NULL,
  chassi 	VARCHAR(17)   NOT NULL,
  modelo 	VARCHAR(100)  NOT NULL,
  marca 	VARCHAR(100)  NOT NULL,
  quilometragem		INT,
  situacao ENUM('DISPONIVEL', 'ALUGADO', 'MANUTENCAO') NOT NULL,
  Categoria_id 		INT   NOT NULL,
  
  PRIMARY KEY (id),
  UNIQUE KEY uk_placa (placa),
  UNIQUE KEY uk_chassi (chassi),
  
  FOREIGN KEY (Categoria_id) REFERENCES Categoria(id)
    ON DELETE RESTRICT 
    ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Locacao (
  id 				INT 	NOT NULL AUTO_INCREMENT,
  data_retirada     DATE 	NOT NULL,
  data_devolucao 	DATE	NOT NULL,
  valor_total 		DECIMAL(10, 2) 	NOT NULL,
  status ENUM('ATIVA', 'CONCLUIDA', 'CANCELADA') NOT NULL DEFAULT 'ATIVA',
  
  -- Chaves estrangeiras
  Veiculo_id 		INT 	NOT NULL,
  Usuario_id 		INT 	NOT NULL, 
  
  PRIMARY KEY (id),
  
  FOREIGN KEY (Veiculo_id) REFERENCES Veiculo(id)
    ON DELETE RESTRICT 
    ON UPDATE CASCADE,
  FOREIGN KEY (Usuario_id) REFERENCES Usuario(id)
    ON DELETE RESTRICT 
    ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Pagamento (
  id 				         INT	            NOT NULL AUTO_INCREMENT,
  Locacao_id 		     INT		          NOT NULL,
  valor_pago         DECIMAL(10, 2) 	NOT NULL,
  metodo_pagamento	 VARCHAR(50)   		NOT NULL,
  
  
  PRIMARY KEY (id),

  FOREIGN KEY (Locacao_id) REFERENCES Locacao(id)
    ON DELETE RESTRICT 
    ON UPDATE CASCADE
);
