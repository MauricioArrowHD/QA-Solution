import LoginPage from '../pages/LoginPage';

Cypress.Commands.overwrite('visit', (orig, url, options = {}) => {
  const userOnBeforeLoad = options.onBeforeLoad;
  return orig(url, {
    ...options,
    onBeforeLoad(win) {
      const originalFetch = win.fetch;
      win.fetch = function (input, init) {
        const reqUrl = typeof input === 'string' ? input : input?.url;
        if (reqUrl && !/saucedemo\.com/.test(reqUrl)) {
          return Promise.resolve(new win.Response('{}', { status: 200 }));
        }
        return originalFetch.call(this, input, init);
      };
      const OriginalXHR = win.XMLHttpRequest;
      win.XMLHttpRequest = function () {
        const xhr = new OriginalXHR();
        const originalOpen = xhr.open;
        xhr.open = function (method, reqUrl, ...rest) {
          if (reqUrl && !/saucedemo\.com/.test(reqUrl)) {
            return originalOpen.call(this, method, 'data:application/json,{}', ...rest);
          }
          return originalOpen.call(this, method, reqUrl, ...rest);
        };
        return xhr;
      };
      if (typeof userOnBeforeLoad === 'function') userOnBeforeLoad(win);
    },
  });
});

Cypress.Commands.add('loginAs', (userKey = 'standard') => {
  cy.fixture('users').then((users) => {
    const user = users[userKey];
    const loginPage = new LoginPage();
    loginPage.visit();
    loginPage.login(user.username, user.password);
  });
});

Cypress.Commands.add('addProductToCart', (productName) => {
  cy.contains('.inventory_item', productName)
    .find('button')
    .click();
});

Cypress.Commands.add('getCartBadge', () => {
  return cy.get('.shopping_cart_badge');
});
