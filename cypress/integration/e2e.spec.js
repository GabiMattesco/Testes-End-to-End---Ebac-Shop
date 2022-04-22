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

    it('Deve completar o pré-cadastro com sucesso - Usando comandos customizados', () => {
        cy.preCadastro('Gabriela', 'Mattesco')
        cy.get('.woocommerce-Button').click()
        cy.get('.woocommerce-message').should('contain', 'Detalhes da conta modificados com sucesso.')

        enderecopage.editarEnderecoFaturamento('Gabriela', 'Mattesco', 'Ebac', 'Brasil', 'Av. Brasil', '100', 'Rio de Janeiro', 'Rio de Janeiro', '21530000', '2177777777', 'gabrielamattesco@msn.com')
        cy.get('.woocommerce-message').should('contain', 'Endereço alterado com sucesso.')

        enderecopage.editarEnderecoEntrega('Gabriela', 'Mattesco', 'Ebac', 'Brasil', 'Av. Brasil', '100', 'Rio de Janeiro', 'Rio de Janeiro', '21530000')
        cy.get('.woocommerce-message').should('contain', 'Endereço alterado com sucesso.')
    });

    it('Deve adicionar os produtos ao carrinho - Usando comandos customizados', () => {
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.addProdutos('Aether Gym Pant', '36', 'Blue', 1)
        cy.get('.woocommerce-message').should('contain', '“Aether Gym Pant” foi adicionado no seu carrinho.')

        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.get(':nth-child(2) > .page-numbers').click()
        cy.addProdutos('Balboa Persistence Tee', 'L', 'Gray', 2)
        cy.get('.woocommerce-message').should('contain', '2 × “Balboa Persistence Tee” foram adicionados no seu carrinho.')

        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.get(':nth-child(2) > .page-numbers').click()
        cy.addProdutos('Caesar Warm-Up Pant', '36', 'Purple', 5)
        cy.get('.woocommerce-message').should('contain', '5 × “Caesar Warm-Up Pant” foram adicionados no seu carrinho.')

        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.addProdutos('Arcadio Gym Short', '36', 'Blue', 10)
        cy.get('.woocommerce-message').should('contain', '10 × “Arcadio Gym Short” foram adicionados no seu carrinho.')
    });

    it('Deve efetuar a compra com sucesso', () => {
        cy.get('#cart > .dropdown-toggle').click()
        cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .checkout').click({ force:true })
        cy.get('[type="checkbox"]').first().check()
        cy.get('[type="checkbox"]').check()
        cy.get('#place_order').click( { force:true } )
        cy.get('tfoot > :nth-child(3) > td > .woocommerce-Price-amount').should('contain', 'R$507,00')
        cy.get('.woocommerce-order-details__title').should('contain', 'Detalhes do pedido')
        cy.get('.woocommerce-column__title').should('contain', 'Endereço de faturamento')
    });
});