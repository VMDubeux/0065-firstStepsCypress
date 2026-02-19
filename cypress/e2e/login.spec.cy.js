describe('Orange HRM Tests', () => {

    const keyName = "userName";
    const keyPassword = "userPassword";
    const keyButton = "buttonLogin";
    const keyTitle = "titleText";
    const keyErrorWrongCredential = "errorWrongCredentials"
    const keyErrorNoCredential = "errorNoCredential";

    const selectorsList = {
        [keyName]: '[name="username"]',
        [keyPassword]: '[name="password"]',
        [keyButton]: '[type="submit"]',
        [keyTitle]: '.oxd-text--h6',
        [keyErrorWrongCredential]: '.oxd-alert-content-text',
        [keyErrorNoCredential]: '.oxd-text--span'
    }

    it('Login: Passed', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get(selectorsList[keyName]).type('Admin');
        cy.get(selectorsList[keyPassword]).type('admin123');
        cy.get(selectorsList[keyButton]).click();
        cy.location('pathname').should('equal', '/web/index.php/dashboard/index');
        cy.get(selectorsList[keyTitle]).contains('Dashboard');
    })

    it('Login: Failed - Not Registred Username or Password', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get(selectorsList[keyName]).type('Admi');
        cy.get(selectorsList[keyPassword]).type('admin123');
        cy.get(selectorsList[keyButton]).click();
        cy.get(selectorsList[keyErrorWrongCredential]);
    })

    it('Login: Failed - Username not entered', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get(selectorsList[keyPassword]).type('admin123');
        cy.get(selectorsList[keyButton]).click();
        cy.get(selectorsList[keyErrorNoCredential]);
    })

    it('Login: Failed - Password not entered', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get(selectorsList[keyName]).type('Admin');
        cy.get(selectorsList[keyButton]).click();
        cy.get(selectorsList[keyErrorNoCredential]);
    })

    it('Login: Failed - No credentials', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get(selectorsList[keyButton]).click();
        cy.get(selectorsList[keyErrorNoCredential]);
    })
})