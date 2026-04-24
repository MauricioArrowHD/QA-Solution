class CartPage {

  selectors = {
    list: '.cart_list',
    item: '.cart_item',
    itemName: '.inventory_item_name',
    checkoutButton: '[data-test="checkout"]',
    continueShoppingButton: '[data-test="continue-shopping"]',
    removeButton: 'button',
  };

  assertLoaded() {
    cy.url().should('include', '/cart.html');
    cy.get(this.selectors.list).should('be.visible');
  }

  getItems() {
    return cy.get(this.selectors.item);
  }

  hasItem(productName) {
    cy.contains(this.selectors.item, productName).should('be.visible');
  }

  removeItem(productName) {
    cy.contains(this.selectors.item, productName)
      .find(this.selectors.removeButton)
      .click();
  }

  checkout() {
    cy.get(this.selectors.checkoutButton).click();
  }

  continueShopping() {
    cy.get(this.selectors.continueShoppingButton).click();
  }
}

export default CartPage;
