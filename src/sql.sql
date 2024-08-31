
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE tarefas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    completa TINYINT(1) DEFAULT 0,
    categoria VARCHAR(100), 
    prioridade VARCHAR(50),
    dataCadastro DATETIME DEFAULT CURRENT_TIMESTAMP, 
    idUsuario INT,
    FOREIGN KEY (idUsuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

