# Reservify - Server

Este es el backend del sistema de reservas Reservify, construido con Node.js, Express y MongoDB.

## Tecnologías Utilizadas

- **Node.js** con **Express**
- **TypeScript**
- **MongoDB**
- **Swagger** para la documentación de la API

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/Neider-Urbano/reservify-backend.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd reservify-backend
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Configura las variables de entorno. Crea un archivo .env en la raíz del proyecto con el siguiente contenido:

   ```bash
   MONGO_URI=<tu_uri_de_mongodb>
   JWT_SECRET=<tu_clave_secreta>
   PORT=3000
   ```

5. Construye el proyecto:

   ```bash
   npm run build
   ```

6. Inicia el servidor:

   ```bash
   npm run start
   ```

## USO

La API está documentada usando Swagger. Puedes acceder a la documentación de la API en http://localhost:3000/api-docs después de iniciar el servidor.

## Frontend

El repositorio del frontend para el sistema de reservas está disponible aquí: [Reservify Frontend](https://github.com/Neider-Urbano/reservify-frontend.git)
