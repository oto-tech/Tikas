create database GestorTickets2;
use GestorTickets2;

-- Tabla Rol
CREATE TABLE Rol (
    rol_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

-- Inserción de datos en Rol
INSERT INTO Rol (nombre)
VALUES
('Administrador'),
('Tecnico'),
('Usuario');
('Eliminado');

-- Tabla Usuarios
CREATE TABLE Usuarios (
    usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    contrasenia VARCHAR(100) NOT NULL,
    rol_id INT NOT NULL DEFAULT 3,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (rol_id) REFERENCES Rol(rol_id)
);

-- Inserción de datos en Usuarios
INSERT INTO Usuarios (nombre, apellido, email, contrasenia)
VALUES
('Carlos', 'Garcia', 'carlos@gmail.com', '123'), -- Usuario
('Manuel', 'Perez', 'manuel@gmail.com', '123'); -- Usuario

-- Tabla Tecnico
CREATE TABLE Tecnico (
    tecnico_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    contrasenia VARCHAR(100) NOT NULL,
    rol_id INT NOT NULL DEFAULT 2,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (rol_id) REFERENCES Rol(rol_id)
);

-- Inserción de datos en Tecnico
INSERT INTO Tecnico (nombre, apellido, email, contrasenia)
VALUES
('Pablo', 'Perez', 'pablo@gmail.com', '123'), -- Técnico
('Maria', 'Lopez', 'maria@gmail.com', '123'); -- Técnico

-- Tabla Prioridad
CREATE TABLE Prioridad (
    prioridad_id INT AUTO_INCREMENT PRIMARY KEY,
    nivel_prioridad VARCHAR(50) NOT NULL
);

-- Inserción de datos en Prioridad
INSERT INTO Prioridad (nivel_prioridad)
VALUES
('Alta'),
('Media'),
('Baja');

-- Tabla TecnicoPrioridad
CREATE TABLE TecnicoPrioridad (
    tecnicoPrioridad_id INT AUTO_INCREMENT PRIMARY KEY,
    prioridad_id INT NOT NULL,
    tecnico_id INT NOT NULL,
    FOREIGN KEY (prioridad_id) REFERENCES Prioridad(prioridad_id),
    FOREIGN KEY (tecnico_id) REFERENCES Tecnico(tecnico_id)
);

-- Inserción de datos en TecnicoPrioridad
INSERT INTO TecnicoPrioridad (prioridad_id, tecnico_id)
VALUES
(1, 1), -- Técnico Pablo
(2, 2); -- Técnico Maria

-- Tabla Administrador
CREATE TABLE Administrador (
    administrador_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    contrasenia VARCHAR(100) NOT NULL,
    rol_id INT NOT NULL DEFAULT 1,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (rol_id) REFERENCES Rol(rol_id)
);

-- Inserción de datos en Administrador
INSERT INTO Administrador (nombre, apellido, email, contrasenia)
VALUES
('Cristhoper', 'Jimenez', 'cristhoper@gmail.com', '123'); -- Administrador

-- Tabla Categoria 
CREATE TABLE Categoria (
    categoria_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT NOT NULL
);

-- Inserción de datos en Categoria
INSERT INTO Categoria (nombre, descripcion)
VALUES
('Soporte General', 'Consultas generales sobre el uso de la plataforma'),
('Problemas Técnicos', 'Reportes de fallos o problemas técnicos en la plataforma'),
('Solicitud de Mejora', 'Propuestas para nuevas funcionalidades o mejoras');

-- Tabla Estado
CREATE TABLE Estado (
    estado_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

-- Inserción de datos en Estado
INSERT INTO Estado (nombre)
VALUES
('Abierto'),
('Cerrado');

-- Tabla Tickets
CREATE TABLE Tickets (
    ticket_id INT AUTO_INCREMENT PRIMARY KEY,
    asunto VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_limite DATETIME NOT NULL,
    estado_id INT NOT NULL DEFAULT 1,
    estado VARCHAR(255) NOT NULL DEFAULT 'ABIERTO',
    solucion VARCHAR(255) NOT NULL DEFAULT 'PENDIENTE',
    prioridad_id INT NOT NULL DEFAULT 2,
    categoria_id INT NOT NULL,
    usuario_creador_id INT NOT NULL,
    agente_asignado_id INT DEFAULT NULL,
    FOREIGN KEY (estado_id) REFERENCES Estado(estado_id),
    FOREIGN KEY (categoria_id) REFERENCES Categoria(categoria_id),
    FOREIGN KEY (usuario_creador_id) REFERENCES Usuarios(usuario_id),
    FOREIGN KEY (agente_asignado_id) REFERENCES Usuarios(usuario_id),
    FOREIGN KEY (prioridad_id) REFERENCES Prioridad(prioridad_id)
);

-- Inserción de datos en Tickets
INSERT INTO Tickets (asunto, descripcion, fecha_limite, categoria_id, usuario_creador_id)
VALUES
('Problema de conexión', 'No puedo acceder al sistema', DATE_ADD(CURRENT_DATE, INTERVAL 7 DAY), 2, 2), -- Usuario Maria
('Error en la plataforma', 'La página de inicio no carga', DATE_ADD(CURRENT_DATE, INTERVAL 7 DAY), 2, 1); -- Usuario Carlos




