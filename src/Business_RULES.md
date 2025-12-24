# Reglas de Negocio - Sistema de Historias Clínicas Digitales (HCD)

## 1. Introducción y Propósito

Este documento define todas las reglas de negocio del sistema de Historias Clínicas Digitales (HCD) para facilitar la validación del sistema y la creación de tests End-to-End (E2E). El sistema permite a los médicos crear, gestionar y sincronizar historias clínicas de emergencias médicas.

## 2. Flujo Principal del Sistema

### 2.1 Secuencia de Pantallas
```
HomeHCD → MotivoDelLlamado → TipoHistoria → Paciente → DatosIniciales → Opcionales → DatosAcompañante → Diagnostico → Desenlace → Finalizacion
```

### 2.2 Puntos de Salida
- **Cancelación**: En cualquier momento desde HomeHCD
- **Paciente Ausente**: Desde pantalla Paciente
- **Previsualización**: Desde pantalla Finalizacion

## 3. Reglas de Autenticación y Configuración

### 3.1 Autenticación
- **REQ-AUTH-001**: El usuario debe autenticarse con matrícula y contraseña
- **REQ-AUTH-002**: La matrícula es obligatoria y debe ser numérica
- **REQ-AUTH-003**: La contraseña es obligatoria
- **REQ-AUTH-004**: Si el usuario no está registrado, se redirige a SignUp
- **REQ-AUTH-005**: Después del login exitoso, el usuario debe registrar su firma digital

### 3.2 Configuración Inicial
- **REQ-CONF-001**: Antes de crear una HCD, se debe configurar:
  - Móvil (obligatorio)
  - Chofer (obligatorio para móviles 1-8, 12+)
  - Enfermero (obligatorio para móviles 1-2)
- **REQ-CONF-002**: Los móviles 1 y 2 DEBEN tener un enfermero asignado
- **REQ-CONF-003**: Los móviles 9, 10, 11 NO requieren chofer
- **REQ-CONF-004**: Si no hay configuración, se muestra alerta "Falta completar configuración"

## 4. Reglas por Pantalla del Flujo

### 4.1 HomeHCD
- **REQ-HOME-001**: Mostrar nombre del médico logueado
- **REQ-HOME-002**: Botón "AGREGAR" solo habilitado si hay configuración completa
- **REQ-HOME-003**: Mostrar lista de historias clínicas pendientes de sincronización
- **REQ-HOME-004**: Botón "SINCRONIZAR" solo visible si hay historias pendientes
- **REQ-HOME-005**: Mostrar estado de error si hay problemas de sincronización

### 4.2 MotivoDelLlamado
- **REQ-MOTIVO-001**: Motivo del llamado es obligatorio
- **REQ-MOTIVO-002**: Color del llamado es obligatorio
- **REQ-MOTIVO-003**: Ambos campos permiten agregar elementos personalizados
- **REQ-MOTIVO-004**: Si algún campo está vacío, mostrar alerta "Por favor corrija los campos no válidos"

### 4.3 TipoHistoria
- **REQ-TIPO-001**: Tipo de historia (ubicación de atención) es obligatorio
- **REQ-TIPO-002**: Opciones disponibles: "DOMICILIO", "AREA PROTEGIDA", "VIA PUBLICA"
- **REQ-TIPO-003**: Si no se selecciona tipo, mostrar alerta de campo inválido

### 4.4 Paciente
- **REQ-PAC-001**: Campos obligatorios según tipo de historia:
  - **DOMICILIO**: DNI, Cobertura, Apellido, Nombre, Localidad, Calle, Nro
  - **AREA PROTEGIDA**: Cobertura, Apellido, Nombre
  - **VIA PUBLICA**: Localidad, Calle, Intersección, Nro

- **REQ-PAC-002**: Auto-completado de datos del paciente al ingresar DNI (≥7 dígitos)
- **REQ-PAC-003**: Botón "PACIENTE AUSENTE" termina la historia inmediatamente
- **REQ-PAC-004**: Validación de campos obligatorios antes de continuar

### 4.5 DatosIniciales
- **REQ-DATOS-001**: Tiempo de evolución es obligatorio (días, horas o minutos)
- **REQ-DATOS-002**: Al menos uno de los campos de tiempo debe estar completo
- **REQ-DATOS-003**: Signos vitales obligatorios:
  - TAS (Tensión Arterial Sistólica)
  - TAD (Tensión Arterial Diastólica)
  - Temperatura
  - FR. RES (Frecuencia Respiratoria)
  - FC (Frecuencia Cardíaca)
- **REQ-DATOS-004**: Signos vitales opcionales:
  - LL. CAP (Llenado Capilar)
  - Glucemia
  - Sat. Oxígeno
- **REQ-DATOS-005**: Hora se auto-completa con hora actual
- **REQ-DATOS-006**: Antecedentes se pueden seleccionar múltiples opciones
- **REQ-DATOS-007**: Campos adicionales de antecedentes:
  - Otros (opcional)
  - Medicación habitual (opcional)
  - Alergia medicamentosa (opcional)

### 4.6 Opcionales
- **REQ-OPC-001**: Campos opcionales se vuelven obligatorios según diagnóstico
- **REQ-OPC-002**: Validación: todos los campos obligatorios deben estar completos
- **REQ-OPC-003**: Si faltan campos obligatorios, mostrar alerta y redirigir a completar
- **REQ-OPC-004**: Campos disponibles:
  - Score de Glasgow
  - Piel y Mucosa / Edemas
  - Examen Neurológico
  - AP. Respiratorio
  - Cabeza y Cuello
  - Aparato Cardiovascular
  - Informe ECG
  - Sist. Oseoart. y Muscular
  - Abdomen
  - Urogenital
  - Ginecobstétrico
  - Psiquiátrico
  - Trauma

### 4.7 DatosAcompañante
- **REQ-ACOM-001**: Firma del paciente/acompañante es obligatoria
- **REQ-ACOM-002**: Aclaración del paciente/acompañante (opcional)
- **REQ-ACOM-003**: DNI del paciente/acompañante (opcional)
- **REQ-ACOM-004**: Si no hay firma, mostrar alerta específica

### 4.8 Diagnostico
- **REQ-DIAG-001**: Diagnóstico es obligatorio
- **REQ-DIAG-002**: Epicrisis es obligatorio
- **REQ-DIAG-003**: Procedimiento es opcional
- **REQ-DIAG-004**: Medicamentos permiten selección múltiple
- **REQ-DIAG-005**: Para cada medicamento se puede especificar cantidad
- **REQ-DIAG-006**: Validar que todos los campos opcionales obligatorios estén completos
- **REQ-DIAG-007**: Si faltan campos opcionales obligatorios, mostrar alerta y redirigir

### 4.9 Desenlace
- **REQ-DES-001**: Desenlace es obligatorio (selección múltiple)
- **REQ-DES-002**: Evolución es obligatorio (selección múltiple)
- **REQ-DES-003**: "Al llegar al domicilio había" es obligatorio (selección múltiple)
- **REQ-DES-004**: Si desenlace incluye internación, mostrar sección de datos de internación:
  - Instituto (obligatorio)
  - Firma del médico derivante (obligatorio)
  - Nombre del médico derivante (obligatorio)
  - Matrícula del médico derivante (obligatorio)
- **REQ-DES-005**: Desenlaces que requieren internación:
  - "Inter. sala gral."
  - "Guarda med."
  - "Queda sala gaurd."
  - "UTI"

### 4.10 Finalizacion
- **REQ-FIN-001**: "¿Abona copago?" es obligatorio
- **REQ-FIN-002**: Opciones disponibles: Sí/No
- **REQ-FIN-003**: Botones disponibles:
  - FINALIZAR (guarda y termina)
  - IMPRIMIR (genera PDF)
  - PREVISUALIZAR (muestra vista previa)
  - ENVIAR HISTORIA CLÍNICA POR MAIL (envía por email)

## 5. Reglas de Campos Opcionales Condicionales

### 5.1 Criterio de Obligatoriedad
Los campos opcionales se vuelven obligatorios cuando el diagnóstico contiene códigos CIE-10 específicos.

### 5.2 Mapeo de Códigos por Campo

#### Piel y Mucosa / Edemas
**Códigos CIE-10**: A46, B00, B01, B02, B05, B06, B07, B09, B37, B49, L00, L01, L02, L03, L23, L29, L30, L50, L55, L60, L89, L97, R20, R22, R23, R60, T78

#### Examen Neurológico
**Códigos CIE-10**: G20, G25, G30, G36, G40, G43, G44.2, G50, G51, H55, I64, I66, R40, R41, R42, R44, R47, R56

#### AP. Respiratorio
**Códigos CIE-10**: I26, J00, J01, J02, J03, J04, J11, J18, J20, J21, J30, J44, J45, J46, J68, J69, J81, J90, J93, J96, J98, W80

#### Cabeza y Cuello
**Códigos CIE-10**: B26, H10, H40, K08, K12, R04

#### Aparato Cardiovascular
**Códigos CIE-10**: I10, I20, I21, I44, I46, I47, I48, I49, I50, I67, I71, I95, R00

#### Informe ECG
**REQ-ECG-001**: Obligatorio si aparato cardiovascular NO contiene "Normal"

#### Sist. Oseoart. y Muscular
**Códigos CIE-10**: G81, G82, M00, M05, M10, M15, M25, M54, M77, M79, M51, M94.0

#### Abdomen
**Códigos CIE-10**: A09, R10, R11, R12, R13, R14, R17, R18, R63, R64, K20, K21, K27, K29, K30, K35, K46, K56, K57, K58, K59, K60, K72, K80, K81, K85, K92, I84, T18

#### Urogenital
**Códigos CIE-10**: N17, N18, N23, N30, N39, N41, N43, N44, N45, N49, R30, R31, R33, R34, T19

#### Ginecobstétrico
**Códigos CIE-10**: N61, N64, N73, N76, N92, N94, O06, O14, O15, O20, O21, O62, O80, O83

#### Psiquiátrico
**Códigos CIE-10**: F1, F10.3, F32, F40, F41, F50, F51, F39, R44, R45, Z91

#### Trauma
**Códigos CIE-10**: M66, S00, S05, S06, S09, S10, S13, S20, S22, S30, S32, S36, S37, S40, S42, S50, S52, S60, S62, S70, S72, S80, S82, S90, T00, T01, T02, T03, T04, T05, T07, T30, T67, T68, T71, T74, T75, W34, W54, W57, W74, Y28

## 6. Reglas de Persistencia y Sincronización

### 6.1 Guardado Local
- **REQ-PERS-001**: Cada historia se guarda inmediatamente en AsyncStorage
- **REQ-PERS-002**: Clave de almacenamiento: "Historias_sin_sincronizar"
- **REQ-PERS-003**: Generar ID único para cada historia (UUID v4)
- **REQ-PERS-004**: Incluir versión de la app en cada historia
- **REQ-PERS-005**: Timestamp de creación automático

### 6.2 Sincronización con Odoo
- **REQ-SYNC-001**: Intentar sincronización inmediata después de guardar
- **REQ-SYNC-002**: Si falla sincronización, mantener en almacenamiento local
- **REQ-SYNC-003**: Botón manual de sincronización en HomeHCD
- **REQ-SYNC-004**: Mostrar historias no sincronizadas en lista
- **REQ-SYNC-005**: Guardar historias sincronizadas con timestamp
- **REQ-SYNC-006**: Manejo de errores de conexión

### 6.3 Gestión de Firmas
- **REQ-FIRMA-001**: Firmas se guardan como archivos base64
- **REQ-FIRMA-002**: Generar ID único para cada firma
- **REQ-FIRMA-003**: Sincronizar firmas perdidas en login
- **REQ-FIRMA-004**: Verificar firmas faltantes en Odoo

## 7. Casos Especiales y Excepciones

### 7.1 Paciente Ausente
- **REQ-AUS-001**: Botón disponible en pantalla Paciente
- **REQ-AUS-002**: Confirmar con alerta antes de terminar
- **REQ-AUS-003**: Marcar historia como "paciente_ausente: true"
- **REQ-AUS-004**: Finalizar historia inmediatamente sin más pantallas

### 7.2 Cancelación de Historia
- **REQ-CANC-001**: Disponible desde HomeHCD
- **REQ-CANC-002**: Requiere motivo de cancelación obligatorio
- **REQ-CANC-003**: Guardar motivo en campo "motivo_cancelacion"
- **REQ-CANC-004**: Finalizar historia con estado cancelado

### 7.3 Score de Glasgow
- **REQ-GLASGOW-001**: Modal para agregar mediciones
- **REQ-GLASGOW-002**: Campos: Hora, Ocular, Verbal, Motora
- **REQ-GLASGOW-003**: Calcular total automáticamente
- **REQ-GLASGOW-004**: Al menos un campo debe estar completo
- **REQ-GLASGOW-005**: Permitir múltiples mediciones
- **REQ-GLASGOW-006**: Mostrar imagen de referencia Glasgow

### 7.4 Trauma
- **REQ-TRAUMA-001**: Múltiples zonas corporales disponibles
- **REQ-TRAUMA-002**: Zonas: Abdomen, Cara, Cráneo, Cuello, Genitales, Miembros, Pelvis, Periné, Raquis, Tórax
- **REQ-TRAUMA-003**: Mecanismo de trauma (opcional)
- **REQ-TRAUMA-004**: Botón "Sin Trauma Aparente" disponible

### 7.5 Informe ECG
- **REQ-ECG-001**: Captura de imágenes ECG
- **REQ-ECG-002**: Múltiples imágenes permitidas
- **REQ-ECG-003**: Generar ID único para cada imagen
- **REQ-ECG-004**: Sincronización pendiente de revisión

## 8. Matriz de Validación para Tests E2E

### 8.1 Flujo Completo Exitoso
| Pantalla | Campo | Validación | Valor de Prueba |
|----------|-------|------------|-----------------|
| MotivoDelLlamado | Motivo | Obligatorio | "Dolor torácico" |
| MotivoDelLlamado | Color | Obligatorio | "Rojo" |
| TipoHistoria | Ubicación | Obligatorio | "DOMICILIO" |
| Paciente | DNI | Obligatorio (DOMICILIO) | "12345678" |
| Paciente | Cobertura | Obligatorio (DOMICILIO) | "OSDE" |
| Paciente | Apellido | Obligatorio (DOMICILIO) | "García" |
| Paciente | Nombre | Obligatorio (DOMICILIO) | "Juan" |
| Paciente | Localidad | Obligatorio (DOMICILIO) | "Buenos Aires" |
| Paciente | Calle | Obligatorio (DOMICILIO) | "Av. Corrientes" |
| Paciente | Nro | Obligatorio (DOMICILIO) | "1234" |
| DatosIniciales | Tiempo | Al menos uno | días: "2" |
| DatosIniciales | TAS | Obligatorio | "120" |
| DatosIniciales | TAD | Obligatorio | "80" |
| DatosIniciales | Temperatura | Obligatorio | "36.5" |
| DatosIniciales | FR. RES | Obligatorio | "16" |
| DatosIniciales | FC | Obligatorio | "72" |
| DatosAcompañante | Firma | Obligatorio | Captura de firma |
| Diagnostico | Diagnóstico | Obligatorio | "I21.9" (infarto) |
| Diagnostico | Epicrisis | Obligatorio | "Paciente con dolor torácico..." |
| Desenlace | Desenlace | Obligatorio | "Inter. sala gral." |
| Desenlace | Evolución | Obligatorio | "Estable" |
| Desenlace | Al llegar | Obligatorio | "Consciente" |
| Desenlace | Instituto | Obligatorio (si internación) | "Hospital Central" |
| Desenlace | Firma médico | Obligatorio (si internación) | Captura de firma |
| Desenlace | Nombre médico | Obligatorio (si internación) | "Dr. Pérez" |
| Desenlace | Matrícula | Obligatorio (si internación) | "12345" |
| Finalizacion | Abona copago | Obligatorio | "Sí" |

### 8.2 Validaciones de Error
| Pantalla | Campo | Error Esperado | Condición |
|----------|-------|----------------|-----------|
| MotivoDelLlamado | Motivo | "Por favor corrija los campos no válidos" | Campo vacío |
| TipoHistoria | Ubicación | "Por favor corrija los campos no válidos" | Campo vacío |
| Paciente | Campos obligatorios | "Por favor corrija los campos no válidos" | Según tipo de historia |
| DatosIniciales | Tiempo | "Debe completar algún campo de Tiempo de evolución" | Todos vacíos |
| DatosIniciales | Signos vitales | Validación de formulario | Campos obligatorios vacíos |
| Opcionales | Campos obligatorios | "Debe completar el examen por aparato correspondiente" | Según diagnóstico |
| DatosAcompañante | Firma | "Por favor complete la firma del paciente u acompañante" | Sin firma |
| Diagnostico | Diagnóstico | "Por favor corrija los campos no válidos" | Campo vacío |
| Diagnostico | Epicrisis | Validación de formulario | Campo vacío |
| Desenlace | Campos obligatorios | "Por favor corrija los campos no válidos" | Campos vacíos |
| Finalizacion | Abona copago | "Por favor corrija los campos no válidos" | Campo vacío |

### 8.3 Casos Especiales
| Caso | Pantalla | Acción | Resultado Esperado |
|------|----------|--------|-------------------|
| Paciente Ausente | Paciente | Botón "PACIENTE AUSENTE" | Historia finalizada con paciente_ausente: true |
| Cancelación | HomeHCD | Botón cancelar | Pantalla MotivoCancelacion |
| Sin Configuración | HomeHCD | Botón "AGREGAR" | Alerta "Falta completar configuración" |
| Móvil sin enfermero | Home | Guardar | Error "Los móviles 1 y 2 deben tener un enfermero" |
| Móvil sin chofer | Home | Guardar | Error "Este móvil debe tener un chofer asignado" |

### 8.4 Campos Opcionales Condicionales
| Diagnóstico | Código CIE-10 | Campos Obligatorios |
|-------------|---------------|-------------------|
| Infarto de miocardio | I21.9 | Aparato Cardiovascular, Informe ECG |
| Neumonía | J18.9 | AP. Respiratorio |
| Accidente cerebrovascular | I64 | Examen Neurológico |
| Trauma craneoencefálico | S06.9 | Examen Neurológico, Trauma |
| Quemadura | T30 | Piel y Mucosa / Edemas, Trauma |

## 9. Consideraciones Técnicas

### 9.1 Identificadores Únicos
- **ID Interno**: UUID v4 para cada historia
- **Key**: UUID v5 basado en DNS para identificación
- **Firmas**: ID único generado para cada archivo de firma

### 9.2 Versionado
- Incluir versión de la app en cada historia
- Manejo de compatibilidad entre versiones

### 9.3 Manejo de Errores
- Logging con Sentry para errores críticos
- Mensajes de error específicos para cada validación
- Recuperación de errores de sincronización

### 9.4 Rendimiento
- Carga asíncrona de datos de dropdowns
- Indicadores de carga durante operaciones
- Optimización de imágenes y firmas

---

**Nota**: Este documento debe actualizarse cada vez que se modifiquen las reglas de negocio del sistema. La versión actual corresponde al análisis del código fuente realizado en [fecha].
