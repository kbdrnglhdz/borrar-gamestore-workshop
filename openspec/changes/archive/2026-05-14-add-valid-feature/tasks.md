## 1. Backend

- [x] 1.1 Crear archivo `backend/src/routes/add-valid-feature.ts` con el endpoint GET `/api/add-valid-feature` que retorna `{ success: true, data: { message: "Probando todo el flujo" } }`
- [x] 1.2 Importar y registrar la ruta en `backend/src/index.ts` con `app.use('/api/add-valid-feature', addValidFeatureRoutes)`
- [x] 1.3 Verificar que el endpoint responde correctamente con `curl http://localhost:3001/api/add-valid-feature`
