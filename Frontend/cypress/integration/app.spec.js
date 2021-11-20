describe('The Booster-Club App', () => {
    it('/ should successfully load', () => {
        cy.visit('/1rops');
    });

    it('main page should have clickable events that take you to /{id}', () => {
        cy.get('button').contains('Details').click();
    });

    it('main page should have a navbar with link to patches and should take you to /patches when clicked on', () => {
        cy.visit('/1rops')
        cy.get('button').contains('Patches').click();
        cy.url().should('include', '/patches');
    });

    it('events page should let you add receipts for an event', () => {
        cy.visit('/1rops/1')
        cy.get('button').contains('Add Receipt').click()
        cy.get('[alt="Reason"]').type('Purchased Christmas Decoration');
        cy.get('[alt="Amount"]').type(200);
        cy.get('[alt="Name"]').type('Farias');
        cy.get('button').contains('Submit Receipt').click();
    });

    it('should let you add new members from the home page', () => {
        
    });

    it('should let you pull up a pre-order list for a certain patch when clicked upon in /patches', () => {

    });

    it('should let have treasury tab with recent transactions and current balance of funds', () => {
        
    })
})