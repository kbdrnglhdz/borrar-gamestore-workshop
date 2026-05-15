## 1. Backend

- [x] 1.1 Crear archivo `backend/src/routes/test-workflow-1.ts` con el endpoint GET `/api/test-workflow-1` que retorna `{ success: true, data: { message: "Prueba de validación de openspec" } }`
- [x] 1.2 Importar y registrar la ruta en `backend/src/index.ts` con `app.use('/api/test-workflow-1', testWorkflow1Routes)`
- [x] 1.3 Verificar que el endpoint responde correctamente con `curl http://localhost:3001/api/test-workflow-1`
