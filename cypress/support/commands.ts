// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

declare global {
  namespace Cypress {
    // Define Chainable interface for the commands
    interface Chainable {
      login(
        loginMethod: string,
        email?: string,
        password?: string
      ): Chainable<void>;
    }
  }
}

// Define login command for reusability which supports multiple types of login

export function login(
  loginMethod: string,
  email?: string,
  password?: string
): void {
  switch (loginMethod) {
    case "email":
      cy.get('input[name="email"]').type(email);
      cy.get('input[name="password"]').type(password);
      cy.contains("Log In").click();
      break;
    case "google":
      cy.request({
        method: "POST",
        url: "https://www.googleapis.com/oauth2/v4/token",
        body: {
          grant_type: "refresh_token",
          client_id: Cypress.env("googleClientId"),
          client_secret: Cypress.env("googleClientSecret"),
          refresh_token: Cypress.env("googleRefreshToken"),
        },
      }).then(({ body }) => {
        const { access_token, id_token } = body;

        cy.request({
          method: "GET",
          url: "https://www.googleapis.com/oauth2/v3/userinfo",
          headers: { Authorization: `Bearer ${access_token}` },
        }).then(({ body }) => {
          cy.log(body);
          console.log(body);
        });
      });
      break;
  }
}

// Add login function to Cypress commands
Cypress.Commands.add("login", login);
