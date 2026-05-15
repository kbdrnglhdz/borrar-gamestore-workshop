## Why

Proveer un endpoint de prueba para validar el flujo completo de OpenSpec (proponer, aplicar, verificar, archivar).

## What Changes

- Crear un nuevo endpoint GET `/api/test-workflow-1` que retorne `{ success: true, data: { message: "Prueba de validación de openspec" } }`
- Registrar la ruta en el router de Express

## Capabilities

### New Capabilities
- `test-workflow-endpoint`: Endpoint de prueba que retorna el mensaje "Prueba de validación de openspec"

### Modified Capabilities

Ninguna.

## Impact

- **Backend**: Nuevo endpoint en Express
- **Frontend**: Sin cambios
- **DB**: Sin cambios

## Riesgos

- Ninguno relevante.

## Complejidad

Baja

## Migración de base de datos

No requiere.
