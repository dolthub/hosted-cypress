import { expectProblem } from "@utils/apiV1";

const url = "/api/v1/user";

// Headers the API cannot turn into a usable credential, whether because they
// are malformed or because the token is simply refused. All are turned away
// the same way a missing header is: 401 UNAUTHENTICATED, never 400 or 403.
const badHeaders = [
  {
    name: "a token that is not a real credential",
    value: "Bearer notarealtoken",
  },
  { name: "a non-bearer scheme", value: "Basic Y3lwcmVzczpjeXByZXNz" },
  { name: "a bearer scheme with no token", value: "Bearer" },
  { name: "a lowercase bearer scheme", value: "bearer notarealtoken" },
];

describe("Hosted API v1 rejects unusable Authorization headers", () => {
  badHeaders.forEach(({ name, value }) => {
    it(`${url} with ${name} returns a 401 problem document`, () => {
      cy.request<Record<string, unknown>>({
        url,
        headers: { Authorization: value },
        failOnStatusCode: false,
      }).then(res => {
        expectProblem(res, 401, "UNAUTHENTICATED", "Unauthenticated", url);
      });
    });
  });

  // v1 documents `code` as the field clients branch on, never the prose in
  // `title`/`detail`, so the code has to be the same however the credential
  // failed. It is worth pinning separately because `detail` is *not* uniform:
  // a rejected but well-formed token reports "The Authorization header was
  // missing or malformed", where an absent header reports "Authentication
  // credentials were missing or invalid".
  it("reports the same error code whether or not a credential was sent", () => {
    cy.request<Record<string, unknown>>({
      url,
      failOnStatusCode: false,
    })
      .its("body.code")
      .should("equal", "UNAUTHENTICATED");
    cy.request<Record<string, unknown>>({
      url,
      headers: { Authorization: "Bearer notarealtoken" },
      failOnStatusCode: false,
    })
      .its("body.code")
      .should("equal", "UNAUTHENTICATED");
  });
});
