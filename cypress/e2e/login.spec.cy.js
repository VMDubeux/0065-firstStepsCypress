describe('Orange HRM Tests', () => {
    it('Login: Passed', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('[name="username"]').type('Admin');
        cy.get('[name="password"]').type('admin123');
        cy.get('[type="submit"]').click();
        cy.location('pathname').should('equal', '/web/index.php/dashboard/index');
        cy.get('.oxd-text--h6').contains('Dashboard');
    })

    it('Login: Failed - Not Registred Username or Password', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('[name="username"]').type('Admi');
        cy.get('[name="password"]').type('admin123');
        cy.get('[type="submit"]').click();
        cy.get('.oxd-alert-content-text');
    })

    it('Login: Failed - Username not entered', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('[name="password"]').type('admin123');
        cy.get('[type="submit"]').click();
        cy.get('.oxd-text--span');
    })

    it('Login: Failed - Password not entered', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('[name="username"]').type('Admin');
        cy.get('[type="submit"]').click();
        cy.get('.oxd-text--span');
    })

    it('Login: Failed - No credentials', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('[type="submit"]').click();
        cy.get('.oxd-text--span');
    })
})