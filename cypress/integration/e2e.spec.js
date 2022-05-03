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

    it.only('Deve efetuar a compra com sucesso - Usando comandos customizados', () => {
        cy.preCadastro('Gabriela', 'Mattesco')
        enderecopage.editarEnderecoFaturamento('Gabriela', 'Mattesco', 'Ebac', 'Brasil', 'Av. Brasil', '100', 'Rio de Janeiro', 'Rio de Janeiro', '21530000', '2177777777', 'gabrielamattesco@msn.com')
        enderecopage.editarEnderecoEntrega('Gabriela', 'Mattesco', 'Ebac', 'Brasil', 'Av. Brasil', '100', 'Rio de Janeiro', 'Rio de Janeiro', '21530000')

       cy.addProdutos('3', 'S', 'Blue', 2),
       cy.addProdutos('5', '36', 'Black', 5),
       cy.addProdutos('7', 'XL', 'Green', 6),
       cy.addProdutos('8', 'S', 'Blue', 1)

        cy.get('.woocommerce-message > .button').click() 
        cy.get('.checkout-button').click()  
        cy.get('[type="checkbox"]').first().check()
        cy.get('[type="checkbox"]').check()
        cy.get('#place_order').click({ force: true })
        cy.get('tfoot > :nth-child(3) > td > .woocommerce-Price-amount').should('contain', 'R$490,00')
        cy.get('.woocommerce-order-details__title').should('contain', 'Detalhes do pedido')
        cy.get('.woocommerce-column__title').should('contain', 'Endereço de faturamento')

    });    
});
