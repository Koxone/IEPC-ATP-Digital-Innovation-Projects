````markdown
# Documentación Explicativa de los Software Engineering Guidelines

Este documento explica en español los estándares, reglas y decisiones técnicas definidos en el archivo oficial *
*Software Engineering Standards & Guidelines**.

Su objetivo es facilitar el entendimiento, el onboarding y la correcta aplicación de las reglas por parte de cualquier
desarrollador que trabaje en los proyectos del equipo.

Este documento **no sustituye** las reglas oficiales; únicamente las explica.

---

## 0. Uso del Repositorio Template

El repositorio base es un **template de proyecto** ya configurado con:

- Next.js
- TypeScript en modo estricto
- Tailwind CSS
- Prettier
- pnpm
- Estructura alineada a Clean Architecture y DDD

### ¿Por qué usar un template?

- Garantiza **consistencia** entre proyectos.
- Evita configuraciones manuales incorrectas.
- Reduce el tiempo de arranque de nuevos proyectos.
- Asegura que todos los proyectos cumplen los estándares desde el primer commit.

### Flujo esperado

1. Clonar el repositorio.
2. Ejecutar `pnpm install`.
3. Configurar variables de entorno si aplica.
4. Iniciar el servidor con `pnpm dev`.

No se deben eliminar configuraciones base ni cambiar la estructura sin una razón técnica justificada y aprobada.

---

## 1. Stack Tecnológico Principal

El stack está definido para mantener coherencia, escalabilidad y facilidad de mantenimiento.

### Next.js

Framework elegido por:

- Soporte nativo para SSR, SSG y APIs.
- Excelente integración con TypeScript.
- Estándar en aplicaciones modernas React.

### TypeScript (Strict Mode)

- Reduce errores en runtime.
- Obliga a contratos claros entre capas.
- Mejora refactors y mantenibilidad.

> El modo estricto es obligatorio para garantizar calidad de código.

### Tailwind CSS

- Estilos predecibles y reutilizables.
- Evita CSS global y efectos colaterales.
- Acelera desarrollo de UI consistente.

### MongoDB + Mongoose

- Base de datos flexible orientada a documentos.
- Mongoose impone esquemas y validaciones.
- Ideal para modelar dominios complejos.

### pnpm

- Gestión eficiente de dependencias.
- Consistencia del lockfile entre equipos.
- Menor consumo de espacio y errores de instalación.

### Prettier

- Formato automático y homogéneo.
- Elimina discusiones de estilo.
- Integrado en CI/CD.

### WebStorm

- IDE unificado y estandarizado.
- Análisis estático avanzado.
- Refactors seguros en TypeScript.

---

## 2. Regla Universal de Idioma

**Todo debe escribirse en inglés**, sin excepciones:

- Código
- Variables
- Funciones
- Clases
- Carpetas
- Colecciones de base de datos
- Commits
- Pull Requests

### ¿Por qué?

- Facilita colaboración internacional.
- Evita mezclas de idioma confusas.
- Sigue estándares profesionales de la industria.

También se prohíbe:

- Espacios en nombres
- Caracteres especiales
- Abreviaciones ambiguas

---

## 3. Convenciones de Nombres

Las convenciones existen para que el código sea **predecible** y **legible** sin contexto adicional.

### Carpetas

Usan `kebab-case`:

- Favorece compatibilidad entre sistemas.
- Evita problemas en sistemas case-sensitive.
- Es el estándar en proyectos frontend modernos.

### Archivos

- Componentes React: `PascalCase.tsx`
- Archivos TypeScript comunes: `kebab-case.ts`

Esto permite identificar rápidamente el propósito del archivo.

### Elementos de código

- Variables y funciones: `camelCase`
- Clases e interfaces: `PascalCase`
- Constantes: `UPPER_SNAKE_CASE`

Estas reglas permiten distinguir semánticamente cada elemento al leer el código.

---

## 4. Arquitectura: Clean Architecture y DDD

La arquitectura busca separar responsabilidades y proteger el dominio del negocio.

### Principios clave

- El dominio no depende de frameworks.
- Las reglas del negocio son el núcleo del sistema.
- Las dependencias apuntan siempre hacia el dominio.

### Capas definidas

#### Domain

- Entidades
- Value Objects
- Interfaces de repositorios
- Reglas de negocio puras

No debe importar nada de Next.js, Mongoose u otras librerías externas, debe ser Typescript 100%.

#### Application

- Casos de uso
- Orquestación de reglas de negocio
- Coordinación entre entidades y repositorios

#### Infrastructure

- Implementaciones técnicas:
    - Repositorios Mongoose
    - Conexiones a base de datos
    - Integraciones externas

#### Presentation

- Componentes de UI
- API Routes de Next.js
- Manejo de requests y responses

---

## 5. Estándares de Base de Datos

### Nombre de la base de datos

Formato obligatorio:

```text
[project-name]-[environment]
````

Esto permite identificar claramente:

* A qué proyecto pertenece
* En qué entorno se ejecuta

### Colecciones

* Siempre en minúsculas
* Plural
* En inglés

Ejemplo: `users`, `orders`, `sensorreadings`

### Acceso a datos

Está **prohibido**:

* Usar consultas directas de MongoDB
* Acceder a modelos desde capas incorrectas

Todo acceso debe:

* Pasar por Mongoose
* Estar encapsulado en repositorios
* Vivir en la capa Infrastructure

***

## 6. Control de Versiones (GitHub)

La estrategia de branches busca:

* Proteger producción
* Mantener estabilidad
* Facilitar revisión de código

### Branches

* `main`: producción (bloqueado)
* `staging`: integración (bloqueado)
* `feature/*`: nuevas funcionalidades
* `fix/*`: correcciones de bugs

Nunca se hace push directo a `main` o `staging`.

***

## 7. Commits y Pull Requests

### Commits semánticos

El prefijo comunica la intención del cambio:

* `feature:` nueva funcionalidad
* `fix:` corrección de bug
* `refactor:` mejora interna sin cambio funcional
* `chore:` tareas de mantenimiento

Esto mejora:

* Lectura del historial
* Generación de changelogs
* Revisión de cambios

### Pull Requests

Todo cambio debe:

* Pasar por revisión
* Cumplir estándares
* Estar formateado correctamente

***

## 8. Gestión de Dependencias

Solo se permite **pnpm**.

Esto previene:

* Cambios inesperados en dependencias
* Diferencias de lockfile
* Problemas entre entornos

Todos los repositorios deben incluir:

* `pnpm-lock.yaml`

***

## 9. Entorno de Desarrollo (IDE)

### WebStorm es obligatorio

Se elige por:

* Entorno homogéneo
* Análisis estático avanzado
* Refactors seguros
* Integraciones nativas

Esto reduce errores típicos de:

* Extensiones inconsistentes
* Configuraciones personales
* Diferencias entre máquinas

***

## 10. Formato y Linting

Prettier es obligatorio y no negociable.

* El código debe estar formateado antes de commitear.
* WebStorm debe formatear al guardar.
* El CI rechazará código no formateado.

La consistencia visual es un requisito de calidad, no una preferencia.

***

## Conclusión

Estos guidelines existen para:

* Mantener calidad técnica
* Facilitar mantenimiento a largo plazo
* Escalar equipos sin degradar el código
* Reducir errores humanos

El cumplimiento es obligatorio para todos los proyectos y desarrolladores del equipo.

```