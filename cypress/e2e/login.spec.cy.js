import userData from "../fixtures/user-data.json"
import LoginPage from "../pages/loginPage.js"
import InfoPage from "../pages/infoPage.js"

const loginPage = new LoginPage(),
    listLoginPage = loginPage.selectorList(),
    infoPage = new InfoPage(),
    listInfoPage = infoPage.selectorList();

describe('Orange HRM Tests', () => {

    it('Login: Passed', () => {
        loginPage.accessLoginPage();
        loginPage.loginAction(userData.userDataSuccess.username, userData.userDataSuccess.password);
        cy.location('pathname').should('equal', listLoginPage[loginPage.keyDashURL]);
        cy.get(listLoginPage[loginPage.keyDashCheck]).should('be.visible'); //cy.get(selectorsList[keyTitle]).contains('Dashboard');
    })

    it('Login: Failed - Not Registred Username or Password', () => {
        loginPage.accessLoginPage();
        loginPage.loginAction(userData.userDataFailed.username, userData.userDataFailed.password);
        cy.get(listLoginPage[loginPage.keyErrorWrongCredential]);
    })

    it('Login: Failed - Username not entered', () => {
        loginPage.accessLoginPage();
        loginPage.loginAction(null, userData.userDataSuccess.password);
        cy.get(listLoginPage[loginPage.keyErrorNoCredential]);
    })

    it('Login: Failed - Password not entered', () => {
        loginPage.accessLoginPage();
        loginPage.loginAction(userData.userDataSuccess.username, null);
        cy.get(listLoginPage[loginPage.keyErrorNoCredential]);
    })

    it('Login: Failed - No credentials', () => {
        loginPage.accessLoginPage();
        loginPage.loginAction(null, null);
        cy.get(listLoginPage[loginPage.keyErrorNoCredential]).eq(0);
        cy.get(listLoginPage[loginPage.keyErrorNoCredential]).eq(1);
    })

    it('Navigation: My Info', () => {
        loginPage.accessLoginPage();
        loginPage.loginAction(userData.userDataSuccess.username, userData.userDataSuccess.password);
        cy.location('pathname').should('equal', listLoginPage[loginPage.keyDashURL]);
        cy.get(listLoginPage[loginPage.keyDashCheck]).should('be.visible'); //cy.get(selectorsList[keyTitle]).contains('Dashboard');
        cy.get(listInfoPage[infoPage.keyByttonInfo]).click();
        cy.get(listInfoPage[infoPage.keyInfoCheck]);
        infoPage.changeUserName("Jonathan", "Sagar", "Silva");
        infoPage.changeUsersJobDetails("12340000", "1234567", "2024-10-10");
        infoPage.SaveModifiedUser();
    })
})