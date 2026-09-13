/**
 * Contenido del sitio público (marketing).
 *
 * Todo el copy, los módulos y los planes viven aquí para poder ajustarlos
 * sin tocar los componentes. Los precios son una propuesta inicial: cámbialos
 * en `PLANES` y se propagan a la página de precios y al comparativo.
 */
import {
  Award,
  Banknote,
  BarChart3,
  Briefcase,
  CalendarDays,
  Database,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LineChart,
  Percent,
  Plug,
  Rocket,
  ScrollText,
  Server,
  Settings2,
  ShieldCheck,
  Sparkles,
  Target,
  Upload,
  UserRound,
  Users,
  Webhook,
  Workflow,
} from 'lucide-react';

/**
 * Identidad del producto.
 *
 * «Planitica» es planilla + tica: dice qué hace y de dónde es. Es el único
 * lugar donde vive el nombre; el navbar, el pie, el logotipo y el sitio
 * público lo leen de aquí.
 */
export const PRODUCTO = {
  nombre: 'Planitica',
  claim: 'La planilla tica, sin hojas de cálculo',
  /** El claim partido en dos para poder resaltar la segunda mitad en el hero. */
  claimInicio: 'La planilla tica,',
  claimResaltado: 'sin hojas de cálculo',
  descripcion:
    'Expediente digital, planilla, ausencias, préstamos y desempeño en un solo sistema, hecho para la legislación y la forma de trabajar de Costa Rica.',
  /** Dominio propio del producto — base de las URLs canónicas y Open Graph (ver `Seo.jsx`). */
  dominio: 'https://planitica.savegresoft.com',
};

/**
 * Casa matriz. Se muestra en el pie del sitio público y en los datos
 * estructurados (JSON-LD) que leen los buscadores — un único lugar para no
 * tener que repetir el nombre y la URL en cada página.
 */
export const CASA_MATRIZ = {
  nombre: 'Savegre Soft',
  url: 'https://savegresoft.com',
};

/** Datos de contacto que se muestran en el footer y en la página de contacto. */
export const CONTACTO = {
  email: 'soporte@grupomecsa.net',
  telefono: '+506 0000-0000',
  ubicacion: 'San José, Costa Rica',
  horario: 'Lunes a viernes, 8:00 a.m. – 5:00 p.m.',
};

/** Navegación principal del sitio público. */
export const NAV_PUBLICA = [
  { to: '/caracteristicas', label: 'Características' },
  { to: '/como-funciona', label: 'Cómo funciona' },
  { to: '/precios', label: 'Precios' },
  { to: '/contacto', label: 'Contacto' },
];

/** Cifras verificables del propio sistema (nada inventado sobre clientes). */
export const CIFRAS = [
  { valor: '30+', label: 'módulos conectados entre sí' },
  { valor: '28', label: 'herramientas disponibles para asistentes de IA' },
  { valor: '11', label: 'eventos que avisan a tus otros sistemas' },
  { valor: '100%', label: 'en la nube o en tus propios servidores' },
];

/**
 * Módulos del sistema. `destacado: true` marca los que se muestran en el home.
 */
export const MODULOS = [
  {
    icon: Users,
    grupo: 'personal',
    titulo: 'Expediente digital',
    descripcion:
      'La ficha completa de cada colaborador: datos personales, contactos de emergencia, departamento, jefatura e historial salarial.',
    destacado: true,
    detalles: [
      'Historial de salarios con fecha de vigencia',
      'Contactos de emergencia y datos médicos',
      'Departamentos y jefaturas asignadas',
      'Búsqueda global desde cualquier pantalla',
    ],
  },
  {
    icon: FileText,
    grupo: 'planilla',
    titulo: 'Planilla automatizada',
    descripcion:
      'Genera la planilla del periodo tomando lo que ya registraste durante el mes y emite el comprobante de pago en PDF.',
    destacado: true,
    detalles: [
      'Periodos semanal, quincenal y mensual',
      'Horas extra (1.5x), feriados (2x) y extras en feriado (2.5x)',
      'Deducciones de CCSS, INS, pensión y embargos',
      'Comprobante de pago descargable por colaborador',
    ],
  },
  {
    icon: Briefcase,
    grupo: 'personal',
    titulo: 'Acciones de personal',
    descripcion:
      'Ingresos, ascensos, traslados, aumentos y salidas quedan registrados con su tipo de acción, fecha y responsable.',
    destacado: true,
    detalles: [
      'Tipos de acción configurables',
      'Trazabilidad de quién creó y editó cada movimiento',
      'Vinculadas al expediente del colaborador',
    ],
  },
  {
    icon: CalendarDays,
    grupo: 'personal',
    titulo: 'Ausencias y vacaciones',
    descripcion:
      'Control de días disponibles, solicitudes, incapacidades y ausencias justificadas, con impacto directo en la planilla.',
    destacado: true,
    detalles: [
      'Saldo de vacaciones por colaborador',
      'Registro de incapacidades CCSS e INS',
      'Las ausencias rebajan automáticamente en el periodo',
    ],
  },
  {
    icon: Banknote,
    grupo: 'planilla',
    titulo: 'Préstamos y deducciones',
    descripcion:
      'Préstamos con su plan de pagos, embargos judiciales y rebajos que se aplican solos en cada planilla.',
    destacado: true,
    detalles: [
      'Plan de pagos con saldo pendiente al día',
      'Embargos y pensiones alimentarias',
      'El colaborador consulta su saldo desde su portal',
    ],
  },
  {
    icon: Target,
    grupo: 'desempeno',
    titulo: 'KPIs y desempeño',
    descripcion:
      'Objetivos por categoría, cuestionarios de evaluación, resultados y gráficos para dar seguimiento a cada equipo.',
    destacado: true,
    detalles: [
      'Objetivos por categoría y por colaborador',
      'Cuestionarios de evaluación configurables',
      'Gráficos de resultados por periodo',
    ],
  },
  {
    icon: Percent,
    grupo: 'planilla',
    titulo: 'Comisiones',
    descripcion:
      'Registra y liquida comisiones por colaborador; se suman al bruto del periodo y quedan visibles en su portal.',
    detalles: [
      'Comisiones por colaborador y periodo',
      'Se integran al cálculo de la planilla',
    ],
  },
  {
    icon: GraduationCap,
    grupo: 'personal',
    titulo: 'Cursos y certificaciones',
    descripcion:
      'Capacitaciones, certificaciones y sus fechas de vencimiento, para que ninguna se venza sin que nadie se entere.',
    detalles: [
      'Cursos internos y externos',
      'Certificaciones con fecha de vencimiento',
      'Reconocimientos y premios del colaborador',
    ],
  },
  {
    icon: UserRound,
    grupo: 'portal',
    titulo: 'Portal del colaborador',
    descripcion:
      'Cada persona entra con su usuario y consulta su perfil, comprobantes, préstamos, comisiones y KPIs sin escribirle a RR.HH.',
    destacado: true,
    detalles: [
      'Comprobantes de pago históricos',
      'Saldo de préstamos y comisiones',
      'Sus objetivos y evaluaciones',
    ],
  },
  {
    icon: LayoutDashboard,
    grupo: 'desempeno',
    titulo: 'Dashboard de gestión',
    descripcion:
      'Un panel con la foto del mes: personal activo, movimientos, ausencias y planillas en proceso.',
    detalles: [
      'Indicadores del mes en curso',
      'Accesos directos a lo pendiente',
    ],
  },
  {
    icon: ShieldCheck,
    grupo: 'portal',
    titulo: 'Roles y seguridad',
    descripcion:
      'Autenticación con JWT y roles por módulo: cada quien ve únicamente lo que le corresponde.',
    detalles: [
      'Roles de administrador, jefatura, RR.HH. y colaborador',
      'Sesión con expiración configurable',
      'Asignación de roles desde la propia configuración',
    ],
  },
  {
    icon: ScrollText,
    grupo: 'portal',
    titulo: 'Auditoría completa',
    descripcion:
      'Cada cambio queda registrado con quién lo hizo, cuándo y desde dónde. Se captura al guardar, así que no depende de que nadie se acuerde.',
    detalles: [
      'Antes y después de cada campo modificado',
      'Filtros por persona, módulo, acción y fecha',
      'Los datos sensibles nunca se copian al registro',
    ],
  },
  {
    icon: Award,
    grupo: 'personal',
    titulo: 'Recordatorios',
    descripcion:
      'Avisos de lo que vence: certificaciones, contratos y fechas clave del expediente.',
    detalles: ['Recordatorios por colaborador', 'Notificación por correo'],
  },

  /* --- Automatización e integraciones --- */

  {
    icon: Sparkles,
    grupo: 'automatizacion',
    destacado: true,
    titulo: 'Asistencia con IA',
    descripcion:
      'Resume un expediente, interpreta las cifras de ausentismo o revisa una planilla antes de aprobarla. Tú eliges el proveedor y el modelo.',
    detalles: [
      'Anthropic, OpenAI o Azure OpenAI',
      'Un modelo distinto por tarea, para no gastar de más',
      'Nada se aplica solo: siempre revisas antes',
    ],
  },
  {
    icon: Plug,
    grupo: 'automatizacion',
    destacado: true,
    titulo: 'Servidor MCP',
    descripcion:
      'Conecta Claude u otro asistente directamente al sistema. Pregúntale por una planilla o pídele que registre una solicitud, en lenguaje natural.',
    detalles: [
      '28 herramientas: 20 de consulta y 8 de registro',
      'Eliges cuáles quedan disponibles',
      'Lo que registra nace pendiente de aprobación humana',
    ],
  },
  {
    icon: Webhook,
    grupo: 'automatizacion',
    destacado: true,
    titulo: 'Webhooks salientes',
    descripcion:
      'Avisa a tus otros sistemas en el momento: contabilidad cuando se aprueba una planilla, control de acceso cuando alguien se da de baja.',
    detalles: [
      '11 eventos disponibles, con los campos que elijas',
      'Firma HMAC-SHA256 para que el receptor verifique el origen',
      'Reintentos y bitácora de cada envío',
    ],
  },
  {
    icon: BarChart3,
    grupo: 'automatizacion',
    titulo: 'Reportería y exportación',
    descripcion:
      'Ocho reportes listos —planilla, ausentismo, plantilla, vigencias— con totales y descarga directa a Excel.',
    detalles: [
      'Filtro en pantalla antes de exportar',
      'CSV que Excel abre sin romper los acentos',
      'Análisis del reporte con IA, si la tienes activa',
    ],
  },
];

/**
 * Áreas en las que se agrupan los módulos en la página de características.
 * El `id` se usa como ancla (#personal, #planilla, …).
 */
export const GRUPOS_MODULOS = [
  {
    id: 'personal',
    titulo: 'Gestión de personal',
    descripcion:
      'El expediente y todo lo que le ocurre a una persona mientras trabaja contigo.',
  },
  {
    id: 'planilla',
    titulo: 'Planilla y dinero',
    descripcion:
      'El cálculo del periodo con sus ingresos, deducciones y comprobantes.',
  },
  {
    id: 'desempeno',
    titulo: 'Desempeño y control',
    descripcion:
      'Objetivos, evaluaciones e indicadores para tomar decisiones con datos.',
  },
  {
    id: 'portal',
    titulo: 'Acceso y seguridad',
    descripcion:
      'Quién entra, qué ve y qué puede hacer cada persona dentro del sistema.',
  },
  {
    id: 'automatizacion',
    titulo: 'Automatización e integraciones',
    descripcion:
      'Lo que el sistema hace solo y lo que deja hacer desde fuera: asistentes de IA, avisos a otros sistemas y reportes.',
  },
];

/** Pasos del flujo de implementación. */
export const PASOS = [
  {
    icon: Settings2,
    titulo: 'Configura tu empresa',
    descripcion:
      'Definimos departamentos, jefaturas, tipos de acción y categorías de objetivos según cómo trabaja tu organización.',
    duracion: 'Día 1',
  },
  {
    icon: Upload,
    titulo: 'Carga a tus colaboradores',
    descripcion:
      'Importamos el expediente, el salario base y los datos de cada persona. Tú solo revisas y apruebas.',
    duracion: 'Días 2 y 3',
  },
  {
    icon: Workflow,
    titulo: 'Opera el día a día',
    descripcion:
      'Acciones de personal, ausencias, préstamos y comisiones se registran conforme ocurren, no al final del mes.',
    duracion: 'Todo el mes',
  },
  {
    icon: LineChart,
    titulo: 'Cierra y mide',
    descripcion:
      'La planilla se genera con todo lo registrado, se emiten los comprobantes y el dashboard muestra cómo cerró el periodo.',
    duracion: 'Cierre de periodo',
  },
];

/** Bloques técnicos de la página "Cómo funciona". */
export const ARQUITECTURA = [
  {
    icon: Rocket,
    titulo: 'Aplicación web',
    descripcion:
      'React 19 servido por Nginx. Funciona en cualquier navegador moderno, en computadora o celular, sin instalar nada.',
  },
  {
    icon: Server,
    titulo: 'API .NET 9',
    descripcion:
      'Toda la lógica de negocio vive en una API REST documentada con Swagger y protegida con JWT.',
  },
  {
    icon: Database,
    titulo: 'SQL Server 2022',
    descripcion:
      'Tus datos en una base relacional con respaldos. Puede estar en la nube o dentro de tu propia infraestructura.',
  },
  {
    icon: BarChart3,
    titulo: 'Despliegue con Docker',
    descripcion:
      'Todo el sistema se levanta con un solo comando, así que actualizar o migrar de servidor toma minutos.',
  },
  {
    icon: Webhook,
    titulo: 'Integraciones salientes',
    descripcion:
      'Webhooks firmados que avisan a contabilidad, al control de acceso o a tu chat cuando pasa algo aquí. Con reintentos y bitácora de cada envío.',
  },
  {
    icon: Plug,
    titulo: 'Servidor MCP',
    descripcion:
      'Un endpoint estándar para que Claude u otro asistente consulte el sistema y registre solicitudes, sin integraciones a la medida.',
  },
];

/**
 * Planes comerciales.
 * ⚠️ Precios de referencia — ajústalos antes de publicar.
 */
export const PLANES = [
  {
    id: 'esencial',
    nombre: 'Esencial',
    resumen: 'Para empresas que están ordenando su información por primera vez.',
    precioMensual: 1500,
    precioAnual: 1250,
    unidad: 'por colaborador / mes',
    minimo: 'Mínimo 10 colaboradores',
    cta: 'Comenzar',
    incluye: [
      'Expediente digital completo',
      'Ausencias y vacaciones',
      'Cursos y certificaciones',
      'Portal del colaborador',
      'Roles y permisos',
      'Soporte por correo',
    ],
  },
  {
    id: 'profesional',
    nombre: 'Profesional',
    resumen: 'El plan completo de RR.HH. y planilla para la operación mensual.',
    precioMensual: 2900,
    precioAnual: 2400,
    unidad: 'por colaborador / mes',
    minimo: 'Hasta 200 colaboradores',
    destacado: true,
    etiqueta: 'Más elegido',
    cta: 'Solicitar demo',
    incluye: [
      'Todo lo del plan Esencial',
      'Planilla semanal, quincenal y mensual',
      'Comprobantes de pago en PDF',
      'Préstamos, embargos y comisiones',
      'Acciones de personal',
      'Dashboard de gestión',
      'Reportería con exportación a Excel',
      'Registro de auditoría',
      'Soporte prioritario',
    ],
  },
  {
    id: 'corporativo',
    nombre: 'Corporativo',
    resumen: 'Para grupos empresariales con requisitos propios de TI.',
    precioTexto: 'A la medida',
    unidad: 'según alcance',
    minimo: 'Sin límite de colaboradores',
    cta: 'Hablar con ventas',
    incluye: [
      'Todo lo del plan Profesional',
      'KPIs, objetivos y evaluaciones de desempeño',
      'Asistencia con IA y servidor MCP',
      'Webhooks hacia tus otros sistemas',
      'Instalación en tus servidores (on-premise)',
      'Integraciones con tus sistemas',
      'Migración de datos asistida',
      'Acuerdo de nivel de servicio (SLA)',
    ],
  },
];

/** Comparativo de la página de precios. `true`/`false`/texto. */
export const COMPARATIVO = [
  {
    grupo: 'Personal',
    filas: [
      { label: 'Expediente digital', esencial: true, profesional: true, corporativo: true },
      { label: 'Acciones de personal', esencial: false, profesional: true, corporativo: true },
      { label: 'Ausencias y vacaciones', esencial: true, profesional: true, corporativo: true },
      { label: 'Cursos y certificaciones', esencial: true, profesional: true, corporativo: true },
    ],
  },
  {
    grupo: 'Planilla',
    filas: [
      { label: 'Cálculo de planilla', esencial: false, profesional: true, corporativo: true },
      { label: 'Comprobantes en PDF', esencial: false, profesional: true, corporativo: true },
      { label: 'Préstamos y embargos', esencial: false, profesional: true, corporativo: true },
      { label: 'Comisiones', esencial: false, profesional: true, corporativo: true },
    ],
  },
  {
    grupo: 'Desempeño',
    filas: [
      { label: 'KPIs y objetivos', esencial: false, profesional: false, corporativo: true },
      { label: 'Evaluaciones y cuestionarios', esencial: false, profesional: false, corporativo: true },
      { label: 'Dashboard de gestión', esencial: false, profesional: true, corporativo: true },
    ],
  },
  {
    grupo: 'Automatización',
    filas: [
      { label: 'Reportería y exportación', esencial: false, profesional: true, corporativo: true },
      { label: 'Registro de auditoría', esencial: false, profesional: true, corporativo: true },
      { label: 'Asistencia con IA', esencial: false, profesional: false, corporativo: true },
      { label: 'Servidor MCP para asistentes', esencial: false, profesional: false, corporativo: true },
      { label: 'Webhooks salientes', esencial: false, profesional: false, corporativo: true },
    ],
  },
  {
    grupo: 'Plataforma',
    filas: [
      { label: 'Portal del colaborador', esencial: true, profesional: true, corporativo: true },
      { label: 'Roles y permisos', esencial: true, profesional: true, corporativo: true },
      { label: 'Instalación on-premise', esencial: false, profesional: false, corporativo: true },
      { label: 'Soporte', esencial: 'Correo', profesional: 'Prioritario', corporativo: 'Dedicado + SLA' },
    ],
  },
];

/** Preguntas frecuentes. */
export const FAQS = [
  {
    pregunta: '¿El sistema calcula las deducciones de ley de Costa Rica?',
    respuesta:
      'Sí. La planilla contempla CCSS, INS, pensión y embargos judiciales, además de horas extra, feriados y ausencias. Los porcentajes son configurables, así que se ajustan si cambia la normativa.',
  },
  {
    pregunta: '¿Puedo instalarlo en mis propios servidores?',
    respuesta:
      'Sí. El sistema se despliega con Docker (aplicación web, API y SQL Server), por lo que puede vivir en la nube o dentro de tu infraestructura. La instalación on-premise está incluida en el plan Corporativo.',
  },
  {
    pregunta: '¿Qué pasa con la información que ya tengo en Excel?',
    respuesta:
      'La migramos. Durante la implementación cargamos el expediente, los salarios vigentes y los saldos de vacaciones y préstamos a partir de tus archivos actuales.',
  },
  {
    pregunta: '¿Cada colaborador necesita una cuenta?',
    respuesta:
      'Sí, y está incluida en el precio. Cada persona entra con su usuario a consultar sus comprobantes, préstamos, comisiones y objetivos, lo que reduce muchísimo las consultas a RR.HH.',
  },
  {
    pregunta: '¿Cuánto tarda la implementación?',
    respuesta:
      'Para una empresa de hasta 100 colaboradores, una semana es un plazo realista: configuración, carga de datos y una sesión de capacitación con el equipo de RR.HH.',
  },
  {
    pregunta: '¿Qué es eso de conectar el sistema con inteligencia artificial?',
    respuesta:
      'Dos cosas distintas. Una: el sistema puede pedirle a un modelo que resuma un expediente, interprete las cifras de ausentismo o revise una planilla antes de aprobarla; tú eliges el proveedor y qué modelo usa cada tarea. Otra: puedes conectar Claude directamente al sistema y preguntarle en lenguaje natural, con las herramientas que decidas habilitar. En ambos casos nada se aplica solo — lo que un asistente registra queda pendiente de que una persona lo apruebe.',
  },
  {
    pregunta: '¿Se puede integrar con los sistemas que ya usamos?',
    respuesta:
      'Sí, por dos vías. Los webhooks avisan a otro sistema en el momento en que pasa algo aquí —una planilla aprobada, alguien dado de baja— con el cuerpo y los campos que definas, firmados para que el receptor verifique el origen. Y toda la funcionalidad está en una API REST documentada, por si necesitas ir en la otra dirección.',
  },
  {
    pregunta: '¿Cómo sé quién cambió un dato?',
    respuesta:
      'Cada cambio guardado deja una entrada de auditoría con quién lo hizo, cuándo, desde qué dirección y el antes y el después de cada campo. Se captura al momento de guardar, así que cubre todo: la pantalla, la API y los asistentes conectados. El registro no se puede editar ni borrar, y los datos sensibles nunca se copian a él.',
  },
  {
    pregunta: '¿Hay contrato de permanencia?',
    respuesta:
      'No. El plan mensual se cancela cuando quieras y el plan anual otorga dos meses de descuento a cambio de pago adelantado.',
  },
];

/** Problemas que resuelve — sección "antes / después" del home. */
export const DOLORES = [
  {
    antes: 'La planilla vive en un Excel que solo una persona entiende.',
    despues:
      'El cálculo es del sistema: mismo criterio todos los meses y con historial.',
  },
  {
    antes: 'Nadie sabe cuántas vacaciones le quedan a cada quien.',
    despues: 'El saldo está al día y el colaborador lo consulta solo.',
  },
  {
    antes: 'Los préstamos y rebajos se apuntan aparte y se olvidan.',
    despues: 'Cada deducción se aplica sola en el periodo que corresponde.',
  },
  {
    antes: 'RR.HH. pasa el día reenviando comprobantes de pago.',
    despues: 'Cada persona descarga los suyos desde su portal, cuando quiera.',
  },
];
