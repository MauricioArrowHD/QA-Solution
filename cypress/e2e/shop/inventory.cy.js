import InventoryPage from '../../pages/InventoryPage';

describe('Inventario - listado y ordenamiento', () => {
  const inventoryPage = new InventoryPage();

  beforeEach(() => {
    cy.loginAs('standard');
    inventoryPage.assertLoaded();
  });

  it('Muestra los 6 productos disponibles', () => {
    cy.get(inventoryPage.selectors.item).should('have.length', 6);
  });

  it('Ordena los productos por nombre A-Z', () => {
    inventoryPage.sortBy('az');
    inventoryPage.getItemNames().then((names) => {
      const sorted = [...names].sort();
      expect(names).to.deep.equal(sorted);
    });
  });

  it('Ordena los productos por nombre Z-A', () => {
    inventoryPage.sortBy('za');
    inventoryPage.getItemNames().then((names) => {
      const sorted = [...names].sort().reverse();
      expect(names).to.deep.equal(sorted);
    });
  });

  it('Ordena los productos por precio ascendente', () => {
    inventoryPage.sortBy('lohi');
    inventoryPage.getItemPrices().then((prices) => {
      const sorted = [...prices].sort((a, b) => a - b);
      expect(prices).to.deep.equal(sorted);
    });
  });

  it('Ordena los productos por precio descendente', () => {
    inventoryPage.sortBy('hilo');
    inventoryPage.getItemPrices().then((prices) => {
      const sorted = [...prices].sort((a, b) => b - a);
      expect(prices).to.deep.equal(sorted);
    });
  });
});
