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
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ Requisitos Previos

Antes de levantar el proyecto asegúrate de tener instalado:

- **Node.js** (v18 o superior recomendado)
- **npm** (incluido con Node)
- **PostgreSQL** (u otro motor según tu configuración)
- **Git**

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
git clone https://github.com/USUARIO/REPOSITORIO.git
```

Luego entra a la carpeta del backend:

```bash
cd backend
```

---

### 2️⃣ Instalar dependencias

```bash
npm install
```

Esto instalará todas las dependencias definidas en `package.json`.

---

### 3️⃣ Configurar variables de entorno

Crea un archivo **.env** en la raíz del proyecto (`backend/.env`) con al menos lo siguiente:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_password
DB_NAME=acuakel
JWT_SECRET=clave_secreta_jwt
EMAIL_USER=correo@gmail.com
EMAIL_PASS=clave_del_correo
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

- Postman
- Thunder Client
- Insomnia

Ejemplo:

```
GET http://localhost:3000/api/users
```

---

## 🔐 Autenticación

El proyecto usa **JWT** para autenticación. Una vez iniciado sesión, se debe enviar el token en los headers:

```
Authorization: Bearer TU_TOKEN
```

---

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

- Node.js
- Express
- TypeScript
- PostgreSQL
- JWT
- Nodemailer
- TypeORM / pg (según tu configuración)

---

## 👨‍💻 Autor

Proyecto desarrollado para el sistema **AcuaKel**.

---

## 📌 Notas Importantes

- No subir el archivo `.env` al repositorio.
- Verificar que la base de datos esté creada antes de iniciar el servidor.
- Si hay errores de puerto, revisar que el `PORT` no esté siendo usado por otro proceso.

---

✅ **Backend listo para usarse.**

