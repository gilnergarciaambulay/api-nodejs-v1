🧩 Descripción del Proyecto
Esta API está desarrollada con Node.js, Express y TypeScript, siguiendo una arquitectura modular orientada a mantener un código limpio, escalable y fácil de mantener. El objetivo principal es manejar solicitudes de usuarios, procesar lógica de negocio, interactuar con una base de datos SQL Server y enviar correos electrónicos a través de un proveedor SMTP como SendGrid.

🔄 Flujo General
El usuario realiza solicitudes HTTP hacia la API.

El servidor (punto de entrada) inicializa las rutas y middlewares.

Las rutas (Express.js) organizan los endpoints y aplican middlewares según sea necesario.

Los middlewares gestionan validaciones, autenticación y lógica común.

Los controladores procesan las solicitudes y coordinan el acceso a la base de datos o servicios auxiliares.

El módulo de acceso a datos usa mssql para conectarse a una base de datos SQL Server.

Los servicios utilitarios, como el envío de correos, están implementados con Nodemailer y se integran con SendGrid u otro proveedor SMTP.

Finalmente, la API devuelve la respuesta al usuario o realiza las acciones requeridas (como enviar un email).

🛠️ Tecnologías Principales
Node.js + Express

TypeScript

MSSQL (paquete mssql)

Nodemailer

SendGrid (u otro proveedor SMTP)
