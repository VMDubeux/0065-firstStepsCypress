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
}

export default InfoPage;