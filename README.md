# Backend Mailchimp API Integration 📧

## Descripción 📋
Este proyecto es una **API RESTful** backend desarrollada con **Node.js**, **Sequelize** y **PostgreSQL**. La API está integrada con **Mailchimp** para gestionar suscriptores, listas de correos y campañas. Proporciona un conjunto de **endpoints CRUD** para realizar operaciones sobre los suscriptores, e incluye una documentación interactiva utilizando **Swagger**.

![Mailchimp API](https://img.shields.io/badge/Mailchimp-API--Integration-brightgreen)

## Características 🛠️
- **Integración con Mailchimp**: Interactúa con la API de Mailchimp para gestionar suscriptores, listas y campañas.
- **CRUD de suscriptores**: Endpoints para crear, leer, actualizar y eliminar suscriptores en Mailchimp.
- **Documentación con Swagger**: Acceso a una documentación interactiva para explorar y probar los endpoints de la API.
- **Base de datos PostgreSQL**: Utiliza PostgreSQL como base de datos para almacenar información relacionada con suscriptores y campañas.
- **Migraciones con Sequelize**: Implementación de migraciones para gestionar la estructura de la base de datos.

## Tecnologías utilizadas 💻

- **Node.js**: Plataforma de ejecución para JavaScript en el backend.
- **Sequelize**: ORM para Node.js para interactuar con bases de datos SQL como PostgreSQL.
- **PostgreSQL**: Base de datos relacional utilizada para almacenar información sobre suscriptores y campañas.
- **Mailchimp API**: Integración con la API oficial de Mailchimp para gestionar suscriptores y listas de correo.
- **Swagger**: Herramienta para crear y documentar la API de manera interactiva.
- **Docker**: Contenerización del proyecto para facilitar el desarrollo y despliegue.

![Node.js](https://img.shields.io/badge/Node.js-%E2%9C%94-green)
![Sequelize](https://img.shields.io/badge/Sequelize-%E2%9C%94-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-%E2%9C%94-orange)
![Mailchimp](https://img.shields.io/badge/Mailchimp-%E2%9C%94-yellowgreen)

## Instalación 🚧

### Prerrequisitos
Asegúrate de tener instalados los siguientes programas:
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/) (v12 o superior)
- [Git](https://git-scm.com/)

### Pasos para ejecutar el proyecto

1. **Clona este repositorio**:
   ```bash
   git clone https://github.com/pucara05/mailchimp.git

2. Instala las dependencias: Entra en el directorio del proyecto y ejecuta:
   npm install

3. Levanta el servidor: Para iniciar el servidor de desarrollo, ejecuta:
   npm start

4. Accede a la aplicación: Una vez que el servidor esté en funcionamiento, puedes acceder a la API en:

  http://localhost:3000
  

Rutas:
📋 Obtener listas de Mailchimp
GET /lists
Descripción: Recupera todas las listas de Mailchimp disponibles en tu cuenta.

📤 Crear una campaña en Mailchimp
POST /create-campaign
Descripción: Crea una nueva campaña en Mailchimp.

Cuerpo de la solicitud:

json
Copy code
{
  "list_id": "id_de_lista",
  "subject": "asunto_de_la_campaña",
  "from_name": "nombre_del_remitente",
  "reply_to": "correo_de_respuesta",
  "html_content": "contenido_html"
}
🔍 Verificar existencia de un template por ID
GET /templates/{id}
Descripción: Recupera la información de un template específico utilizando su ID.

📄 Obtener información detallada de las plantillas
GET /templates-info
Descripción: Recupera la información detallada de todas las plantillas.

📝 Crear una campaña utilizando un template predefinido
POST /create-campaign-with-template
Descripción: Crea una campaña utilizando una plantilla predefinida de Mailchimp.

Cuerpo de la solicitud:

json
Copy code
{
  "list_id": "id_de_lista",
  "subject": "asunto_de_la_campaña",
  "from_name": "nombre_del_remitente",
  "reply_to": "correo_de_respuesta",
  "template_id": 12345678
}
🚀 Enviar una campaña
POST /send-campaign
Descripción: Envía una campaña de Mailchimp previamente creada.

Cuerpo de la solicitud:

json
Copy code
{
  "campaign_id": "id_de_la_campaña"
}

Swagger:

La documentación de la API está disponible en Swagger. Puedes acceder a ella en la siguiente URL:
http://localhost:3000/api-docs

Contribuciones 🤝

Si deseas contribuir al proyecto, sigue estos pasos:

Haz un fork del repositorio.

Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).

Realiza tus cambios y haz commit.

Envía un pull request con una descripción clara de las modificaciones.

Licencia 📄

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.
