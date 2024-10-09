describe('Homepage Tests', () => {
    // Test if the homepage loads
    it('Should load the homepage and display correct title', () => {
      // Visit the local website
      cy.visit('http://localhost:8080');
  
      // Check if the correct text appears on the homepage
      cy.contains('Hello World');
      cy.get('p').contains('My name is').should('contain', 'John Doe');
      cy.get('p').contains('My age is').should('contain', '25');
    });
  
    it('should display the About Me section', () => {
      cy.visit('http://localhost:8080');
  
      // Verify "About Me" section
      cy.get('h2').contains('About Me').should('exist');
      cy.get('p').contains('I am a software developer').should('exist');
    });

    it('should allow the user to submit the contact form', () => {
      cy.visit('http://localhost:8080');
  
      // Fill out the contact form
      cy.get('input[name="name"]').type('Jane Doe');
      cy.get('input[name="email"]').type('jane.doe@example.com');
      cy.get('textarea[name="message"]').type('This is a test message.');
  
      // Submit the form
      cy.get('button[type="submit"]').click();
  
      // Verify the success message
      cy.get('#successMessage').should('be.visible').and('contain', 'Thank you for your message!');
    });

    it('should require form fields to be filled before submission', () => {
      cy.visit('http://localhost:8080');
  
      // Try to submit the form without filling out fields
      cy.get('button[type="submit"]').click();
  
      // Check if form fields are still present (not submitted)
      cy.get('input[name="name"]:invalid').should('exist');
      cy.get('input[name="email"]:invalid').should('exist');
      cy.get('textarea[name="message"]:invalid').should('exist');
    });
  });