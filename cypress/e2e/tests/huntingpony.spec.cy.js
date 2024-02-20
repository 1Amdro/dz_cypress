it("should find element", () => {
  cy.visit("https://huntingpony.com/");
  cy.get(
    '[data-index="0"] > .header__collections-controls > .header__collections-link'
  ).click();
  cy.intercept("GET", "https://huntingpony.com/cart_items.json").as("next");
  cy.wait("@next");
  cy.get(
    '[data-product-id="338933151"] > .product-preview__content > .product-preview__area-photo > .product-preview__photo > .img-ratio > .img-ratio__inner > a > :nth-child(1) > .product-preview__img-1'
  ).click();
  cy.intercept(
    "POST",
    "https://api.carrottrack.app/users/$self_user/events"
  ).as("next2");
  cy.wait("@next2");
  cy.get(".add-cart-counter__btn").click();
  cy.get(".header__cart > .icon").click();
  cy.intercept(
    "POST",
    "https://api.carrottrack.app/users/$self_user/events"
  ).as("next3");
  cy.wait("@next3");
  cy.get(".cart-controls > .button").click();
  cy.intercept(
    "PUT",
    "https://huntingpony.com/payment/for_order.json?lang=ru&v2=true"
  ).as("next4");
  cy.wait("@next4");
  cy.get(".decorated-title");
  cy.contains("Оформление заказа").should("be.visible");
});
