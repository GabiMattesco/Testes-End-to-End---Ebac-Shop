/// <reference types="cypress" />
const perfil = require('../fixtures/perfil.json');
import enderecopage from '../support/page_objects/endereco.page';
import comandos from '../support/commands'

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {

    beforeEach(() => {
        cy.visit('minha-conta/')
        cy.fixture('perfil').then((dados) => {
            cy.login(dados.usuario, dados.senha)
        });
        cy.get('.page-title').should('contain', 'Minha conta')
    });

    it('Deve efetuar a compra com sucesso - Usando comandos customizados', () => {
        cy.preCadastro('Gabriela', 'Mattesco')
        enderecopage.editarEnderecoFaturamento('Gabriela', 'Mattesco', 'Ebac', 'Brasil', 'Av. Brasil', '100', 'Rio de Janeiro', 'Rio de Janeiro', '21530000', '2177777777', 'gabrielamattesco@msn.com')
        enderecopage.editarEnderecoEntrega('Gabriela', 'Mattesco', 'Ebac', 'Brasil', 'Av. Brasil', '100', 'Rio de Janeiro', 'Rio de Janeiro', '21530000')

            
        cy.visit('produtos/')
        cy.get('[class="product-block grid"]')
            .eq(3).click()
        cy.addProdutos('XS', 'Blue', 2),

        cy.visit('produtos/')
        cy.get('[class="product-block grid"]')
            .eq(5).click()
        cy.addProdutos('36', 'Black', 5),

        cy.visit('produtos/')
        cy.get('[class="product-block grid"]')
            .eq(7).click()
        cy.addProdutos('XL', 'Green', 6),

        cy.visit('produtos/')
        cy.get('[class="product-block grid"]')
            .eq(8).click()
        cy.addProdutos('S', 'Blue', 1)

        cy.get('#cart > .dropdown-toggle').click()
        cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .checkout').click({ force: true })
        cy.get('[type="checkbox"]').first().check()
        cy.get('[type="checkbox"]').check()
        cy.get('#place_order').click({ force: true })
        
        cy.get('.woocommerce-order-details__title').should('contain', 'Detalhes do pedido')
        cy.get('.woocommerce-column__title').should('contain', 'Endereço de faturamento')

    });    
});
