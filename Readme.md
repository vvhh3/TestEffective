
## Стек технологий

- Node.js, Express, TypeScript
- React, TypeScript, Vite, React Router
- PostgreSQL + Sequelize ORM

## Тестовые учётные записи

| Email | Роль | Пароль |
|---|---|---|
| `admin@example.com` | admin | `admin123` |
| `manager@example.com` | manager | `manager123` |
| `user@example.com` | user | `user123` |

Тестовые данные создаются автоматически при первом запуске backend.


## Запуск проекта

Перед запуском должна быть запущена postgreSql 

и создать .env файл в папке backend
```
DB_PASSWORD=
DB_NAME=
DB_USER=
JWTSecret=
```

### Backend

```bash
cd backend
npm install
npm run dev          # tsx watch src/index.ts — http://localhost:5000
```

### Frontend

```bash
cd frontend
npm install
npm run dev          # Vite dev server — http://localhost:5173
```