## Why

Mejorar la experiencia de usuario en el formulario de login permitiendo ocultar o mostrar la contraseña mientras se escribe. Esto reduce errores de tipeo y mejora usabilidad sin comprometer seguridad.

## What Changes

- Agregar un botón de toggle (eye icon) en el campo de contraseña del formulario de login
- Alternar entre `type="password"` y `type="text"` al hacer clic
- Solo afecta al frontend, no hay cambios en backend

## Capabilities

### New Capabilities
- `show-password-toggle`: Toggle visual para mostrar/ocultar la contraseña en el formulario de login

### Modified Capabilities
- `auth`: La interfaz de login ahora incluye un toggle de visibilidad de contraseña (cambio UI, no cambia requisitos de backend)

## Impact

- **Frontend**: Componente de formulario de login modificado para incluir toggle de visibilidad
- **Backend**: Sin cambios
- **DB**: Sin cambios

## Riesgos

- **Riesgo**: Usuario podría mostrar la contraseña en pantalla en un entorno público. **Mitigación**: El toggle está desactivado por defecto (campo oculto), el usuario debe hacer clic activamente para mostrar.

## Complejidad

Baja

## Migración de BD

No requiere
