# 🚛 OnTrack - Sistema de Gestión de Flotas

<div align="center">

![OnTrack](https://img.shields.io/badge/OnTrack-Sistema%20de%20Flotas-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=for-the-badge&logo=vite)
![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?style=for-the-badge&logo=redux)
![The Bridge](https://img.shields.io/badge/The%20Bridge-Desaf%C3%ADo%20Final-orange?style=for-the-badge)

**Organiza, Simplifica, Ahorra.**

*La plataforma inteligente para el seguimiento y optimización de gastos de combustible en flotas corporativas*

### 🎓 Proyecto Final - The Bridge | Desafío Final
**Frontend del proyecto colaborativo entre equipos de:**
`Marketing` • `Data Science` • `Ciberseguridad` • `Full-Stack`

</div>

---

## 📋 Tabla de Contenidos

- [🎯 Descripción del Proyecto](#-descripción-del-proyecto)
- [✨ Características Principales](#-características-principales)
- [🏗️ Arquitectura del Sistema](#️-arquitectura-del-sistema)
- [🛠️ Stack Tecnológico](#️-stack-tecnológico)
- [🚀 Instalación y Configuración](#-instalación-y-configuración)
- [📱 Funcionalidades](#-funcionalidades)
- [🎨 Estructura del Proyecto](#-estructura-del-proyecto)
- [📊 Dashboard del Manager](#-dashboard-del-manager)
- [🔐 Sistema de Autenticación](#-sistema-de-autenticación)
- [🤝 Colaboración Multidisciplinar](#-colaboración-multidisciplinar)
- [🎯 Scripts Disponibles](#-scripts-disponibles)
- [🌐 Variables de Entorno](#-variables-de-entorno)
- [📝 Licencia](#-licencia)

---

## 🎯 Descripción del Proyecto

**OnTrack** es una aplicación web moderna y completa diseñada para revolucionar la gestión de flotas corporativas. Desarrollada como proyecto final del **Desafío de The Bridge**, esta plataforma representa la culminación del trabajo colaborativo entre equipos especializados en Marketing, Data Science, Ciberseguridad y Full-Stack Development.

### 🌉 Contexto Académico - The Bridge
Este repositorio contiene la **parte frontend** del proyecto final, donde se integran:
- **🎨 Marketing**: Estrategia de usuario y diseño de experiencia
- **📊 Data Science**: Análisis de datos y algoritmos de optimización  
- **🔒 Ciberseguridad**: Implementación de medidas de seguridad robustas
- **💻 Full-Stack**: Desarrollo completo de la aplicación web

La plataforma permite a las empresas optimizar sus gastos de combustible, monitorear el rendimiento de conductores y obtener insights valiosos sobre el uso de su flota vehicular.

### 🎪 Demo en Vivo
El proyecto incluye una landing page completamente funcional con:
- **Página de inicio** con secciones hero, características, estadísticas y llamada a la acción
- **Sistema de autenticación** completo (login/registro)
- **Dashboard de gestión** con métricas en tiempo real

---

## ✨ Características Principales

### 🔍 **Escaneo OCR Inteligente**
- Digitalización automática de tickets de combustible
- Registro preciso de gastos usando tecnología OCR avanzada
- Reducción de errores manuales y tiempo de procesamiento

### 📊 **Análisis Inteligente**
- Insights detallados sobre patrones de consumo
- Identificación de rutas ineficientes
- Oportunidades de ahorro automatizadas
- Reportes personalizables

### 👥 **Gestión Completa de Flota**
- Dashboard administrativo en tiempo real
- Seguimiento de vehículos activos
- Monitoreo de conductores
- Gestión de alertas y mantenimiento

### 📈 **Métricas y KPIs**
- Control de gastos mensual
- Eficiencia de combustible
- Rendimiento por conductor
- Reducción de emisiones CO₂

---

## 🏗️ Arquitectura del Sistema

```
┌─────────────────────┐    ┌─────────────────────┐    ┌─────────────────────┐
│                     │    │                     │    │                     │
│   Landing Page      │    │  Authentication     │    │  Manager Dashboard  │
│                     │    │                     │    │                     │
│ • Hero Section      │────│ • Login Form        │────│ • Fleet Stats       │
│ • Features          │    │ • Register Form     │    │ • Real-time Table   │
│ • Statistics        │    │ • Token Management  │    │ • Charts & Analytics│
│ • CTA Section       │    │ • Session Control   │    │ • Driver Performance│
│                     │    │                     │    │ • Alerts System    │
└─────────────────────┘    └─────────────────────┘    └─────────────────────┘
```

---

## 🛠️ Stack Tecnológico

### Frontend
- **React 19.1.1** - Biblioteca principal para UI
- **Vite 7.1.7** - Build tool ultrarrápido
- **React Router DOM 7.9.2** - Enrutamiento SPA
- **Redux Toolkit 9.2.0** - Gestión de estado global

### UI y Diseño
- **SCSS/Sass 1.93.2** - Preprocesador CSS
- **Lucide React 0.544.0** - Biblioteca de iconos moderna
- **Recharts 3.2.1** - Gráficos y visualización de datos

### Desarrollo
- **ESLint 9.35.0** - Linter para calidad de código
- **Vite Plugin React 5.0.3** - Integración React + Vite

### HTTP y API
- **Axios** - Cliente HTTP con interceptores automáticos
- **Token Refresh automático** - Gestión transparente de sesiones

---

## 🚀 Instalación y Configuración

### Prerrequisitos
```bash
node >= 18.0.0
npm >= 9.0.0
```

### 1️⃣ Clonar el Repositorio
```bash
git clone <repository-url>
cd Desafio_front
```

### 2️⃣ Instalar Dependencias
```bash
npm install
```

### 3️⃣ Configurar Variables de Entorno
```bash
# Crear archivo .env en la raíz del proyecto
cp src/config/example.env.js .env

# Configurar URL del backend
VITE_API_URL=http://localhost:5000
```

### 4️⃣ Iniciar Servidor de Desarrollo
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

---

## 📱 Funcionalidades

### 🏠 **Landing Page**
- **Hero Section**: Presentación impactante con llamadas a la acción
- **Features Section**: Descripción de funcionalidades principales
- **Stats Section**: Estadísticas e impacto de la plataforma
- **CTA Section**: Invitación final a registrarse
- **Footer**: Información de contacto y enlaces

### 🔐 **Autenticación**
- **Registro de usuarios** con validación en tiempo real
- **Login seguro** con gestión de tokens JWT
- **Refresh token automático** para sesiones persistentes
- **Logout seguro** con limpieza de sesión

### 📊 **Dashboard de Manager**
#### KPIs Principales
- 🚛 **Vehículos Activos**: 47 vehículos monitoreados
- 👥 **Conductores**: 42 conductores activos (89%)
- 💰 **Gasto Mensual**: €14,847 (-8% vs mes anterior)
- 🧭 **Viajes Activos**: 12 viajes en tiempo real

#### Tablas y Listas
- **Estado de Flota**: Ubicación, combustible, velocidad en tiempo real
- **Top Conductores**: Ranking por eficiencia y ahorros
- **Alertas Recientes**: Sistema de notificaciones prioritarias

#### Gráficos Analíticos
- **Gastos Mensuales**: Tendencias de combustible y mantenimiento
- **Eficiencia Semanal**: Patrones de rendimiento por día
- **KPIs de Resumen**: Métricas consolidadas del período

---

## 🎨 Estructura del Proyecto

```
src/
├── app/                    # Configuración Redux
│   └── store.js
├── assets/                 # Recursos estáticos
│   └── img/               # Imágenes y SVGs
├── components/            # Componentes reutilizables
│   ├── common/           # Componentes comunes
│   ├── dashboard/        # Componentes del dashboard
│   ├── login/           # Formularios de autenticación
│   ├── register/
│   └── ui/              # Componentes UI base
├── config/               # Configuración
├── data/                # Data mock para desarrollo
├── features/            # Slices de Redux
│   └── auth/
├── lib/                 # Utilidades y configuraciones
│   ├── api.js          # Cliente HTTP con interceptores
│   └── token.js        # Gestión de tokens
├── pages/              # Páginas principales
├── sections/           # Secciones de la landing
├── services/           # Servicios de negocio
├── styles/             # Estilos SCSS
│   ├── components/     # Estilos por componente
│   └── sections/       # Estilos por sección
└── utils/              # Utilidades generales
```

---

## 📊 Dashboard del Manager

El dashboard proporciona una vista integral de la operación de flota:

### 📈 Métricas en Tiempo Real
```javascript
// Ejemplo de datos del dashboard
const fleetStats = {
  totalVehicles: 47,
  activeDrivers: 42,
  monthlyExpense: "€14,847",
  activeTrips: 12,
  efficiency: "78%",
  totalDistance: "124,450 km",
  fuelSavings: "€2,240",
  co2Reduction: "1,340 kg"
}
```

### 🗺️ Seguimiento de Flota
- **Ubicación en tiempo real** de todos los vehículos
- **Estado operacional** (En ruta, Parado, Mantenimiento)
- **Métricas de combustible** y velocidad actual
- **Alertas de seguridad** y mantenimiento

### 👨‍💼 Gestión de Conductores
- **Ranking de eficiencia** por conductor
- **Ahorros generados** individualmente
- **Número de viajes** completados
- **Estado de disponibilidad**

---

## 🔐 Sistema de Autenticación

### 🎫 Gestión de Tokens
- **Access Token**: Para autenticación de requests
- **Refresh Token**: Para renovación automática de sesión
- **Interceptores HTTP**: Manejo transparente de tokens

### 🔄 Flujo de Autenticación
```javascript
// Ejemplo del flujo de auth
1. Login → Recibe access token + refresh token
2. Requests automáticos → Incluye access token
3. Token expira → Interceptor renueva automáticamente
4. Refresh falla → Logout automático
```

### 🛡️ Seguridad
- **Tokens HTTP-only** para mayor seguridad
- **Validación automática** de sesiones
- **Logout seguro** con limpieza completa
- **Protección CSRF** con cookies secure

---

## 🤝 Colaboración Multidisciplinar

### 🏆 The Bridge - Desafío Final
**OnTrack** es el resultado del trabajo colaborativo entre cuatro equipos especializados en el marco del Desafío Final de The Bridge. Cada equipo aportó su expertise específica para crear una solución integral:

#### 🎨 **Equipo de Marketing**
- **UX/UI Research**: Investigación de usuarios y análisis de mercado
- **Brand Strategy**: Desarrollo de identidad visual y posicionamiento
- **User Journey**: Diseño de experiencia de usuario optimizada
- **Content Strategy**: Estrategia de contenidos y copy persuasivo

#### 📊 **Equipo de Data Science**
- **Algoritmos de Optimización**: Modelos para eficiencia de combustible
- **Análisis Predictivo**: Predicción de mantenimiento y costos
- **Machine Learning**: Sistemas de recomendación de rutas
- **Data Visualization**: Métricas y dashboards analíticos

#### 🔒 **Equipo de Ciberseguridad**
- **Seguridad de API**: Implementación de protocolos seguros
- **Gestión de Tokens**: Sistema JWT robusto y seguro
- **Protección de Datos**: Encriptación y compliance GDPR
- **Auditoría de Seguridad**: Análisis de vulnerabilidades

#### 💻 **Equipo Full-Stack** (Este Repositorio)
- **Frontend Development**: React + Redux + Vite
- **API Integration**: Cliente HTTP con interceptores
- **State Management**: Gestión completa del estado global
- **Responsive Design**: Interfaz adaptable y moderna

### 🔗 **Integración de Equipos**
Este repositorio frontend se conecta con:
- **Backend API** (desarrollado por Full-Stack)
- **Modelos ML** (integrados desde Data Science)
- **Políticas de Seguridad** (implementadas por Ciberseguridad)
- **Diseño UX/UI** (especificado por Marketing)

---

## 🎯 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Inicia servidor de desarrollo

# Construcción
npm run build           # Build de producción

# Linting
npm run lint           # Ejecuta ESLint

# Preview
npm run preview        # Preview del build de producción

# Documentación
npm run dashboard:readme:pdf  # Genera PDF del README
```

---

## 🌐 Variables de Entorno

```bash
# .env
VITE_API_URL=http://localhost:5000  # URL del backend API
```

### 📝 Configuración del API
El cliente HTTP está configurado con:
- **Base URL**: Configurable via `VITE_API_URL`
- **Timeout**: 15 segundos
- **Credentials**: Incluidas automáticamente
- **Interceptores**: Para auth y error handling

---

## 🚀 Próximas Características

- [ ] 📱 **App móvil** con React Native
- [ ] 🤖 **IA predictiva** para mantenimiento
- [ ] 🌍 **Mapas interactivos** con rutas optimizadas
- [ ] 📊 **Reportes avanzados** exportables
- [ ] 🔔 **Notificaciones push** en tiempo real
- [ ] 🌱 **Certificaciones ambientales** automáticas

---

## 👥 Contribuir

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

<div align="center">

**🎓 Proyecto Final - The Bridge | Desafío**

*OnTrack representa la excelencia en colaboración multidisciplinar*

**¿Listo para optimizar tu flota?**

[🚀 Demo Local](http://localhost:5173) | [🌉 The Bridge](https://thebridge.tech) | [📚 Documentación](./docs)

*Desarrollado con ❤️ por equipos de Marketing, Data Science, Ciberseguridad y Full-Stack*

---

### 🏆 Logros del Proyecto
- ✅ **Integración exitosa** de 4 disciplinas técnicas
- ✅ **Aplicación full-stack** completamente funcional  
- ✅ **Dashboard en tiempo real** con métricas avanzadas
- ✅ **Sistema de seguridad** robusto y escalable
- ✅ **UX/UI optimizada** basada en research

</div>