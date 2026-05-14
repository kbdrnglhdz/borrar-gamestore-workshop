## Why

Proveer un endpoint de prueba que permita validar el flujo completo de OpenSpec (proponer, aplicar, verificar, archivar).

## What Changes

- Crear un nuevo endpoint GET `/api/add-valid-feature` que retorne `{ success: true, data: { message: "Probando todo el flujo" } }`
- Registrar la ruta en el router de Express

## Capabilities

### New Capabilities
- `valid-feature-endpoint`: Endpoint de prueba que retorna el mensaje "Probando todo el flujo"

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
