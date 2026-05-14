## 1. Backend

- [ ] 1.1 Crear archivo `backend/src/routes/test-hook.ts` con el endpoint GET `/api/test-hook` que retorna `{ success: true, data: { message: "Probar Husky" } }`
- [ ] 1.2 Importar y registrar la ruta en `backend/src/index.ts` con `app.use('/api/test-hook', testHookRoutes)`
- [ ] 1.3 Verificar que el endpoint responde correctamente con `curl http://localhost:3001/api/test-hook`
