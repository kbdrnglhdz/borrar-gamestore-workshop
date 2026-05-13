## Context

El formulario de login actual tiene un campo de contraseña estándar sin opción de mostrar/ocultar el texto. Los usuarios pueden cometer errores al tipear sin poder ver lo que escriben.

## Goals / Non-Goals

**Goals:**
- Agregar un botón toggle con ícono de ojo (eye icon) en el campo de contraseña del formulario de login
- Alternar entre `type="password"` y `type="text"` al hacer clic
- Estado por defecto: oculto (password)

**Non-Goals:**
- No modificar lógica de autenticación backend
- No cambiar estilos generales del formulario
- No aplicar a otros formularios (register, etc.) a menos que se decida después

## Decisions

| Decisión | Alternativas | Por qué |
|---|---|---|
| Estado inicial oculto | Estado inicial visible | Seguridad por defecto; mostrar requiere acción explícita del usuario |
| Ícono de ojo (abierto/cerrado) | Texto "Mostrar/Ocultar" | Más intuitivo y ocupa menos espacio; estándar en la industria |
| Implementar con estado local de React | Estado global o librería externa | Es un componente simple sin necesidad de estado compartido; evita dependencias extras |
| Ubicación dentro del input (padding) | Fuera del input | UX más limpia, consistente con patrones modernos |

## Archivos nuevos y modificados

- **Modificado**: `src/components/LoginForm.tsx` — Agregar toggle de visibilidad en el campo de contraseña

## Riesgos / Trade-offs

- [Bajo] Usuario muestra contraseña en pantalla pública → Es una acción deliberada del usuario (click en el toggle)
- [Bajo] El ícono podría no ser accesible → Usar atributo `aria-label` en el botón
