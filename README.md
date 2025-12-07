# AcuaKel - Backend 🐟

Backend del proyecto **AcuaKel**, una plataforma orientada al comercio y gestión de productos de acuarismo. Este proyecto está desarrollado con **Node.js + Express + TypeScript**, siguiendo una arquitectura por capas (controllers, services, repositories, entities).

---

## 📂 Estructura Principal

```
backend/
├── dist
├── node_modules
├── src
│   ├── @types
│   ├── application
│   ├── config
│   ├── routes
│   ├── app.ts
│   └── server.ts
├── ..env
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ Requisitos Previos

Antes de levantar el proyecto asegúrate de tener instalado:

* **Node.js** (v18 o superior recomendado)
* **npm** (incluido con Node)
* **PostgreSQL** (u otro motor según tu configuración)
* **Git**

Puedes verificar con:

```bash
node -v
npm -v
psql --version
git --version
```

---

## 🚀 Instalación del Proyecto

### 1️⃣ Clonar el repositorio desde GitHub

```bash
git clone https://github.com/KelviCalle20/acuakel_backend.git
```

Luego entra a la carpeta del backend:

```bash
cd backend
```

---

### 2️⃣ Instalar dependencias

Ejecuta el siguiente comando en la raíz del proyecto:

```bash
npm install
```

Esto instalará automáticamente **todas las dependencias y dependencias de desarrollo** definidas en tu `package.json`.

---

### 📦 Instalación manual (solo si es necesario)

Si por algún motivo necesitas instalar los paquetes manualmente, puedes usar:

#### Dependencias Principales

```bash
npm install bcrypt cors dotenv express jsonwebtoken nodemailer pg reflect-metadata typeorm
```

#### Dependencias de Desarrollo

```bash
npm install -D @types/bcrypt @types/cors @types/express @types/jsonwebtoken @types/node @types/nodemailer @types/pg nodemon ts-node typescript
```

---

### 3️⃣ Configurar variables de entorno

Crea un archivo **.env** en la raíz del proyecto (`backend/.env`) con al menos lo siguiente:

```env
# ======= SERVIDOR =======
PORT=4000

# ======= BASE DE DATOS =======
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_password
DB_NAME=acuakel

# ======= JWT =======
JWT_SECRET=tu_clave_secreta_jwt

# ======= EMAIL (Nodemailer) =======
EMAIL_USER=correo@gmail.com
EMAIL_PASS=contraseña_generada_de_aplicacion

# ======= MULTIMEDIA =======
MEDIA_PATH=C:/ruta/a/tu/carpeta/media

# ADMIN por defecto (misma cuenta para notificación y login)
ADMIN_EMAIL=Tu_correo_real_existente
ADMIN_NAME=nombre_admin
ADMIN_APELLIDO_PATERNO=apellidoPaterno_admin
ADMIN_APELLIDO_MATERNO=apellidoMaterno_admin
ADMIN_PASSWORD=admin123 #cualquiera este sera para que inicies sesion como Administrador


```

> ⚠️ Ajusta estos valores según tu configuración local.

---

### 4️⃣ Compilar el proyecto (opcional)

Si deseas compilar TypeScript a JavaScript:

```bash
npm run build
```

Esto generará la carpeta `dist/`.

---

### 5️⃣ Levantar el servidor en modo desarrollo

```bash
npm run dev
```

El servidor se levantará normalmente en:

```
http://localhost:3000
```

---

### 6️⃣ Levantar el servidor en producción

```bash
npm start
```

---

## 🧪 Pruebas de Endpoints

Puedes probar los endpoints usando:

* Postman
* Thunder Client
* Insomnia

Ejemplo:

```
GET http://localhost:3000/api/users
```

---

## 🗄️ Configuración de la Base de Datos (Muy Importante)

Este proyecto utiliza **PostgreSQL con TypeORM**.

### 1️⃣ Crear la base de datos **antes de ejecutar el backend**

Después de clonar el repositorio, el usuario **debe crear manualmente la base de datos** en PostgreSQL antes de levantar el servidor.

Ejemplo usando la consola de PostgreSQL:

```sql
CREATE DATABASE acuakel;
```

Verifica que el nombre coincida con el valor de:

```
DB_NAME=acuakel
```

---

### 2️⃣ Modo de creación de tablas (`synchronize`)

En el archivo:

```
src/config/db.ts
```

Existe la siguiente configuración:

```ts
synchronize: false,
```

#### 🔹 ¿Qué significa esto?

* `false` → **NO crea las tablas automáticamente**, solo usa las que ya existen en la base de datos.
* `true` → **Crea automáticamente todas las tablas** a partir de las entidades (`entities`).

---

### 3️⃣ Primer uso del proyecto (si NO existen las tablas)

Si el usuario que clona el proyecto **no tiene las tablas creadas**, debe:

1. Crear la base de datos en PostgreSQL.
2. Abrir el archivo:

```
src/config/db.ts
```

3. Cambiar temporalmente:

```ts
synchronize: false,
```

por

```ts
synchronize: true,
```

4. Guardar los cambios.
5. Ejecutar el servidor:

```bash
npm run dev
```

6. Esperar a que TypeORM cree todas las tablas automáticamente.
7. Luego **volver a cambiar a `false`** para evitar sobreescrituras en producción.

```ts
synchronize: false,
```

✅ Con esto todas las tablas quedarán creadas correctamente.

---

### ⚠️ Advertencia Importante

> **Nunca uses `synchronize: true` en producción**, ya que puede borrar o modificar tablas existentes.

---

## 🔐 Autenticación

## 🛠️ Scripts Disponibles

```json
"scripts": {
  "dev": "nodemon --watch src --exec ts-node src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js"
}
```

---

## ✅ Tecnologías Usadas

* Node.js
* Express
* TypeScript
* PostgreSQL
* JWT
* Nodemailer
* TypeORM / pg (según tu configuración)

---

## 👨‍💻 Autor

Proyecto desarrollado para el sistema **AcuaKel**.

---

## 🌐 Acceso desde celular y red local

El servidor está configurado para escuchar en todas las interfaces de red mediante:

```ts
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
});
```

Esto permite acceder al backend desde un **celular u otro equipo de la misma red WiFi** usando la IP de tu PC.

Ejemplo:

```
http://192.168.1.10:4000
```

---

## 🗄️ Usuario Administrador por Defecto

Al iniciar el backend, se crea automáticamente un **usuario administrador** si no existe:

* Correo y contraseña definidos en `.env`
* Se crea un rol `Administrador` si no existe
* Se asigna el rol al usuario
* Se envía un correo de notificación con los datos de login

> ⚠️ Si ya existe el administrador, **no se duplica**. Solo se crea nuevamente si se elimina.

---

---

## 🎬 Archivos multimedia (MEDIA_PATH)

Este proyecto expone archivos multimedia de forma pública mediante:

```ts
app.use("/media", express.static(path.resolve(mediaPath)));
```

Por lo tanto, es **obligatorio definir en el archivo `.env`** la ruta absoluta de la carpeta multimedia:

```env
MEDIA_PATH=C:/ruta/a/tu/carpeta/media
```

Ejemplo de endpoints públicos:

```
GET /api/media
GET /media/bettas.mp4
GET /media/AcuaKel.mp3
```

Si `MEDIA_PATH` no está definido, el servidor **no iniciará**.

---

## 🔐 Autenticación disponible

Las siguientes rutas funcionan correctamente desde navegador, Postman o celular:

* Login
* Registro
* Recuperación de contraseña

Todas expuestas bajo:

```
/api/auth
```

---

## 📌 Notas Importantes

* No subir el archivo `.env` al repositorio.
* Verificar que la base de datos esté creada antes de iniciar el servidor.
* Verificar que `MEDIA_PATH` exista físicamente en el sistema.
* Si el puerto está ocupado, cambiar el valor en `PORT`.
* Para acceso desde celular, ambos dispositivos deben estar en la **misma red local**.

---

✅ **Backend listo para usarse tanto en PC como en celular.**
