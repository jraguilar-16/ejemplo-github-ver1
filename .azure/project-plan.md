# Project Plan

**Status**: Awaiting Integration
**Created**: 2026-11-04
**Mode**: NEW

---

## 1. Project Overview

**Goal**: Crear una tienda demostrativa de libretas personalizables en la que una persona pueda diseñar portada y contraportada, probar colores y recursos gráficos, cargar una foto local y completar un formulario de pedido de demostración. La aplicación no enviará pedidos ni guardará datos; cada módulo será comprobable de forma independiente.

**App Type**: Static web app (frontend-only)

**API Login**: No

**Mode**: NEW

**Deployment Plan**: No deployment plan found

---

## 2. Frontend — Web App

| Component | Technology |
|-----------|-----------|
| **Language** | JavaScript |
| **Framework** | HTML, CSS y JavaScript vanilla + Vite |
| **Package Manager** | npm |
| **Test Runner** | vitest |
| **Mocking Library** | vi.mock |
| **Test Command** | npm test |

---

## 3. Services Required

| Azure Service | Role in App | Environment Variable | Default Value (Local) | Classification |
|---------------|------------|---------------------|----------------------|----------------|
| None | No backend, cloud storage, or persistent data; the selected photo is used locally in the browser and is not uploaded | — | — | N/A |

---

## 4. Prerequisites

### Run

| Tool | Service(s) | Installed | Version |
|------|------------|-----------|---------|
| Node.js | frontend | ✅ | v24.20.0 |
| npm | frontend | ✅ | v11.19.0 |
| Modern web browser (Edge, Chrome, or Firefox detected) | frontend | ✅ | Version not checked |

### Debug

| Tool | Service(s) | Installed | Version |
|------|------------|-----------|---------|
| VS Code JavaScript Debugger (`ms-vscode.js-debug`) | frontend | ❓ | Unknown |

Double-check that the JavaScript Debugger is available in VS Code before debugging. No Docker or Azure emulators are required for this frontend-only project.

---

## 5. Design System & UI

**Component Library**: Pico.css + native form controls
**Style Direction**: Una papelería editorial, cálida y artesanal, con superficies color papel, acentos inspirados en la terracota y controles claros para que el diseño de la libreta sea el protagonista. Las tarjetas tendrán elevación discreta, bordes suaves y estados accesibles, sin depender de imágenes remotas.
**Typography**: Georgia for editorial headings, system-ui for controls and body text

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#355C4D` | Acciones principales del diseñador y navegación activa |
| `accent` | `#E8876A` | Acentos de colecciones, selección de color y detalles de portada |
| `surface` | `#FBF7F1` | Fondo de papel de la tienda y del área de edición |
| `text` | `#28352F` | Títulos, nombres de productos y texto principal |
| `muted` | `#77766F` | Descripciones, instrucciones y datos secundarios |
| `border` | `#E6DED3` | Bordes de controles, tarjetas y separadores |

### Pages

| Page | Route | Purpose | Layout |
|------|-------|---------|--------|
| Diseñador de libretas | `/` | Personalizar portada, contraportada y opciones; ver la carga de foto local y completar un pedido de demostración | `header + nav + hero + two-column(main+form) + tabs + footer` |
| Colecciones | `/#colecciones` | Explorar diseños de portada que se pueden personalizar | `header + nav + hero + grid + main + footer` |

> La carga de fotos solo usa una URL local temporal del navegador; valida tipo y tamaño, no sube ni conserva archivos. El formulario muestra un resumen de demostración y nunca transmite un pedido.

### Sample Content

Diseñador de libretas — configuración inicial:
| Campo | Valor |
|-------|-------|
| Producto | Libreta A5 de tapa dura |
| Diseño de portada | Flores silvestres |
| Diseño de contraportada | Verde bosque liso |
| Color de acento | Terracota `#E8876A` |
| Papel | Marfil, 120 g/m² |
| Cantidad | 1 · $24.00 |
| Foto local | Sin seleccionar; mostrar estado vacío con CTA «Seleccionar foto» |
| Error de carga representativo | «Elige una imagen JPG, PNG o WebP de hasta 10 MB» con acción «Intentar de nuevo» |
| Pedido de demostración | Nombre: Ana García · Correo: ana@example.com · Nota: «Sin dedicatoria» |

Colecciones — diseños personalizables:
| Diseño | Formato | Papel | Precio de demostración |
|--------|---------|-------|------------------------|
| Flores silvestres | A5 · tapa dura | Marfil, 120 g/m² | $24.00 |
| Geometría terracota | A5 · tapa dura | Marfil, 120 g/m² | $22.00 |
| Cielo nocturno | B6 · tapa blanda | Crema, 100 g/m² | $18.00 |

Estado de carga de Colecciones: las miniaturas de acabados muestran esqueletos mientras se prepara la vista previa; debajo permanecen visibles los tres diseños reales. Los recursos gráficos se representarán con SVG locales y las fotos de usuario nunca se incluirán como contenido predeterminado.

---

## 6. Project Structure

```text
/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.js
│   ├── styles/
│   │   └── main.css
│   ├── data/
│   │   └── collections.js
│   ├── components/
│   │   ├── cover-editor.js
│   │   ├── image-upload.js
│   │   └── demo-order-form.js
│   └── assets/
│       └── illustrations/
└── tests/
    ├── cover-editor.test.js
    ├── image-upload.test.js
    └── demo-order-form.test.js
```

---

## 7. Route Definitions

| # | Method | Path | Description | Request Body | Response Body | Status Codes |
|---|--------|------|-------------|-------------|--------------|-------------|
| 1 | GET | `/` | Cargar la tienda y el diseñador de libretas | — | Documento HTML y módulos frontend | 200 |
| 2 | GET | `/#colecciones` | Navegación frontend a las colecciones; no es una API ni requiere servidor de datos | — | Sección de colecciones renderizada en el cliente | 200 |
| 3 | Client-side | `/#pedido` | Mostrar el formulario y el resumen del pedido de demostración; no envía datos | Campos del formulario en memoria | Resumen local de demostración | Validación local |

---

## 8. Next Steps

1. Run **azure-project-scaffold** to execute this plan
2. Run **azure-project-integrate** to wire the frontend to live data, smoke-test the backend, and create the migrations
3. Run **azure-debug-plan** → **azure-debug-generate** for Docker emulators and VS Code debugging
4. Run the **azure-deploy** agent when ready; it uses **azure-app-onboard** for architecture, cost estimation, IaC generation, provisioning, and health verification
