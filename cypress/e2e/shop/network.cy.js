import LoginPage from '../../pages/LoginPage';

describe('Network stubbing con cy.intercept', () => {
  const loginPage = new LoginPage();


  it('Simula falla de red bloqueando recursos estáticos', () => {
    cy.intercept('GET', '**/static/media/sauce-backpack**', {
      statusCode: 500,
      body: {},
    }).as('brokenImage');

    cy.loginAs('standard');
    cy.url().should('include', '/inventory.html');
    cy.get('.inventory_item').should('have.length', 6);
  });

  it('Verifica que al hacer login se navega correctamente (sin mock)', () => {
    loginPage.visit();
    cy.fixture('users').then(({ standard }) => {
      loginPage.login(standard.username, standard.password);
      cy.location('pathname').should('eq', '/inventory.html');
    });
  });
});
