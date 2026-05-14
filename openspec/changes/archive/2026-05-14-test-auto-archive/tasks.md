## 1. Backend

- [x] 1.1 Crear archivo `backend/src/routes/auto-archive.ts` con el endpoint GET `/api/auto-archive` que retorna `{ success: true, data: { message: "archive-completed.sh" } }`
- [x] 1.2 Importar y registrar la ruta en `backend/src/index.ts` con `app.use('/api/auto-archive', autoArchiveRoutes)`
- [x] 1.3 Verificar que el endpoint responde correctamente con `curl http://localhost:3001/api/auto-archive`
