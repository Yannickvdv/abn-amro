
describe('Test the node chart', () => {
  it('should show the infobar when a node is selected', () => {
    cy.visit('/')
    cy.get('.rich-node').then($richNodes => {
      // Generate a random index within the range of the count
      const randomIndex = Math.floor(Math.random() * $richNodes.length);
      cy.wrap($richNodes[randomIndex]).click();
      cy.get('.info-container')
        .should('exist')
        .within(() => {
          cy.get('h2').should('exist');
          cy.get('p').contains('This is a description of');
      });
    });
  })

  it('should remove the infobar when the node is deselected', () => {
    cy.visit('/')
    // Click to select node
    cy.get('.rich-node').first().click();

    // Validate that infobar exists
    cy.get('.info-container')
    .should('exist')
    .within(() => {
      cy.get('h2').should('exist');
      cy.get('p').contains('This is a description of');
    })

    // Click to deselect node
    cy.get('.rich-node').first().click();

    // Validate infobar does not exist
    cy.get('.info-container')
      .should('not.exist')
  })
})

