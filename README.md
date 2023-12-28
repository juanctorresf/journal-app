# Journal App

<!-- ![Journal App Logo](link-to-your-logo-image.png) -->

## Descripción

Bienvenido a **Journal App**, una aplicación desarrollada con **React** que te permite llevar un diario personalizado con la capacidad de almacenar notas y añadir imágenes. La aplicación utiliza diversas tecnologías, incluyendo **Redux**, **React Router**, **Firebase**, **Cloudinary** y **Material UI** para proporcionar una experiencia completa y fácil de usar.

Ver [DEMO](https://journal-app-vert-five.vercel.app/auth/login).

## Características Principales

- **Autenticación de Usuario:** Permite a los usuarios crear y gestionar cuentas personalizadas para acceder a la aplicación de forma segura.

- **Creación y Edición de Notas:** Los usuarios pueden crear nuevas notas, editar su contenido y adjuntar imágenes para personalizar sus entradas.

- **Almacenamiento en Tiempo Real:** Utiliza **Firebase** para el almacenamiento en tiempo real, lo que garantiza que los cambios realizados por un usuario se reflejen instantáneamente en todos los dispositivos.

- **Gestión de Estado con Redux:** Implementa **Redux** para una gestión eficiente del estado de la aplicación, facilitando el seguimiento de los cambios y la actualización de la interfaz de usuario de manera coherente.

- **Navegación Fluida:** Se utiliza **React Router** para una navegación suave y una experiencia de usuario sin interrupciones.

- **Gestión de Imágenes con Cloudinary:** Permite a los usuarios adjuntar imágenes a sus notas mediante la integración con **Cloudinary** para el almacenamiento y procesamiento de imágenes.

- **Material UI:** La interfaz de usuario se ha diseñado utilizando componentes de Material UI para lograr un diseño atractivo y consistente.

## Configuración del Proyecto

1. **Clonar el Repositorio:**

    ```bash
    git clone https://github.com/juanctorresf/journal-app.git
    cd journal-app
    ```

2. **Instalar Dependencias:**

    ```bash
    npm install
    ```

3. **Configurar Firebase:**
   - Crea un proyecto en [Firebase](https://console.firebase.google.com/).
   - Obtén las credenciales de tu proyecto y configura la autenticación con Firebase.
   - Configura la base de datos en tiempo real de Firebase.

4. **Configurar Cloudinary:**
   - Regístrate en [Cloudinary](https://cloudinary.com/) y obtén las credenciales.
   - Configura la integración con Cloudinary en la aplicación.

5. **Configurar Variables de Entorno:**
   - Crea un archivo `.env.local` en la raíz del proyecto y configura las variables de entorno necesarias.

    ```env
    VITE_REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
    VITE_REACT_APP_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
    VITE_REACT_APP_FIREBASE_PROJECT_ID=your-firebase-project-id
    VITE_REACT_APP_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
    VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messagin-sender-id
    VITE_REACT_APP_FIREBASE_APP_ID=your-firebase-app-id

    VITE_REACT_APP_CLOUDINARY_CLOUD_URL=your-cloudinary-cloud-url
    ```

6. **Ejecutar la Aplicación:**

    ```bash
    npm start
    ```

La aplicación estará disponible en `http://localhost:3000`.

## Contribuciones

¡Las contribuciones son bienvenidas! Si encuentras algún problema o tienes sugerencias para mejorar la aplicación, no dudes en abrir un problema o enviar un pull request.

<!-- ## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para obtener más detalles. -->

---

¡Esperamos que disfrutes usando **Journal App**! Si tienes alguna pregunta o comentario, no dudes en ponerte en contacto conmigo.

*Hecho con ❤️ por Juan Torres*