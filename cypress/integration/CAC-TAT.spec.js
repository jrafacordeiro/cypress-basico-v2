// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function() {
    const TREE_SEC_IN_MS = 3000

    beforeEach(function() {
        cy.visit("src/index.html")
    })
    
    it('verifica o título da aplicação', function() {
        cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT")
        
        cy.get("[id=firstName]")
        .should("be.visible")
        .type("Rafael")
        .should("have.value", "Rafael")  
    })

    it("preenche os campos obrigatórios e envia o formulário", function(){
        cy.clock()
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
        cy.contains('.button[type=submit]', 'Enviar').click()

        //validar mensagem de sucesso
        cy.get('[class=success]').should("be.visible", "Mensagem enviada com sucesso.")

        cy.tick(TREE_SEC_IN_MS)
        cy.get('[class=success]').should("not.be.visible", "Mensagem enviada com sucesso.")
    })

        it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválid", function(){
        cy.clock()
        //preencher nome
        cy.get("[id=firstName]").type("Rafael")
        .should("have.value", "Rafael")

        //preencher sobrenome
        cy.get('[id=lastName]').type("Cordeiro")
        .should("have.value", "Cordeiro")

        //preencher email
        cy.get('[id=email]').type("teste@test")
        .should("have.value", "teste@test")

        //preencher como podemos ajudar
        cy.get('[id=open-text-area]').type("Teste de digitar na caixa de texto", {delay: 0})
        .should("have.value", "Teste de digitar na caixa de texto")

        //cy.get('[class=button]').click() 
        cy.contains('[class=button]', 'Enviar').click()

        //validar mensagem de erro
        cy.get('[class=error]').should("be.visible")

        cy.tick(TREE_SEC_IN_MS)
        cy.get('[class=error]').should("not.be.visible")

        
    })

    it("validar telefone não aceita letras", function(){
        //preencher telefone com letras
        cy.get("[id=phone]").type("Rafael")
        .should("have.value", "")

    })

    it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", function(){
        cy.clock()
        //preencher nome
        cy.get("[id=firstName]").type("Rafael")
        .should("have.value", "Rafael")

        //preencher sobrenome
        cy.get('[id=lastName]').type("Cordeiro")
        .should("have.value", "Cordeiro")

        //preencher email
        cy.get('[id=email]').type("teste@test")
        .should("have.value", "teste@test")

        //marcar checkbox telefone
        cy.get('[id=phone-checkbox]').check()
        .should("be.checked")

        //preencher como podemos ajudar
        cy.get('[id=open-text-area]').type("Teste de digitar na caixa de texto", {delay: 0})
        .should("have.value", "Teste de digitar na caixa de texto")

        //cy.get('[class=button]').click() 
        cy.contains('[class=button]', 'Enviar').click()

        //validar mensagem de erro
        cy.get('[class=error]').should("be.visible")
        
        cy.tick(TREE_SEC_IN_MS)
        cy.get('[class=error]').should("not.be.visible")
    })

    it("preenche e limpa os campos nome, sobrenome, email e telefone", function(){
        //preencher nome
        cy.get("[id=firstName]").type("Rafael")
        .should("have.value", "Rafael")
        .clear().should("have.value", "")

        //preencher sobrenome
        cy.get('[id=lastName]').type("Cordeiro")
        .should("have.value", "Cordeiro")
        .clear().should("have.value", "")

        //preencher email
        cy.get('[id=email]').type("teste@test.com")
        .should("have.value", "teste@test.com")
        .clear().should("have.value", "")

        //preencher como podemos ajudar
        cy.get('[id=open-text-area]').type("Teste de digitar na caixa de texto", {delay: 0})
        .should("have.value", "Teste de digitar na caixa de texto")
        .clear().should("have.value", "")  
    })

    it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", function(){
        cy.clock()
        //Clicar no botão enviar
        //cy.get('[class=button]').click() 
        cy.contains('[class=button]', 'Enviar').click()

        //validar mensagem de erro
        cy.get('[class=error]').should("be.visible")

        cy.tick(TREE_SEC_IN_MS)
        cy.get('[class=error]').should("not.be.visible")
    })

    it("envia o formuário com sucesso usando um comando customizado", function(){
        cy.clock()
        cy.fillMandatoryFieldsAndSubmit()
              
        //validar mensagem de sucesso
        cy.get('[class=success]').should("be.visible", "Mensagem enviada com sucesso.")
        cy.tick(TREE_SEC_IN_MS)
        cy.get('[class=success]').should("not.be.visible", "Mensagem enviada com sucesso.")

    })

    it("seleciona um produto (YouTube) por seu texto", function(){
        cy.get('[id=product]').select('youtube').should('have.value', 'youtube')
        
    })

    it(" seleciona um produto (Blog) por seu índice", function(){
        cy.get('[id=product]').select(1).should('have.value', 'blog')
        
    })

    it(" seleciona um produto (Blog) por seu índice", function(){
        cy.get('[type=radio][value=feedback]').check().should('have.value', 'feedback')
        
    })
   
    it("marca cada tipo de atendimento", function(){
        cy.get('[type=radio]')
        .should('have.length', 3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    it("marca ambos checkboxes, depois desmarca o último", function(){
        cy.get('[type=checkbox]').check()
        .should('be.checked')
        .last().uncheck()
        .should('not.be.checked')
    })

    it("seleciona um arquivo da pasta fixtures", function(){
       cy.get('[id=file-upload]').selectFile('cypress/fixtures/example.json')
       .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
       })
    })

    it("seleciona um arquivo simulando um drag-and-drop", function(){
        cy.get('[id=file-upload]').selectFile('cypress/fixtures/example.json', {action: "drag-drop"})
        .should(function($input){
             expect($input[0].files[0].name).to.equal('example.json')
        })
     })

     it("seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('[id=file-upload]').selectFile('@sampleFile')
        .should(function($input){
             expect($input[0].files[0].name).to.equal('example.json')
        })
     })

     it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", function(){
        cy.get('[id=privacy] a').should('have.attr', 'target', '_blank')
     })

     it("acessa a página da política de privacidade removendo o target e então clicanco no link", function(){
        cy.get('[id=privacy] a').invoke('removeAttr', 'target').click()
        cy.get('[id=title]').should('have.text', 'CAC TAT - Política de privacidade')
     })     

     it("testa a página da política de privavidade de forma independente", function(){
        cy.get('[id=privacy] a').invoke('removeAttr', 'target').click()
        cy.get('[id=title]').should('have.text', 'CAC TAT - Política de privacidade')
     })

     it("exibe e esconde as mensagens de sucesso e erro usando o .invoke()", function(){
        cy.get('.success')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso.')
        .invoke('hide')
        .should('not.be.visible')
        cy.get('.error')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!')
        .invoke('hide')
        .should('not.be.visible')
     })

     it("preenche a area de texto usando o comando invoke", function(){
        const longText = Cypress._.repeat("long ", 50)
        //preencher nome
         cy.get("[id=firstName]").invoke("val","Rafael")
         .should("have.value", "Rafael")
 
         //preencher sobrenome
         cy.get('[id=lastName]').invoke("val","Cordeiro")
         .should("have.value", "Cordeiro")
 
         //preencher email
         cy.get('[id=email]').invoke("val","teste@test.com")
         .should("have.value", "teste@test.com")
 
         //preencher como podemos ajudar
         cy.get('[id=open-text-area]').invoke("val",longText)
         .should("have.value", longText)
     })

     it("faz uma requisição HTTP", function(){
        const url = "https://cac-tat.s3.eu-central-1.amazonaws.com/index.html"
        cy.request('get', url)
        .should(function(response){
            console.log(response)
            const {status, statusText, body} = response
            expect(status).to.equal(200)
            expect(statusText).to.equal("OK")
            expect(body).to.include("CAC TAT")
        })
     })

     it.only("Encontre o gato", function(){
        cy.get("[id=cat]").should("not.be.visible")
        .invoke('show').should('be.visible')
        cy.get('#title')
        .invoke('text', 'CAT TAT')
        cy.get('#subtitle')
        .invoke('text', 'EU 💚 GATOS!')
     })

  })