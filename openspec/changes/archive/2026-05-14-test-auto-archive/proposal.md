## Why

Proveer un endpoint de prueba para validar el flujo de archivado automático de cambios completados.

## What Changes

- Crear un nuevo endpoint GET `/api/auto-archive` que retorne `{ success: true, data: { message: "archive-completed.sh" } }`
- Registrar la ruta en el router de Express

## Capabilities

### New Capabilities
- `auto-archive-endpoint`: Endpoint de prueba que retorna el mensaje "archive-completed.sh"

### Modified Capabilities

Ninguna.

## Impact

- **Backend**: Nuevo endpoint en Express
- **Frontend**: Sin cambios
- **DB**: Sin cambios

## Riesgos

- Ninguno relevante. Cambio trivial sin efectos secundarios.

## Complejidad

Baja

## Migración de base de datos

No requiere.
