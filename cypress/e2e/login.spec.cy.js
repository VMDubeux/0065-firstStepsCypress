import userData from "../fixtures/user-data.json"

describe('Orange HRM Tests', () => {

    const keyLogURL = "siteURL";
    const keyDashURL = "DashURL";
    const keyInfoURL = "MyInfoURL";
    const keyName = "userName";
    const keyPassword = "userPassword";
    const keyButtonLogin = "buttonLogin";
    const keyByttonInfo = "buttonMyInfoPage";
    const keyTitle = "titleText";
    const keyDashCheck = "dashboardPageCheck";
    const keyInfoCheck = "personalInfoPageCheck";
    const keyErrorWrongCredential = "errorWrongCredentials";
    const keyErrorNoCredential = "errorNoCredential";
    const keyFirstNameInfoPage = "firstNamePageInfo";
    const keyMiddleNameInfoPage = "middleNamePageInfo";
    const keyLastNameInfoPage = "lastNamePageInfo";
    const genericInfoField = "genericMyInfoPageField";

    const selectorsList = {
        [keyLogURL]: '/auth/login',
        [keyDashURL]: '/web/index.php/dashboard/index',
        [keyInfoURL]: '/pim/viewPersonalDetails/empNumber/7',
        [keyName]: '[name="username"]',
        [keyPassword]: '[name="password"]',
        [keyButtonLogin]: '[type="submit"]',
        [keyByttonInfo]: '[href="/web/index.php/pim/viewMyDetails"]',
        [keyTitle]: '.oxd-text--h6',
        [keyDashCheck]: '.orangehrm-dashboard-grid',
        [keyInfoCheck]: '.orangehrm-background-container',
        [keyErrorWrongCredential]: '.oxd-alert-content-text',
        [keyErrorNoCredential]: '.oxd-text--span',
        [keyFirstNameInfoPage]: '[name="firstName"]',
        [keyMiddleNameInfoPage]: '[name="middleName"]',
        [keyLastNameInfoPage]: '[name="lastName"]',
        [genericInfoField]: '.oxd-input--active',
    }

    it('Login: Passed', () => {
        cy.visit(selectorsList[keyLogURL]);
        cy.get(selectorsList[keyName]).clear().type(userData.userDataSuccess.username);
        cy.get(selectorsList[keyPassword]).clear().type(userData.userDataSuccess.password);
        cy.get(selectorsList[keyButtonLogin]).click();
        cy.location('pathname').should('equal', selectorsList[keyDashURL]);
        //cy.get(selectorsList[keyTitle]).contains('Dashboard');
        cy.get(selectorsList[keyDashCheck]);
    })

    it('Login: Failed - Not Registred Username or Password', () => {
        cy.visit(selectorsList[keyLogURL]);
        cy.get(selectorsList[keyName]).clear().type(userData.userDataFailed.username);
        cy.get(selectorsList[keyPassword]).clear().type(userData.userDataFailed.password);
        cy.get(selectorsList[keyButtonLogin]).click();
        cy.get(selectorsList[keyErrorWrongCredential]);
    })

    it('Login: Failed - Username not entered', () => {
        cy.visit(selectorsList[keyLogURL]);
        cy.get(selectorsList[keyPassword]).clear().type(userData.userDataFailed.password);
        cy.get(selectorsList[keyButtonLogin]).click();
        cy.get(selectorsList[keyErrorNoCredential]);
    })

    it('Login: Failed - Password not entered', () => {
        cy.visit(selectorsList[keyLogURL]);
        cy.get(selectorsList[keyName]).clear().type(userData.userDataSuccess.username);
        cy.get(selectorsList[keyButtonLogin]).click();
        cy.get(selectorsList[keyErrorNoCredential]);
    })

    it('Login: Failed - No credentials', () => {
        cy.visit(selectorsList[keyLogURL]);
        cy.get(selectorsList[keyButtonLogin]).click();
        cy.get(selectorsList[keyErrorNoCredential]).eq(0);
        cy.get(selectorsList[keyErrorNoCredential]).eq(1);
    })

    it.only('Navigation: My Info', () => {
        cy.visit(selectorsList[keyLogURL]);
        cy.get(selectorsList[keyName]).clear().type(userData.userDataSuccess.username);
        cy.get(selectorsList[keyPassword]).clear().type(userData.userDataSuccess.password);
        cy.get(selectorsList[keyButtonLogin]).click();
        cy.location('pathname').should('equal', selectorsList[keyDashURL]);
        //cy.get(selectorsList[keyTitle]).contains('Dashboard');
        cy.get(selectorsList[keyDashCheck]);
        //cy.visit(selectorsList[keyInfoURL]);
        //cy.location('pathname').should('equal', selectorsList[keyInfoURL]);
        cy.get(selectorsList[keyByttonInfo]).click();
        cy.get(selectorsList[keyInfoCheck]);
        cy.get(selectorsList[keyFirstNameInfoPage]).clear().type("Jonathan");
        cy.get(selectorsList[keyMiddleNameInfoPage]).clear().type("Sagar");
        cy.get(selectorsList[keyLastNameInfoPage]).clear().type("Silva");
        cy.get(selectorsList[genericInfoField]).eq(3).clear().type("12340000");
        cy.get(selectorsList[genericInfoField]).eq(4).clear().type("1234567");
        cy.get(selectorsList[genericInfoField]).eq(7).clear().type("2024-10-10");
        cy.get(".--close").click();
        cy.get("[type='submit']").eq(0).click();
        cy.get('body').should('contain', "Successfully Updated")
    })
})