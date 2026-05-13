## Why

Agregar un endpoint de prueba para validar que el servidor responde correctamente cuando se cambia el idioma a español. Sirve como punto de verificación rápida para el equipo de desarrollo.

## What Changes

- Nuevo endpoint GET `/api/test/spanish` que responde con un mensaje en español
- No modifica funcionalidad existente
- No requiere autenticación

## Capabilities

### New Capabilities
- `test-spanish`: Endpoint de prueba que retorna un mensaje de confirmación de cambio de idioma

### Modified Capabilities

<!-- Ninguna -->

## Impact

- **Backend**: Nuevo endpoint GET `/api/test/spanish` en el router de prueba
- **Frontend**: Sin cambios
- **DB**: Sin cambios

## Riesgos

- **Riesgo**: El endpoint podría desplegarse a producción sin restricción. **Mitigación**: El endpoint no accede a datos sensibles ni modifica estado, solo retorna un mensaje estático.

## Complejidad

Baja

## Migración de BD

No requiere
