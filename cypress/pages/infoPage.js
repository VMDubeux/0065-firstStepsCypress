class InfoPage {
    constructor() {
        this.keyInfoURL = "MyInfoURL";
        this.keyByttonInfo = "buttonMyInfoPage";
        this.keyTitle = "titleText";
        this.keyInfoCheck = "personalInfoPageCheck";
        this.keyFirstNameInfoPage = "firstNamePageInfo";
        this.keyMiddleNameInfoPage = "middleNamePageInfo";
        this.keyLastNameInfoPage = "lastNamePageInfo";
        this.genericInfoField = "genericMyInfoPageField";
        this.listInfoPage = this.selectorList();
    }

    selectorList() {
        const selectors = {
            [this.keyInfoURL]: '/pim/viewPersonalDetails/empNumber/7',
            [this.keyByttonInfo]: '[href="/web/index.php/pim/viewMyDetails"]',
            [this.keyTitle]: '.oxd-text--h6',
            [this.keyInfoCheck]: '.orangehrm-background-container',
            [this.keyFirstNameInfoPage]: '[name="firstName"]',
            [this.keyMiddleNameInfoPage]: '[name="middleName"]',
            [this.keyLastNameInfoPage]: '[name="lastName"]',
            [this.genericInfoField]: '.oxd-input--active'
        }
        return selectors;
    }

    changeUserName(firstName, middleName, lastName) {
        cy.get(this.listInfoPage[this.keyFirstNameInfoPage]).clear().type(firstName);
        cy.get(this.listInfoPage[this.keyMiddleNameInfoPage]).clear().type(middleName);
        cy.get(this.listInfoPage[this.keyLastNameInfoPage]).clear().type(lastName);
    }

    changeUsersJobDetails(employeeId, otherId, employeeBirthday) {
        cy.get(this.listInfoPage[this.genericInfoField]).eq(3).clear().type(employeeId);
        cy.get(this.listInfoPage[this.genericInfoField]).eq(4).clear().type(otherId);
        cy.get(this.listInfoPage[this.genericInfoField]).eq(7).clear().type(employeeBirthday);
        cy.get(".--close").click();
        cy.get('.oxd-select-text').eq(0).click();
        cy.get('.oxd-select-dropdown > :nth-child(11)').click();
        cy.get('.oxd-select-text').eq(1).click();
        cy.get('.oxd-select-dropdown > :nth-child(3)').click();
    }

    SaveModifiedUser() {
        cy.get("[type='submit']").eq(0).click();
        cy.get('body').should('contain', "Successfully Updated")
    }
}

export default InfoPage;