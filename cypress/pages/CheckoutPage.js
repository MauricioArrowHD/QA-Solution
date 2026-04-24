class CheckoutPage {

  selectors = {
    firstName: '[data-test="firstName"]',
    lastName: '[data-test="lastName"]',
    postalCode: '[data-test="postalCode"]',
    continueButton: '[data-test="continue"]',
    cancelButton: '[data-test="cancel"]',
    finishButton: '[data-test="finish"]',
    backHomeButton: '[data-test="back-to-products"]',
    errorMessage: '[data-test="error"]',
    summaryItem: '.cart_item',
    subtotalLabel: '.summary_subtotal_label',
    taxLabel: '.summary_tax_label',
    totalLabel: '.summary_total_label',
    completeHeader: '.complete-header',
  };

  fillForm({ firstName, lastName, postalCode }) {
    if (firstName) cy.get(this.selectors.firstName).type(firstName);
    if (lastName) cy.get(this.selectors.lastName).type(lastName);
    if (postalCode) cy.get(this.selectors.postalCode).type(postalCode);
    return this;
  }

  continue() {
    cy.get(this.selectors.continueButton).click();
    return this;
  }

  finish() {
    cy.get(this.selectors.finishButton).click();
    return this;
  }

  getError() {
    return cy.get(this.selectors.errorMessage);
  }

  getSubtotal() {
    return cy.get(this.selectors.subtotalLabel).invoke('text').then((text) => {
      const match = text.match(/\$([\d.]+)/);
      return match ? parseFloat(match[1]) : 0;
    });
  }

  getTotal() {
    return cy.get(this.selectors.totalLabel).invoke('text').then((text) => {
      const match = text.match(/\$([\d.]+)/);
      return match ? parseFloat(match[1]) : 0;
    });
  }

  assertOrderComplete() {
    cy.url().should('include', '/checkout-complete.html');
    cy.get(this.selectors.completeHeader)
      .should('be.visible')
      .and('contain.text', 'Thank you for your order');
  }
}

export default CheckoutPage;
