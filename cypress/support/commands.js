// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    //preencher nome
    cy.get("[id=firstName]").type("Rafael")
    .should("have.value", "Rafael")

    //preencher sobrenome
    cy.get('[id=lastName]').type("Cordeiro")
    .should("have.value", "Cordeiro")

    //preencher email
    cy.get('[id=email]').type("teste@test.com")
    .should("have.value", "teste@test.com")

    //preencher como podemos ajudar
    cy.get('[id=open-text-area]').type("Teste de digitar na caixa de texto", {delay: 0})
    .should("have.value", "Teste de digitar na caixa de texto")

    //Clicar no botão enviar
    //cy.get('[class=button]').click() 
    cy.contains('[class=button]', 'Enviar').click()
})