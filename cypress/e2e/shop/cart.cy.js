import InventoryPage from '../../pages/InventoryPage';
import CartPage from '../../pages/CartPage';

describe('Carrito de compras', () => {
  const inventoryPage = new InventoryPage();
  const cartPage = new CartPage();

  beforeEach(() => {
    cy.loginAs('standard');
    inventoryPage.assertLoaded();
  });

  it('Agrega un producto al carrito y actualiza el badge', () => {
    inventoryPage.addItem('Sauce Labs Backpack');
    cy.getCartBadge().should('have.text', '1');
  });

  it('Agrega múltiples productos y los muestra en el carrito', () => {
    inventoryPage.addItem('Sauce Labs Backpack');
    inventoryPage.addItem('Sauce Labs Bike Light');
    inventoryPage.addItem('Sauce Labs Onesie');

    cy.getCartBadge().should('have.text', '3');

    inventoryPage.openCart();
    cartPage.assertLoaded();
    cartPage.getItems().should('have.length', 3);
    cartPage.hasItem('Sauce Labs Backpack');
    cartPage.hasItem('Sauce Labs Bike Light');
    cartPage.hasItem('Sauce Labs Onesie');
  });

  it('Elimina un producto desde la página de inventario', () => {
    inventoryPage.addItem('Sauce Labs Backpack');
    cy.getCartBadge().should('have.text', '1');
    inventoryPage.removeItem('Sauce Labs Backpack');
    cy.get('.shopping_cart_badge').should('not.exist');
  });

  it('Elimina un producto desde el carrito', () => {
    inventoryPage.addItem('Sauce Labs Backpack');
    inventoryPage.addItem('Sauce Labs Bike Light');
    inventoryPage.openCart();

    cartPage.removeItem('Sauce Labs Backpack');
    cartPage.getItems().should('have.length', 1);
    cy.getCartBadge().should('have.text', '1');
  });

  it('Permite continuar comprando desde el carrito', () => {
    inventoryPage.addItem('Sauce Labs Backpack');
    inventoryPage.openCart();
    cartPage.continueShopping();
    inventoryPage.assertLoaded();
  });
});
