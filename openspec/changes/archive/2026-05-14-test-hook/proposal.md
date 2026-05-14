## Why

Proveer un endpoint de prueba para validar el hook de Husky en el flujo de CI/CD.

## What Changes

- Crear un nuevo endpoint GET `/api/test-hook` que retorne `{ success: true, data: { message: "Probar Husky" } }`
- Registrar la ruta en el router de Express

## Capabilities

### New Capabilities
- `test-hook-endpoint`: Endpoint de prueba que retorna el mensaje "Probar Husky"

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
