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
        cy.get(listLoginPage[loginPage.keyDashCheck]);  //cy.get(selectorsList[keyTitle]).contains('Dashboard')
        cy.get(listInfoPage[infoPage.keyByttonInfo]).click();
        cy.get(listInfoPage[infoPage.keyInfoCheck]);
        cy.get(listInfoPage[infoPage.keyFirstNameInfoPage]).clear().type("Jonathan");
        cy.get(listInfoPage[infoPage.keyMiddleNameInfoPage]).clear().type("Sagar");
        cy.get(listInfoPage[infoPage.keyLastNameInfoPage]).clear().type("Silva");
        cy.get(listInfoPage[infoPage.genericInfoField]).eq(3).clear().type("12340000");
        cy.get(listInfoPage[infoPage.genericInfoField]).eq(4).clear().type("1234567");
        cy.get(listInfoPage[infoPage.genericInfoField]).eq(7).clear().type("2024-10-10");
        cy.get(".--close").click();
        cy.get('.oxd-select-text').eq(0).click();
        cy.get('.oxd-select-dropdown > :nth-child(11)').click();
        cy.get('.oxd-select-text').eq(1).click();
        cy.get('.oxd-select-dropdown > :nth-child(3)').click();
        cy.get("[type='submit']").eq(0).click();
        cy.get('body').should('contain', "Successfully Updated")
    })
})