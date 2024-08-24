create database GestorTickets;
use GestorTickets;


------------------------CREACION TABLAS------------------------
---Tabla Roles
create table Rol (
rol_id int identity(1,1) primary key,
nombre varchar(50) not null
);

---Tabla Permisos
create table Permisos(
permiso_id int identity(1,1) primary key,
nombre varchar(50) not null,
descripcion ntext
);

--Tabla Rol Permisos
create table rol_permisos(
rol_id int not null,
permiso_id int not null,
primary key (rol_id, permiso_id),
foreign key (rol_id) references Rol(rol_id),
foreign key (permiso_id) references Permisos(permiso_id)
);

--Tabla Usuarios
create table Usuarios(
usuario_id int identity(1,1) primary key,
nombre varchar(50) not null,
apellido varchar (50) not null,
email varchar(100) not null unique,
contrasenia varchar(100) not null,
rol_id int not null,
fecha_creacion datetime not null default getdate(),
foreign key (rol_id) references Rol(rol_id)
);

--Tabla Tecnicos
create table Tecnico(
tecnico_id int identity(1,1) primary key,
id_usuario int not null,
telefono int not null,
disponible bit not null default 1,
ickets_asignados int NOT NULL DEFAULT 0,
foreign key (id_usuario) references Usuarios(usuario_id)
);

--Tabla Usuario_Rol
create table Usuario_rol(
usuario_rol_id int identity(1,1) primary key,
usuario_id int not null,
rol_id int not null
foreign key (usuario_id) references Usuarios(usuario_id),
foreign key (rol_id) references Rol(rol_id)
);

--Tabla Categoria
create table Categoria(
categoria_id int identity(1,1) primary key,
nombre varchar(50) not null,
descripcion ntext not null
);

--Tabla Tickets
create table Tickets(
ticket_id int identity(1,1) primary key,
asunto varchar(255) not null,
descripcion varchar(max) not null,
fecha_creacion datetime not null default getdate(),
fecha_limite datetime not null,
estado varchar(50) not null default 'Abierto',
prioridad_id int not null default 2,
categoria_id int not null,
usuario_creador_id int not null,
agente_asignado_id int default null,
foreign key (categoria_id) references Categoria(categoria_id),
foreign key (usuario_creador_id) references Usuarios(usuario_id),
foreign key (agente_asignado_id) references Usuarios(usuario_id),
foreign key (prioridad_id) references Prioridad(prioridad_id)
);

--Tabla Prioridad
create table Prioridad(
prioridad_id int identity (1,1) primary key,
nivel_prioridad varchar(50) not null
);

--Reporte tickets
create table Reporte_ticekts(
historial_id int identity (1,1) primary key,
ticket_id int not null,
fechar datetime not null default getdate(),
accion varchar(255)  not null,
descripcion_accion ntext not null,
agente_responsable_id int not null,
foreign key (ticket_id) references Tickets(ticket_id),
foreign key (agente_responsable_id) references Usuarios(usuario_id)
);


------------------------TRIGGERS FECHA LIMITE------------------------
create trigger asignar_fecha_limite 
on Tickets 
after insert 
as begin
	update Tickets
	set fecha_limite = DATEADD(day, 7, inserted.fecha_creacion)
	from Tickets
	inner join inserted on Tickets.ticket_id = inserted.ticket_id;
end;

------------------------TRIGGERS REGISTRAR REPORTE------------------------
create trigger  registro_ticket
on Tickets
after insert 
as begin
	insert into Reporte_ticekts (ticket_id, accion, descripcion_accion, agente_responsable_id)
	select inserted.ticket_id,
		'Creacion de ticket',
		'Ticket creado con asunto ' + inserted.asunto,
		inserted.usuario_creador_id
	from inserted;
end;

------------------------Procedimiento almacenado para escalamiento------------------------
create procedure escalamiento_ticket
	@ticket_id int,
	@nuevo_prioridad_id int,
    @motivo nvarchar(max),
    @agente_responsable_id int
as begin
	update Tickets
	set prioridad_id = @nuevo_prioridad_id
	where ticket_id = @ticket_id

	insert into Reporte_ticekts (ticket_id, accion, descripcion_accion, agente_responsable_id)
	values (@ticket_id, 'Escalamiento', 'Ticket escalado: ' + @motivo, @agente_responsable_id);
	end;

	---------Ejecutar procedimiento---------
	exec escalamiento_ticket
	@ticket_id = 1,
    @nuevo_prioridad_id = 3, -- ID de la nueva prioridad
    @motivo = N'El ticket requiere atención de un nivel superior.', -- N'' para indicar un NVARCHAR literal
    @agente_responsable_id = 2; -- ID del agente que realiza el escalamiento






------------------------------------------------------------------------------

select *from Categoria;
select *from Tickets;
select *from Reporte_ticekts;

delete from "Usuarios" where usuario_id = '3';

drop table Reporte_ticekts;


SELECT * FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE TABLE_NAME = 'Usuarios' AND CONSTRAINT_TYPE = 'FOREIGN KEY';
ALTER TABLE Usuarios DROP CONSTRAINT rol_id;

EXEC sp_helpconstraint 'Usuarios';

SELECT CONSTRAINT_NAME
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE TABLE_NAME = 'Rol' AND COLUMN_NAME = 'permisos_id';

-- Eliminación de la clave foránea en la tabla Rol
ALTER TABLE Rol DROP CONSTRAINT FK__Rol__permisos_id__4E88ABD4;

ALTER TABLE Rol DROP COLUMN permisos_id;

select * from Usuarios
left join Rol on Rol.rol_id = Usuarios.usuario_id

select * from rol_permisos
where rol_id=2
select *from permisos



------------------------Llenado tablas - Pruebas------------------------
--Tabla Permisos
insert into Permisos (nombre,descripcion)
values
('Crear Ticket', 'Permite crear nuevos tickets'),
('Editar Ticket', 'Permite editar tickets existentes'),
('Asignar Ticket', 'Permite asignar tickets a otros agentes'),
('Reolver Ticket', 'Permite marcar tickets como resueltos'),
('Ver Reportes', 'Permite acceder a reportes del sistema')

--Tabla Rol
insert into Rol (nombre)
values
('Administrador'),
('Tecnico'),
('Usuario')

--Tabla rol_permiso Asignacion de permisos
insert into rol_permisos (rol_id, permiso_id)
values
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), --Administrado
(2, 2), (2, 3), (2, 4), (2, 5), --Tecnico
(3, 1), (3, 5); --Usuario

--Tabla Usuarios
INSERT INTO Usuarios (nombre, apellido, email, contrasenia, rol_id) VALUES
('Pablo', 'Perez', 'pablo@gmail.com', '123', 2), --Administrador
('Juan', 'Perez', 'juan@gmail.com', '123', 1), --Administrador
('Maria', 'Lopez', 'maria@gmail.com', '123', 2), --Tecnico
('Carlos', 'Garcia', 'carlos@gmail.com', '123', 3), --Usuario
('Jose', 'Garcia', 'jose@gmail.com', '123', 1), --Admin
('Manuel', 'Perez', 'manuel@gmail.com', '123', 3); --Admin
('Manuel', 'Perez', 'manuel@gmail.com', '123', 3); --Admin

--Tabla tecnico
INSERT INTO Tecnico (id_usuario, telefono) VALUES
(6, 98456215);

--Tabla categoria
INSERT INTO Categoria (nombre, descripcion) VALUES
('Soporte General', 'Consultas generales sobre el uso de la plataforma'),
('Problemas Técnicos', 'Reportes de fallos o problemas técnicos en la plataforma'),
('Solicitud de Mejora', 'Propuestas para nuevas funcionalidades o mejoras');

--Tabla Tickets
INSERT INTO Tickets (asunto, descripcion, fecha_limite, categoria_id, usuario_creador_id) VALUES
('Problema de conexión', 'No puedo acceder al sistema', DATEADD(day, 7, GETDATE()), 2, 2), -- Usuario Maria
('Error en la plataforma', 'La página de inicio no carga', DATEADD(day, 7, GETDATE()), 2, 2); -- Usuario Maria

--Tabla Prioridad
INSERT INTO Prioridad (nivel_prioridad)
values
('Alta'),
('Media'),
('Baja')




SELECT u.usuario_id, u.nombre, u.apellido, r.nombre as rol_nombre
      FROM Usuarios u
      INNER JOIN Usuario_rol ur ON u.usuario_id = ur.usuario_id
      INNER JOIN Rol r ON ur.rol_id = r.rol_id
      WHERE u.email =  'maria@gmail.com' AND u.contrasenia = '123';


SELECT U.usuario_id, U.nombre, U.apellido, U.rol_id, R.nombre as nombre_rol
        FROM Usuarios U
        INNER JOIN Rol R ON U.rol_id = R.rol_id
        WHERE U.email = 'maria@gmail.com' AND U.contrasenia = '123';
        
INSERT INTO Tickets (asunto, descripcion, fecha_limite, categoria_id, usuario_creador_id) 
            VALUES ('Problema de conexion', 'No se puede acceder al sistema', DATEADD(day, 7, GETDATE()), 2, 2);

INSERT INTO Tickets (asunto, descripcion, fecha_limite, categoria_id, usuario_creador_id) VALUES
('Problema de conexión', 'No puedo acceder al sistema', DATEADD(day, 7, GETDATE()), 2, 3); -- Usuario Maria

select *from Tickets where usuario_creador_id = 3;
select *from Usuarios;

SELECT asunto, descripcion, estado
FROM Tickets
        WHERE usuario_creador_id = 2;

SELECT * FROM Tickets WHERE usuario_creador_id = 3;

SELECT 
    t.asunto,
    t.descripcion,
	t.prioridad_id,
    u.nombre AS nombre_usuario
FROM 
    Tickets t
JOIN 
    Usuarios u ON t.usuario_creador_id = u.usuario_id;

SELECT usuario_id, rol_id, nombre FROM Usuarios WHERE email = 'maria@gmail.com' AND contrasenia = '123'

	exec escalamiento_ticket
	@ticket_id = 15,
    @nuevo_prioridad_id = 1, -- ID de la nueva prioridad
    @motivo = N'El ticket requiere atención de un nivel superior.', -- N'' para indicar un NVARCHAR literal
    @agente_responsable_id = 2; -- ID del agente que realiza el escalamiento


	--------------Asignacion de tickets
ALTER TABLE Tecnico
ADD tickets_asignados int NOT NULL DEFAULT 0;



select * from Tecnico;

SELECT t.tecnico_id, u.nombre AS nombre_tecnico, t.tickets_asignados
FROM Tecnico t
JOIN Usuarios u ON t.id_usuario = u.usuario_id
WHERE t.tecnico_id = 2;

