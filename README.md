# SauceDemo - Proyecto de Automatización con Cypress

Proyecto de automatización QA end-to-end sobre [SauceDemo](https://www.saucedemo.com/), desarrollado con **Cypress** y **JavaScript**. Incluye pruebas de autenticación, carrito, checkout, ordenamiento e interceptación de red.

---

## Stack

- **Cypress 13** - framework E2E
- **JavaScript (ES Modules)**
- **Page Object Model (POM)** - patrón de diseño para mantener los tests desacoplados de los selectores
- **Fixtures** - datos de prueba reutilizables (usuarios, formularios de checkout)
- **Custom commands** - `cy.loginAs()`, `cy.addProductToCart()`, `cy.getCartBadge()`
- **Mochawesome** - reportes HTML

---

## Estructura del proyecto

```
.
├── cypress.config.js          # configuración de Cypress (baseUrl, retries, etc.)
├── package.json               # scripts npm y dependencias
├── cypress/
│   ├── e2e/
│   │   ├── auth/
│   │   │   └── login.cy.js        # pruebas de login (positivas, negativas, logout)
│   │   └── shop/
│   │       ├── cart.cy.js         # agregar/quitar productos, badge del carrito
│   │       ├── checkout.cy.js     # flujo E2E completo + validaciones
│   │       ├── inventory.cy.js    # listado y ordenamiento de productos
│   │       └── network.cy.js      # uso de cy.intercept() para mock de red
│   ├── fixtures/
│   │   ├── users.json             # usuarios de prueba
│   │   └── checkout.json          # datos del formulario de checkout
│   ├── pages/                     # Page Objects
│   │   ├── LoginPage.js
│   │   ├── InventoryPage.js
│   │   ├── CartPage.js
│   │   └── CheckoutPage.js
│   └── support/
│       ├── e2e.js                 # hooks globales
│       └── commands.js            # comandos personalizados
└── .gitignore
```

---

## Requisitos

- Node.js >= 18
- npm >= 9

---

## Instalación

```bash
npm install
```

---

## Ejecución

| Comando                 | Descripción                                     |
|-------------------------|-------------------------------------------------|
| `npm run cy:open`       | Abre Cypress en modo interactivo                |
| `npm run cy:run`        | Ejecuta todas las pruebas en headless           |
| `npm run cy:run:chrome` | Ejecuta todas las pruebas en Chrome             |
| `npm run cy:run:headed` | Ejecuta en modo headed (navegador visible)      |
| `npm run test:auth`     | Solo pruebas de autenticación                   |
| `npm run test:shop`     | Solo pruebas de la tienda                       |
| `npm run report`        | Ejecuta pruebas y genera reporte HTML           |

El reporte HTML queda en `cypress/reports/report.html`.

---

## Cobertura de pruebas

### Autenticación (`cypress/e2e/auth/login.cy.js`)
- Login exitoso con usuario estándar
- Credenciales inválidas
- Usuario bloqueado (`locked_out_user`)
- Validación de campo usuario requerido
- Validación de campo contraseña requerida
- Logout

### Carrito (`cypress/e2e/shop/cart.cy.js`)
- Agregar un producto al carrito (valida el badge)
- Agregar múltiples productos
- Eliminar producto desde el inventario
- Eliminar producto desde el carrito
- Botón "continue shopping"

### Checkout (`cypress/e2e/shop/checkout.cy.js`)
- Flujo E2E completo (login → carrito → checkout → confirmación)
- Validación de subtotal vs. suma de precios
- Validaciones de formulario (`data-driven` con `forEach`)
  - First name requerido
  - Last name requerido
  - Postal code requerido

### Inventario (`cypress/e2e/shop/inventory.cy.js`)
- Listado completo (6 productos)
- Ordenamiento por nombre A-Z / Z-A
- Ordenamiento por precio ascendente / descendente

### Network (`cypress/e2e/shop/network.cy.js`)
- Uso de `cy.intercept()` para interceptar peticiones
- Mock de respuesta 500 en recursos estáticos
- Validación de flujo real sin mocks

---

## Patrones y buenas prácticas aplicadas

- **Page Object Model**: cada página tiene su clase con selectores y acciones. Si cambia el DOM, solo se actualiza el POM, no los tests.
- **Custom commands**: `cy.loginAs('standard')` evita repetir pasos de login en cada test.
- **Fixtures**: los datos de prueba viven en JSON separado del código, facilitando data-driven tests.
- **Selectores `data-test`**: se prefieren atributos dedicados al testing sobre IDs/clases CSS que pueden cambiar por estilos.
- **`beforeEach`**: estado limpio antes de cada test (independencia).
- **Retries**: 1 reintento en modo CI para mitigar flakiness.
- **Asserts encadenados**: `.should('be.visible').and('contain.text', ...)` para validaciones ricas.

---

## Usuarios de prueba (SauceDemo)

| Usuario                   | Comportamiento                                    |
|---------------------------|---------------------------------------------------|
| `standard_user`           | Usuario normal, flujo ideal                       |
| `locked_out_user`         | Bloqueado, no puede hacer login                   |
| `problem_user`            | Tiene bugs intencionales (imágenes, formularios)  |
| `performance_glitch_user` | Respuestas lentas (útil para tests de timeouts)   |

Password común: `secret_sauce`.

---

## Autor

Proyecto creado como demo técnica para entrevista de QA Automation.
