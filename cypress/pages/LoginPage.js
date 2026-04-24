class LoginPage {

  selectors = {
    username: '[data-test="username"]',
    password: '[data-test="password"]',
    loginButton: '[data-test="login-button"]',
    errorMessage: '[data-test="error"]',
  };

  visit() {
    cy.visit('/');
  }

  fillUsername(username) {
    cy.get(this.selectors.username).clear();
    if (username) cy.get(this.selectors.username).type(username);
  }

  fillPassword(password) {
    cy.get(this.selectors.password).clear();
    if (password) cy.get(this.selectors.password).type(password);
  }

  submit() {
    cy.get(this.selectors.loginButton).click();
  }

  login(username, password) {
    this.fillUsername(username);
    this.fillPassword(password);
    this.submit();
  }

  getError() {
    return cy.get(this.selectors.errorMessage);
  }
}

export default LoginPage;
