describe('Homepage Tests', () => {
    // Test if the homepage loads
    it('Should load the homepage and display correct title', () => {
      // Visit the local website
      cy.visit('http://localhost:8080');
  
      // Check if the correct text appears on the homepage
      cy.contains('Hello World');
    });
  
    // Test navigation or any interactive elements
    // it('Should navigate to /items and display a list', () => {
    //   // Assuming you have a link on the homepage to the items page
    //   cy.get('a[href="/items"]').click();
  
    //   // Verify that the /items page is loaded
    //   cy.url().should('include', '/items');
  
    //   // Check if the list of items is displayed
    //   cy.contains('Items List');
    // });
  });