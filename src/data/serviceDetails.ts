export const serviceDetails = {
  seguridad: [
    {
      name: "Security Command Center",
      description: "Centro de operaciones de seguridad (SOC) integrado que proporciona visibilidad completa de tu infraestructura.",
      benefits: [
        "Monitoreo 24/7 de amenazas y vulnerabilidades en tiempo real",
        "Detección automática de anomalías con machine learning",
        "Panel unificado para gestión centralizada de seguridad",
        "Cumplimiento automatizado con estándares internacionales (ISO 27001, SOC 2, PCI DSS)"
      ]
    },
    {
      name: "Next Generation Firewall (NGFW)",
      description: "Firewall de última generación con inspección profunda de paquetes y prevención de intrusiones.",
      benefits: [
        "Protección contra amenazas avanzadas y ataques zero-day",
        "Filtrado de aplicaciones y control granular de tráfico",
        "Inspección SSL/TLS sin degradación de rendimiento",
        "Integración con threat intelligence global para prevención proactiva"
      ]
    },
    {
      name: "Security Assessment & Implementation",
      description: "Evaluación exhaustiva y mejora continua de tu postura de seguridad empresarial.",
      benefits: [
        "Auditorías de seguridad con metodologías reconocidas internacionalmente",
        "Pentesting y análisis de vulnerabilidades en profundidad",
        "Plan de remediación priorizado basado en riesgos críticos",
        "Implementación de mejores prácticas de seguridad en toda la organización"
      ]
    }
  ],
  infraestructura: [
    {
      name: "Cloud Migration",
      description: "Migración estratégica y segura de cargas de trabajo a la nube con mínima interrupción del negocio.",
      benefits: [
        "Evaluación completa de readiness y planificación detallada de migración",
        "Migración sin tiempo de inactividad con estrategias probadas",
        "Optimización de costos desde el primer día con right-sizing",
        "Soporte post-migración y optimización continua de rendimiento"
      ]
    },
    {
      name: "Landing Zone",
      description: "Fundación cloud escalable, segura y conforme a mejores prácticas empresariales.",
      benefits: [
        "Arquitectura multi-cuenta con segregación de ambientes y cargas de trabajo",
        "Políticas de seguridad y gobernanza implementadas desde el inicio",
        "Automatización completa de infraestructura con IaC (Terraform/CloudFormation)",
        "Estructura organizacional preparada para escalar con el crecimiento del negocio"
      ]
    },
    {
      name: "Disaster Recovery Plan",
      description: "Estrategia integral de continuidad de negocio y recuperación ante desastres.",
      benefits: [
        "RPO y RTO optimizados según criticidad de aplicaciones",
        "Respaldos automatizados y pruebas regulares de recuperación",
        "Failover automático para aplicaciones críticas sin intervención manual",
        "Documentación detallada y runbooks para diferentes escenarios de desastre"
      ]
    },
    {
      name: "Lift & Shift VMware Engine",
      description: "Migración rápida de ambientes VMware a la nube sin necesidad de refactorización.",
      benefits: [
        "Migración de VMs existentes sin cambios de arquitectura",
        "Compatibilidad 100% con herramientas VMware actuales",
        "Reducción de costos de infraestructura on-premise",
        "Escalabilidad elástica y pago por uso de recursos cloud"
      ]
    },
    {
      name: "Backup & Disaster Recovery",
      description: "Soluciones empresariales de respaldo y recuperación con garantías de disponibilidad.",
      benefits: [
        "Respaldos incrementales y compresión inteligente para optimizar almacenamiento",
        "Recuperación granular a nivel de archivo, aplicación o sistema completo",
        "Encriptación end-to-end para protección de datos sensibles",
        "Pruebas automatizadas de recuperación con reportes de compliance"
      ]
    },
    {
      name: "Veeam Integration",
      description: "Implementación de Veeam Backup & Replication para protección de datos enterprise-grade.",
      benefits: [
        "Respaldos rápidos con tecnología de changed block tracking",
        "Recuperación instantánea de VMs con Instant VM Recovery",
        "Replicación para alta disponibilidad y failover automático",
        "Integración nativa con principales proveedores cloud y storage"
      ]
    }
  ],
  analytics: [
    {
      name: "Looker Business Intelligence",
      description: "Plataforma de BI moderna para democratizar datos y generar insights accionables en toda la organización.",
      benefits: [
        "Modelado semántico de datos para definiciones consistentes en toda la empresa",
        "Exploración self-service sin conocimientos técnicos de SQL",
        "Dashboards interactivos en tiempo real con datos siempre actualizados",
        "Integración nativa con Google Cloud y fuentes de datos diversas"
      ]
    },
    {
      name: "Google MLOps",
      description: "Pipeline completo de machine learning desde desarrollo hasta producción a escala.",
      benefits: [
        "Vertex AI para entrenamiento distribuido y deployment automatizado de modelos",
        "Versionado y reproducibilidad de experimentos y modelos",
        "Monitoreo continuo de model drift y performance degradation",
        "AutoML para democratizar ML sin expertise profundo en data science"
      ]
    },
    {
      name: "Cloud Spanner",
      description: "Base de datos relacional distribuida globalmente con consistencia fuerte y disponibilidad del 99.999%.",
      benefits: [
        "Escalamiento horizontal automático sin límites de capacidad",
        "Transacciones ACID globales con latencias de milisegundos",
        "Alta disponibilidad con replicación multi-regional automática",
        "Cero downtime para cambios de esquema y mantenimiento"
      ]
    },
    {
      name: "Google Data Lakehouse",
      description: "Arquitectura moderna que combina lo mejor de data lakes y data warehouses.",
      benefits: [
        "Almacenamiento económico de datos estructurados y no estructurados en BigQuery",
        "Consultas SQL sobre petabytes de datos con performance sub-segundo",
        "Gobierno de datos con políticas centralizadas y lineage automático",
        "Integración perfecta con herramientas de ML y BI del ecosistema Google"
      ]
    },
    {
      name: "Customer Data Platform (CDP)",
      description: "Plataforma unificada para capturar, integrar y activar datos de clientes en todos los puntos de contacto.",
      benefits: [
        "Vista 360° del cliente con unificación de identidades cross-device",
        "Segmentación avanzada en tiempo real basada en comportamiento",
        "Activación inmediata en canales de marketing y publicidad",
        "Cumplimiento de privacidad (GDPR, CCPA) con consent management integrado"
      ]
    },
    {
      name: "Enterprise Data Warehouse",
      description: "Data warehouse empresarial optimizado para analytics de alto rendimiento y escalabilidad ilimitada.",
      benefits: [
        "Ingestión de datos desde múltiples fuentes con ETL/ELT automatizado",
        "Performance optimizado con particionamiento y clustering inteligente",
        "Escalamiento elástico que se ajusta automáticamente a la demanda",
        "Costos predecibles con análisis de uso y recomendaciones de optimización"
      ]
    }
  ],
  redes: [
    {
      name: "Conectividad Multi-Cloud",
      description: "Arquitectura de red híbrida para conectar seamlessly múltiples proveedores cloud y data centers.",
      benefits: [
        "Interconexión de alta velocidad entre AWS, Azure, GCP y on-premise",
        "Routing optimizado para minimizar latencia y costos de egress",
        "Redundancia multi-path para alta disponibilidad de conectividad",
        "Gestión centralizada de políticas de red y seguridad cross-cloud"
      ]
    },
    {
      name: "Partner Interconnect",
      description: "Conectividad dedicada a Google Cloud a través de proveedores de telecomunicaciones certificados.",
      benefits: [
        "Ancho de banda dedicado desde 50 Mbps hasta 10 Gbps",
        "Latencia consistente y predecible para aplicaciones críticas",
        "SLAs de uptime del 99.9% o superior garantizados",
        "Opción de circuitos redundantes para eliminación de punto único de falla"
      ]
    },
    {
      name: "VPN (Virtual Private Network)",
      description: "Túneles seguros y encriptados para conectividad remota y site-to-site.",
      benefits: [
        "Cloud VPN con IPsec para conexiones seguras on-premise a cloud",
        "HA VPN con 99.99% SLA y failover automático",
        "Encriptación AES-256 para protección de datos en tránsito",
        "Throughput hasta 3 Gbps por túnel VPN"
      ]
    },
    {
      name: "VPC (Virtual Private Cloud)",
      description: "Redes privadas virtuales aisladas con control completo sobre topología y seguridad.",
      benefits: [
        "Segmentación de red con subnets públicas y privadas",
        "Control granular con Security Groups y Network ACLs",
        "Peering entre VPCs para comunicación privada sin internet",
        "Flow logs para auditoría y troubleshooting de tráfico de red"
      ]
    }
  ],
  modernizacion: [
    {
      name: "API Factory",
      description: "Framework acelerado para diseño, desarrollo y gestión de APIs empresariales con estándares de industria.",
      benefits: [
        "Generación automática de código boilerplate y scaffolding",
        "Templates pre-configurados con mejores prácticas (RESTful, GraphQL)",
        "CI/CD integrado para despliegues automatizados de APIs",
        "Documentación automática con OpenAPI/Swagger integrado"
      ]
    },
    {
      name: "DevSecOps",
      description: "Integración de seguridad en todo el ciclo de vida de desarrollo con automatización completa.",
      benefits: [
        "Escaneo automático de vulnerabilidades en código, dependencias y contenedores",
        "Análisis SAST/DAST integrado en pipelines CI/CD",
        "Policy-as-Code para cumplimiento automatizado de estándares de seguridad",
        "Remediación temprana de vulnerabilidades con shift-left security"
      ]
    },
    {
      name: "Apigee + Anthos",
      description: "Plataforma híbrida para gestión de APIs y orquestación de microservicios cross-cloud.",
      benefits: [
        "API Gateway empresarial con rate limiting, caching y transformaciones",
        "Gestión de tráfico con políticas de throttling y quotas por cliente",
        "Service mesh con Istio para observabilidad y seguridad de microservicios",
        "Despliegue consistente de aplicaciones en on-premise, cloud y edge"
      ]
    },
    {
      name: "Microservices Factory",
      description: "Aceleradores y frameworks para adopción de arquitectura de microservicios a escala empresarial.",
      benefits: [
        "Patrones de diseño probados (Circuit Breaker, Service Discovery, Config Management)",
        "Containerización con Docker y orquestación con Kubernetes",
        "Comunicación asíncrona con message brokers (Pub/Sub, Kafka)",
        "Distributed tracing y logging centralizado para observabilidad completa"
      ]
    },
    {
      name: "API Management con Apigee",
      description: "Plataforma líder en gestión del ciclo de vida completo de APIs con analytics avanzado.",
      benefits: [
        "Portal de desarrolladores para onboarding rápido de partners y terceros",
        "Monetización de APIs con planes de suscripción y billing integrado",
        "Analytics en tiempo real de uso, performance y health de APIs",
        "Seguridad robusta con OAuth 2.0, JWT, API keys y mutual TLS"
      ]
    }
  ],
  observabilidad: [
    {
      name: "Datadog Monitoring",
      description: "Plataforma unificada de monitoreo y observabilidad para infraestructura, aplicaciones y logs.",
      benefits: [
        "Dashboards personalizables con métricas en tiempo real de toda la stack",
        "APM (Application Performance Monitoring) con distributed tracing",
        "Alertas inteligentes con anomaly detection y machine learning",
        "Integraciones con 500+ tecnologías y servicios del ecosistema tech"
      ]
    },
    {
      name: "Cloud Monitoring",
      description: "Monitoreo nativo de Google Cloud con métricas, logs y traces integrados.",
      benefits: [
        "Sin instalación de agentes para servicios managed de Google Cloud",
        "Dashboards pre-configurados para servicios comunes (GCE, GKE, Cloud SQL)",
        "Uptime checks para monitoreo de disponibilidad de aplicaciones",
        "Integración profunda con Cloud Logging y Cloud Trace para troubleshooting"
      ]
    },
    {
      name: "Cloud Cost Management",
      description: "Visibilidad completa y optimización continua de gastos en la nube.",
      benefits: [
        "Desglose granular de costos por proyecto, servicio, equipo y etiquetas",
        "Presupuestos y alertas automatizadas para prevenir sobrecostos",
        "Recomendaciones accionables de optimización con ROI estimado",
        "Committed Use Discounts y Sustained Use Discounts para ahorros automáticos"
      ]
    }
  ],
  soporte: [
    {
      name: "Soporte Técnico 24/7",
      description: "Equipo dedicado de expertos disponible en todo momento para asegurar la continuidad de tu negocio.",
      benefits: [
        "Respuesta inmediata en incidentes críticos con tiempos de SLA garantizados",
        "Escalamiento multi-nivel con ingenieros especializados por tecnología",
        "Portal de tickets con seguimiento en tiempo real y transparencia completa",
        "Soporte proactivo con health checks regulares y optimización continua",
        "Technical Account Manager dedicado para cuentas enterprise"
      ]
    }
  ],
  workspace: [
    {
      name: "Google Workspace Enterprise",
      description: "Suite colaborativa completa con Gmail, Drive, Meet y herramientas de productividad cloud-native.",
      benefits: [
        "Gmail empresarial con tu dominio personalizado y almacenamiento ilimitado",
        "Google Drive con almacenamiento compartido y colaboración en tiempo real",
        "Google Meet para videoconferencias HD con hasta 500 participantes",
        "Seguridad avanzada con DLP, 2FA, y gestión de dispositivos móviles",
        "Administración centralizada con consola de admin y APIs de gestión"
      ]
    }
  ],
  automatizacion: [
    {
      name: "N8N Workflow Automation",
      description: "Plataforma de automatización de workflows con integración de 350+ servicios y APIs.",
      benefits: [
        "Editor visual drag-and-drop para crear workflows sin código",
        "Conectores nativos para servicios populares (Slack, Gmail, Salesforce, etc.)",
        "Ejecuciones programadas y triggers basados en eventos externos",
        "Self-hosted para control total sobre datos y lógica de negocio",
        "Extensible con JavaScript para lógica personalizada cuando sea necesario"
      ]
    }
  ]
};
