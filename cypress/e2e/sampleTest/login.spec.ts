describe("Check functionalities of the login page", () => {
  const Form_URL = "/#sign-in";

  beforeEach(() => {
    cy.visit(Form_URL);

    cy.url().should("eq", Cypress.config().baseUrl + Form_URL);
  });

  it("should display the Autocomplete title", () => {

    // Check Welcome to ZUJU KICKOFF text is displayed
    cy.get(".MuiTypography-h2").should("contain", "Welcome to ZUJU KICKOFF");
  });

  it("login using regular email and password successfully", () => {
    const email = Cypress.env("email");
    const password = Cypress.env("password");

    // Login to Zuju using email and password
    cy.login("email", email, password);

    // Check the text Upcoming for you is displayed
    cy.get('h2[data-cy="page-heading"]', { timeout: 10000 }).should(
      "contain",
      "Upcoming for you"
    );
  });

  it("login failed due to not existed email", () => {
    const email = "notexistedemail@gmail.com";
    const password = Cypress.env("password");

    // Login to Zuju using invalid email

    cy.login("email", email, password);

    // Check the error message is displayed correctly
    cy.get(
      'p[class="MuiTypography-root MuiTypography-body1 css-kzgg84"]'
    ).should(
      "have.text",
      "The email or password you entered is incorrect. Please try again."
    );
  });

  it("login failed due to not incorrect password", () => {
    const email = Cypress.env("email");
    const password = "incorrectPassword";


    // Login to Zuju using incorrect password
    cy.login("email", email, password);

    // Check error message is displayed correctly
    cy.get(
      'p[class="MuiTypography-root MuiTypography-body1 css-kzgg84"]'
    ).should(
      "have.text",
      "The email or password you entered is incorrect. Please try again."
    );
  });

  it("navigate to forgot password screen successfully", () => {

    // Go to forgot password screen
    cy.contains("Forgot password?").click();

    // Check the forgot your password text is displayed
    cy.get(
      'h2[class="MuiTypography-root MuiTypography-h2 css-1l35ssc"]'
    ).should("have.text", "Forgot your password?");
  });

  it("navigate to sign up screen successfully", () => {

    // Go to sign up screen
    cy.contains("Create one").click();

    // Check the text Create your account is displayed
    cy.get(
      'h2[class="MuiTypography-root MuiTypography-h2 css-1l35ssc"]'
    ).should("have.text", "Create Your Account");
  });

  it("Able to close the sign in form", () => {

    // Try to close the sign in form
    cy.get(
      'svg[class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-1k33q06"]'
    ).click();

    // Check the sign in form is closed
    cy.get('h2[class="MuiTypography-root MuiTypography-h2 css-ex2xci"]').should(
      "not.exist"
    );
  });
});
