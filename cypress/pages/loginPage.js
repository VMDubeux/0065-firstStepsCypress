class LoginPage {
    constructor() {
        this.keyDashURL = "DashURL";
        this.keyDashCheck = "dashboardPageCheck",
        this.keyLogURL = "siteURL";
        this.keyName = "userName";
        this.keyPassword = "userPassword";
        this.keyButtonLogin = "buttonLogin";
        this.keyErrorWrongCredential = "errorWrongCredentials";
        this.keyErrorNoCredential = "errorNoCredential";
    }

    selectorList() {
        const selectors = {
            [this.keyDashURL]: '/web/index.php/dashboard/index',
            [this.keyDashCheck]: '.orangehrm-dashboard-grid',
            [this.keyLogURL]: '/auth/login',
            [this.keyName]: '[name="username"]',
            [this.keyPassword]: '[name="password"]',
            [this.keyButtonLogin]: '[type="submit"]',
            [this.keyErrorWrongCredential]: '.oxd-alert-content-text',
            [this.keyErrorNoCredential]: '.oxd-text--span',
        };
        return selectors;
    }

    accessLoginPage() {
        const url = this.selectorList()[this.keyLogURL];
        cy.visit(url);
    }

    loginAction(user, password) {
        const list = this.selectorList();

        if (user == null && password != null) {
            cy.get(list[this.keyPassword]).clear().type(password);
            cy.get(list[this.keyButtonLogin]).click();
        }
        else if (password == null && user != null) {
            cy.get(list[this.keyName]).clear().type(user);
            cy.get(list[this.keyButtonLogin]).click();
        }
        else if (password == null && user == null) {
            cy.get(list[this.keyButtonLogin]).click();
        }
        else {
            cy.get(list[this.keyName]).clear().type(user);
            cy.get(list[this.keyPassword]).clear().type(password);
            cy.get(list[this.keyButtonLogin]).click();
        }
    }
}

export default LoginPage;