describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    cy.visit("http://localhost:3000");
  });
  it("login form is shown", function () {
    cy.contains("log in");
  });
});

// describe("Blog app 2", function () {
//   beforeEach(function () {
//     cy.visit("http://localhost:3000");
//     cy.get("#username").type("alexz648");
//     cy.get("#password").type("alexz648");
//     cy.get("#login-button").click();
//   });

//   it("open front page", function () {
//     cy.contains("blogs");
//   });
// });
