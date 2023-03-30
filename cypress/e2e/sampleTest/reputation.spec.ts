describe("Forms", () => {
  const Form_URL = "/#sign-in";
  beforeEach(() => {

    // Login to zuju and visit reputation page before every test
    cy.visit(Form_URL);

    const email = Cypress.env("email");
    const password = Cypress.env("password");
    cy.login("email", email, password);


    // Wait for page to load and move to next line of code when the text Upcoming for you is displayed
    cy.get('h2[data-cy="page-heading"]', { timeout: 10000 }).should(
      "contain",
      "Upcoming for you"
    );
    cy.visit("/reputation");
  });

  it("Check favorite teams section exist", () => {

    // Check text "Favourite Teams" is displayed
    cy.contains("Favourite Teams", { timeout: 3000 });

    // Check the number of teams under favourite teams section is more than 1
    cy.get('div[data-cy="fav-team-list"]')
      .children()
      .should("have.length.greaterThan", 1);
  });

  it("Check all teams section exist", () => {

    // Check the text "All Teams" is displayed
    cy.contains("All Teams", { timeout: 3000 });

    // Check the number of teams under all teams section is more than 1
    cy.get("div.MuiGrid-container:nth-child(1)")
      .children()
      .should("have.length.greaterThan", 1);
  });

  it("Able to remove a team from favorite team list", () => {

    // Try to remove arsenal from favorite teams

    let team="Arsenal";
    try {
      cy.get(
        'div[class^="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root"]'
      ).each(($el) => {
        // $el is a wrapped jQuery element
        if ($el.text().match(team)) {
          cy.wrap($el).find("button").click();
        }
      });

      cy.get("div.MuiGrid-container:nth-child(1)").contains(team);
    } finally {

      // Try to add arsenal to favourite team as a teardown step
      cy.get(
        'div[class^="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root"]'
      ).each(($el) => {
        // $el is a wrapped jQuery element
        if ($el.text().match(team)) {
          cy.wrap($el).find("button").click();
        }
      });
    }
  });
});
