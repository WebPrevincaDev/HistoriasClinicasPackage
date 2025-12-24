# Reporte de Auditoría de Código: AMCE HCD (Historias Clínicas)

**Fecha de análisis:** 26 de Noviembre de 2025
**Stack tecnológico:** React Native (Expo SDK 52), Redux Toolkit, Firebase, Odoo (Backend), React Hook Form.
**Alcance:** Análisis estático del código fuente en `src/`, configuración del proyecto y dependencias.

---

## Resumen Ejecutivo

El proyecto es una aplicación móvil desarrollada en React Native con Expo para la gestión de historias clínicas de emergencia. Si bien la estructura de directorios es estándar y utiliza librerías modernas como Redux Toolkit y React Hook Form, el proyecto presenta **riesgos críticos de seguridad y performance** que deben ser abordados de inmediato.

La ausencia total de tests automatizados y pipelines de CI/CD hace que el proyecto sea frágil ante cambios y difícil de mantener. Se detectaron prácticas inseguras como el manejo de contraseñas en texto plano y el uso de HTTP en lugar de HTTPS. Además, existen cuellos de botella de rendimiento significativos en la búsqueda de pacientes que afectarán la escalabilidad.

### Métricas Generales

| Métrica | Valor | Estado |
|---------|-------|--------|
| Archivos analizados | ~15 (Muestreo) | - |
| Dependencias | 35+ | ⚠️ (Algunas legacy) |
| Cobertura de tests | 0% | 🔴 Crítico |
| Issues críticos | 3 | 🔴 |
| Issues medios | 4 | 🟡 |

---

## Hallazgos Críticos (Prioridad Alta)

### [HC-001] Manejo Inseguro de Contraseñas

- **Ubicación:** `src/store/slices/auth/thunks.js:53` y `src/store/slices/auth/thunks.js:85`
- **Categoría:** Seguridad
- **Impacto:** Las contraseñas se comparan en texto plano en el cliente y se envían a Firebase sin hashing previo aparente o se almacenan inseguramente en el backend Odoo/Local. Si el dispositivo o la red son comprometidos, las credenciales de los usuarios están expuestas.
- **Código actual:**

```javascript
// thunks.js
if (user.app_password !== data.password)
    throw new Error("Contraseña incorrecta");

// ...
await registerUserInFirebase(data.email, data.password);
```

- **Solución propuesta:**
    1.  **Nunca** comparar contraseñas en el cliente. La autenticación debe ocurrir en el servidor (Odoo) y devolver un token (JWT).
    2.  Si se usa Firebase Auth, utilizar el SDK de cliente para autenticar directamente contra Firebase, no enviar la contraseña cruda a una función personalizada si no es necesario.

- **Esfuerzo estimado:** Alto (Requiere cambios en Backend y Frontend).

### [HC-002] Comunicación No Cifrada (HTTP)

- **Ubicación:** `src/services/CreatePdfService.js:43` y `app.json` (`usesCleartextTraffic: true`)
- **Categoría:** Seguridad
- **Impacto:** La aplicación permite tráfico HTTP no cifrado y carga recursos (imágenes) desde URLs HTTP. Esto permite ataques Man-in-the-Middle (MitM) donde un atacante puede interceptar o modificar datos médicos sensibles.
- **Código actual:**

```javascript
// CreatePdfService.js
<img src="http://amce.anacsoft.com/asw_amce/static/src/img/amce-siempre.jpg" ... />
```

- **Solución propuesta:**
    1.  Migrar todos los endpoints y recursos a **HTTPS**.
    2.  Deshabilitar `usesCleartextTraffic` en `app.json` para Android.

- **Esfuerzo estimado:** Medio.

### [HC-003] Búsqueda de Pacientes Ineficiente (O(N))

- **Ubicación:** `src/screens/HcdScreens/Paciente.js:120`
- **Categoría:** Performance
- **Impacto:** La aplicación descarga **toda** la base de datos de pacientes (`getAllByKey`) al dispositivo para buscar uno por DNI localmente. A medida que crezca la base de datos, esto congelará la UI y consumirá datos excesivos.
- **Código actual:**

```javascript
// Paciente.js
const pacientes = await getAllByKey("asw.paciente"); // Descarga TODOS
const res = pacientes.find((paciente) => paciente.pac_dni === pac_dni_value);
```

- **Solución propuesta:**
    Implementar un endpoint de búsqueda en el backend o usar una query filtrada en la base de datos local/remota que retorne solo el registro coincidente.

```javascript
// Propuesta
const paciente = await searchPatientByDni(pac_dni_value);
```

- **Esfuerzo estimado:** Medio (Requiere endpoint/query específica).

---

## Hallazgos Importantes (Prioridad Media)

### [HI-001] Ausencia de Tests Automatizados

- **Ubicación:** Todo el proyecto
- **Categoría:** Mantenibilidad / Calidad
- **Impacto:** No hay evidencia de tests unitarios, de integración o E2E. Cualquier refactorización o nueva feature tiene un alto riesgo de introducir regresiones no detectadas.
- **Solución propuesta:**
    1.  Instalar `jest` y `react-test-renderer` o `testing-library/react-native`.
    2.  Comenzar con tests unitarios para los `thunks` y utilidades (`helpers`).
    3.  Agregar Snapshot tests para componentes UI simples.

### [HI-002] Lógica de Negocio en Vistas y Servicios "God Object"

- **Ubicación:** `src/services/CreatePdfService.js` y `src/screens/HcdScreens/Paciente.js`
- **Categoría:** Arquitectura
- **Impacto:** `CreatePdfService` mezcla lógica de presentación (HTML strings) con lógica de negocio. `Paciente.js` contiene lógica de validación compleja dentro del componente. Esto dificulta la lectura y el testing.
- **Solución propuesta:**
    1.  Extraer la generación de HTML a plantillas separadas o componentes funcionales pequeños.
    2.  Mover validaciones complejas a un esquema de validación (ej. `yup` o `zod`) fuera del componente React.

### [HI-003] Strings Hardcodeados y Falta de i18n

- **Ubicación:** `src/screens/SignIn/SignIn.js`, `src/services/CreatePdfService.js`
- **Categoría:** Mantenibilidad
- **Impacto:** Mensajes de error y textos de UI están "quemados" en el código. Dificulta la corrección de textos y futura internacionalización.
- **Solución propuesta:**
    Centralizar textos en archivos de constantes o usar una librería como `i18next`.

---

## Oportunidades de Refactorización

### Refactorización 1: Optimización de Búsqueda de Pacientes

**Archivos afectados:**
- `src/screens/HcdScreens/Paciente.js`
- `src/helpers/data.js` (asumido)

**Estado actual:**
Se descargan todos los pacientes para filtrar en memoria.

**Propuesta:**
Crear un método `getPatientByDni(dni)` en la capa de servicio que ejecute la búsqueda optimizada (SQL `WHERE` o llamada API con filtro).

**Beneficios:**
- Reducción drástica del uso de memoria y red.
- Respuesta instantánea para el usuario.

**Pasos de implementación:**
1.  Identificar la función de API/DB en `helpers/data.js`.
2.  Crear nueva función que acepte parámetro de filtro.
3.  Actualizar `Paciente.js` para usar la nueva función dentro del `useEffect`.

---

## Dependencias a Actualizar

| Paquete | Versión Actual | Última Versión (Est.) | Notas |
|---------|----------------|-----------------------|-------|
| `react-native` | 0.76.9 | - | Versión reciente, bien. |
| `expo` | 52.0.0 | - | Versión reciente, bien. |
| `firebase` | ^9.23.0 | v10+ | Considerar migrar a v10 modular si no se usa ya. |
| `react-native-elements` | ^3.4.3 | v4+ | Versión 3 es antigua. |

---

## Plan de Acción Sugerido

### Fase 1: Seguridad y Estabilidad (Inmediato)
- [ ] **[CRÍTICO]** Implementar HTTPS y deshabilitar texto plano en Android.
- [ ] **[CRÍTICO]** Refactorizar login para no comparar passwords en cliente.
- [ ] Configurar un pipeline básico de CI (GitHub Actions) que corra linter.

### Fase 2: Performance y Calidad (2 semanas)
- [ ] Optimizar búsqueda de pacientes (eliminar `getAllByKey`).
- [ ] Configurar Jest y escribir primer test para `auth/thunks.js`.
- [ ] Extraer strings hardcodeados a un archivo de configuración.

### Fase 3: Deuda Técnica (1 mes)
- [ ] Refactorizar `CreatePdfService` para usar un motor de templates o componentes.
- [ ] Aumentar cobertura de tests a componentes críticos (`Paciente.js`, `SignIn.js`).
