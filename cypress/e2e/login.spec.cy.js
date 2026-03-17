import userData from "../fixtures/user-data.json"

describe('Orange HRM Tests', () => {

    const keyURL = "siteURL"
    const keyName = "userName";
    const keyPassword = "userPassword";
    const keyButton = "buttonLogin";
    const keyTitle = "titleText";
    const keyDashCheck = "dashboardPageCheck";
    const keyErrorWrongCredential = "errorWrongCredentials"
    const keyErrorNoCredential = "errorNoCredential";

    const selectorsList = {
        [keyURL]: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
        [keyName]: '[name="username"]',
        [keyPassword]: '[name="password"]',
        [keyButton]: '[type="submit"]',
        [keyTitle]: '.oxd-text--h6',
        [keyDashCheck]: '.orangehrm-dashboard-grid',
        [keyErrorWrongCredential]: '.oxd-alert-content-text',
        [keyErrorNoCredential]: '.oxd-text--span'
    }

    it('Login: Passed', () => {
        cy.visit(selectorsList[keyURL]);
        cy.get(selectorsList[keyName]).type(userData.userDataSuccess.username);
        cy.get(selectorsList[keyPassword]).type(userData.userDataSuccess.password);
        cy.get(selectorsList[keyButton]).click();
        cy.location('pathname').should('equal', '/web/index.php/dashboard/index');
        //cy.get(selectorsList[keyTitle]).contains('Dashboard');
        cy.get(selectorsList[keyDashCheck]);
    })

    it('Login: Failed - Not Registred Username or Password', () => {
        cy.visit(selectorsList[keyURL]);
        cy.get(selectorsList[keyName]).type(userData.userDataFailed.username);
        cy.get(selectorsList[keyPassword]).type(userData.userDataFailed.password);
        cy.get(selectorsList[keyButton]).click();
        cy.get(selectorsList[keyErrorWrongCredential]);
    })

    it('Login: Failed - Username not entered', () => {
        cy.visit(selectorsList[keyURL]);
        cy.get(selectorsList[keyPassword]).type(userData.userDataFailed.password);
        cy.get(selectorsList[keyButton]).click();
        cy.get(selectorsList[keyErrorNoCredential]);
    })

    it('Login: Failed - Password not entered', () => {
        cy.visit(selectorsList[keyURL]);
        cy.get(selectorsList[keyName]).type(userData.userDataSuccess.username);
        cy.get(selectorsList[keyButton]).click();
        cy.get(selectorsList[keyErrorNoCredential]);
    })

    it('Login: Failed - No credentials', () => {
        cy.visit(selectorsList[keyURL]);
        cy.get(selectorsList[keyButton]).click();
        cy.get(selectorsList[keyErrorNoCredential]);
    })
})