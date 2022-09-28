describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "name 1",
      username: "username 1",
      password: "password 1",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Log in to application");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("username 1");
      cy.get("#password").type("password 1");
      cy.get("#login-button").click();

      cy.get(".success").contains("successfully logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("username 1");
      cy.get("#password").type("password");
      cy.get("#login-button").click();

      cy.get(".error")
        .contains("wrong username or password")
        .and("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.get("#username").type("username 1");
      cy.get("#password").type("password 1");
      cy.get("#login-button").click();
    });

    it("A blog can be created", function () {
      cy.contains("new note").click();

      cy.get("#title-input").type("cypress title");
      cy.get("#author-input").type("cypress author");
      cy.get("#url-input").type("cypress url");

      cy.get("#submit-button").click();

      cy.contains("cypress title: cypress author");
    });
  });
});
