class InventoryPage {

  selectors = {
    container: '.inventory_container',
    item: '.inventory_item',
    itemName: '.inventory_item_name',
    itemPrice: '.inventory_item_price',
    sortDropdown: '[data-test="product-sort-container"]',
    cartLink: '.shopping_cart_link',
    cartBadge: '.shopping_cart_badge',
    burgerMenu: '#react-burger-menu-btn',
    logoutLink: '#logout_sidebar_link',
  };

  assertLoaded() {
    cy.url().should('include', '/inventory.html');
    cy.get(this.selectors.container).should('be.visible');
  }

  addItem(productName) {
    cy.contains(this.selectors.item, productName).find('button').click();
  }

  removeItem(productName) {
    cy.contains(this.selectors.item, productName).find('button').click();
  }

  openCart() {
    cy.get(this.selectors.cartLink).click();
  }

  sortBy(value) {
    cy.get(this.selectors.sortDropdown).select(value);
  }

  getItemNames() {
    return cy.get(this.selectors.itemName).then(($els) =>
      [...$els].map((el) => el.innerText)
    );
  }

  getItemPrices() {
    return cy.get(this.selectors.itemPrice).then(($els) =>
      [...$els].map((el) => parseFloat(el.innerText.replace('$', '')))
    );
  }

  logout() {
    cy.get(this.selectors.burgerMenu).click();
    cy.get(this.selectors.logoutLink).click();
  }
}

export default InventoryPage;
