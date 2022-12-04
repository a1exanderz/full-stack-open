describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      username: "alexz648",
      password: "alexz648",
    };
    cy.request("POST", "http://localhost:3001/api/users", user);
    cy.visit("http://localhost:3000");
  });
  it("login form is shown", function () {
    cy.contains("log in");
  });

  describe("Login", function () {
    it("succeeds with right creds", function () {
      cy.get("#username").type("alexz648");
      cy.get("#password").type("alexz648");
      cy.get("#login-button").click();
      cy.contains("blogs");
    });
    it("fails with wrong creds", function () {
      cy.get("#username").type("alexz648");
      cy.get("#password").type("alexz647");
      cy.get("#login-button").click();
      cy.get(".error").should("contain", "Wrong credentials");
      cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.get("#username").type("alexz648");
      cy.get("#password").type("alexz648");
      cy.get("#login-button").click();
    });
    it.only("a blog can be created", function () {
      cy.get("#showBlogEntryButton").click();
      cy.get("#titleEntry").type("test title");
      cy.get("#authorEntry").type("test author");
      cy.get("#urlEntry").type("test entry");
      cy.get("#likesEntry").type(0);
      cy.get("#createEntryButton").click();
      cy.get("#resetEntryButton");
      cy.contains("test title");
    });
  });
});
