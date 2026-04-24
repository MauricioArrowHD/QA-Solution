import LoginPage from '../../pages/LoginPage';
import InventoryPage from '../../pages/InventoryPage';

describe('Autenticación - Login', () => {
  const loginPage = new LoginPage();
  const inventoryPage = new InventoryPage();

  beforeEach(() => {
    loginPage.visit();
  });

  it('Permite login con usuario estándar', () => {
    cy.fixture('users').then(({ standard }) => {
      loginPage.login(standard.username, standard.password);
      inventoryPage.assertLoaded();
    });
  });

  it('Muestra error con credenciales inválidas', () => {
    cy.fixture('users').then(({ invalid }) => {
      loginPage.login(invalid.username, invalid.password);
      loginPage
        .getError()
        .should('be.visible')
        .and('contain.text', 'Username and password do not match');
    });
  });

  it('Muestra error cuando el usuario está bloqueado', () => {
    cy.fixture('users').then(({ locked }) => {
      loginPage.login(locked.username, locked.password);
      loginPage
        .getError()
        .should('be.visible')
        .and('contain.text', 'Sorry, this user has been locked out');
    });
  });

  it('Muestra error cuando falta el usuario', () => {
    loginPage.login('', 'secret_sauce');
    loginPage
      .getError()
      .should('be.visible')
      .and('contain.text', 'Username is required');
  });

  it('Muestra error cuando falta la contraseña', () => {
    loginPage.login('standard_user', '');
    loginPage
      .getError()
      .should('be.visible')
      .and('contain.text', 'Password is required');
  });

  it('Permite cerrar sesión', () => {
    cy.fixture('users').then(({ standard }) => {
      loginPage.login(standard.username, standard.password);
      inventoryPage.assertLoaded();
      inventoryPage.logout();
      cy.url().should('eq', `${Cypress.config('baseUrl')}`);
    });
  });
});
