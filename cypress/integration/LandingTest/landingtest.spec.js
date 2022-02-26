/// <reference types="Cypress" />
import 'cypress-file-upload';

describe('Landing visitor test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Visit another url', () => {
    cy.visit('/about', {
      timeout: 50000,
      onBeforeLoad(contentWindow) {
        // eslint-disable-next-line
        expect(typeof contentWindow === 'object').to.be.true;
      },
      onLoad(contentWindow) {
        // eslint-disable-next-line
        expect(typeof contentWindow === 'object').to.be.true;
      },
    });
  });

  it('Renders text', () => {
    cy.contains('Plow the land, grow your mind');
  });

  it('Renders top products', () => {
    cy.get('[data-test="top-products"]').should('have.length', 5);
  });

  it('Renders specific top category', () => {
    cy.get('[data-test="top-category"]').should('contain', 'Medical');
  });

  it('Visit Learn with Button', () => {
    cy.get('[data-test="learn"]').contains('LEARN').click();
    cy.location('pathname').should('include', 'learn');
  });

  it('Visit About with Button', () => {
    cy.get('[data-test="about"]').contains('ABOUT').click();
    cy.location('pathname').should('include', 'about');
  });

  it('Visit login with Button', () => {
    cy.get('[data-test="loginbtn"]').click();
    cy.location('pathname').should('include', 'login');
  });

  it('Allow to visit category', () => {
    // eslint-disable-next-line
    cy.wait(500).contains('Fertilizers').click();
    cy.location('pathname').should('include', 'Fertilizers');
  });

  it('Doesnt allow to order without products', () => {
    cy.get('[data-test="cartbtn"]').click();
    cy.contains('Order').click();
    cy.contains('Add some products to cart');
  });

  it('Allow to add products to cart', () => {
    cy.get('[data-test="cartbtnBSF"]').click();
    cy.get('[data-test="cartbtn"]').click();
    cy.get('[data-test="cart"]').contains('Pineapple');
  });
  it('Allow to go to order with products', () => {
    cy.get('[data-test="cartbtnBSF"]').click();
    cy.get('[data-test="cartbtn"]').click();
    cy.get('[data-test="cart"]').contains('Pineapple');
    cy.contains('Order').click();
    cy.location('pathname').should('include', 'orderresume');
  });
});

describe('Order test', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('Doesnt allow to order withour login', () => {
    cy.get('[data-test="cartbtnBSF"]').click();
    cy.get('[data-test="cartbtn"]').click();
    cy.get('[data-test="cart"]').contains('Pineapple');
    cy.contains('Order').click();
    cy.location('pathname').should('include', 'orderresume');
    cy.contains('Pay now').click();
    cy.contains('You have to login first');
  });
});
