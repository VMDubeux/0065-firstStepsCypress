import userData from "../fixtures/user-data.json"
import LoginPage from "../pages/loginPage.js"
import InfoPage from "../pages/infoPage.js"

const loginPage = new LoginPage(),
    listLoginPage = loginPage.selectorList(),
    infoPage = new InfoPage(),
    listInfoPage = infoPage.selectorList();

describe('Change Info Orange HRM Tests', () => {

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