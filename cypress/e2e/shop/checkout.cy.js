import InventoryPage from '../../pages/InventoryPage';
import CartPage from '../../pages/CartPage';
import CheckoutPage from '../../pages/CheckoutPage';

describe('Flujo E2E de checkout', () => {
  const inventoryPage = new InventoryPage();
  const cartPage = new CartPage();
  const checkoutPage = new CheckoutPage();

  beforeEach(() => {
    cy.loginAs('standard');
    inventoryPage.assertLoaded();
  });

  it('Completa una compra exitosa de extremo a extremo', () => {
    inventoryPage.addItem('Sauce Labs Backpack');
    inventoryPage.addItem('Sauce Labs Bike Light');
    inventoryPage.openCart();

    cartPage.assertLoaded();
    cartPage.getItems().should('have.length', 2);
    cartPage.checkout();

    cy.fixture('checkout').then(({ valid }) => {
      checkoutPage.fillForm(valid).continue();
    });

    cy.url().should('include', '/checkout-step-two.html');

    checkoutPage.getSubtotal().then((subtotal) => {
      checkoutPage.getTotal().then((total) => {
        expect(total).to.be.greaterThan(subtotal);
      });
    });

    checkoutPage.finish();
    checkoutPage.assertOrderComplete();
  });

  it('Valida que el subtotal coincida con la suma de los productos', () => {
    inventoryPage.addItem('Sauce Labs Backpack');
    inventoryPage.addItem('Sauce Labs Bike Light');
    inventoryPage.openCart();
    cartPage.checkout();

    cy.fixture('checkout').then(({ valid }) => {
      checkoutPage.fillForm(valid).continue();
    });

    const prices = [];
    cy.get('.inventory_item_price').each(($el) => {
      prices.push(parseFloat($el.text().replace('$', '')));
    }).then(() => {
      const expectedSubtotal = prices.reduce((a, b) => a + b, 0);
      checkoutPage.getSubtotal().should('be.closeTo', expectedSubtotal, 0.01);
    });
  });

  [
    { key: 'missingFirstName', expected: 'First Name is required' },
    { key: 'missingLastName', expected: 'Last Name is required' },
    { key: 'missingPostalCode', expected: 'Postal Code is required' },
  ].forEach(({ key, expected }) => {
    it(`Muestra error cuando falta el campo: ${key}`, () => {
      inventoryPage.addItem('Sauce Labs Backpack');
      inventoryPage.openCart();
      cartPage.checkout();

      cy.fixture('checkout').then((data) => {
        checkoutPage.fillForm(data[key]).continue();
        checkoutPage.getError().should('be.visible').and('contain.text', expected);
      });
    });
  });
});
