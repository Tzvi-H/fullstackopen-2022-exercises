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

    describe("and several blogs exist", function () {
      beforeEach(function () {
        cy.contains("new note").click();
        cy.get("#title-input").type("cypress title 1");
        cy.get("#author-input").type("cypress author 1");
        cy.get("#url-input").type("cypress url 1");
        cy.get("#submit-button").click();

        cy.contains("new note").click();
        cy.get("#title-input").type("cypress title 2");
        cy.get("#author-input").type("cypress author 2");
        cy.get("#url-input").type("cypress url 2");
        cy.get("#submit-button").click();

        cy.contains("new note").click();
        cy.get("#title-input").type("cypress title 3");
        cy.get("#author-input").type("cypress author 3");
        cy.get("#url-input").type("cypress url 3");
        cy.get("#submit-button").click();
      });

      it("one of those can be liked", function () {
        cy.contains("cypress title 1: cypress author 1")
          .contains("view")
          .click();

        cy.contains("like").click();

        cy.contains("cypress title 1: cypress author 1").contains("likes 1");
      });

      it("one of those can be deleted", function () {
        cy.visit("http://localhost:3000");

        cy.contains("cypress title 1: cypress author 1")
          .contains("view")
          .click();

        cy.contains("remove").click();

        cy.contains("cypress title 1: cypress author 1").should("not.exist");
        cy.contains("cypress title 2: cypress author 2").should("exist");
      });

      it.only("blogs are ordered in descending order by likes", function () {
        cy.contains("cypress title 1: cypress author 1")
          .contains("view")
          .click();
        cy.contains("cypress title 1: cypress author 1")
          .contains("like")
          .click();

        cy.contains("cypress title 2: cypress author 2")
          .contains("view")
          .click();
        cy.contains("cypress title 2: cypress author 2")
          .contains("like")
          .click();

        cy.contains("cypress title 2: cypress author 2").click();
        cy.contains("cypress title 2: cypress author 2")
          .contains("like")
          .click();

        cy.visit("http://localhost:3000");

        cy.get(".blog")
          .eq(0)
          .should("contain", "cypress title 2: cypress author 2");
        cy.get(".blog")
          .eq(1)
          .should("contain", "cypress title 1: cypress author 1");
      });
    });
  });
});
