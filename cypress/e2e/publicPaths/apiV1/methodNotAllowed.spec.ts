import { expectProblem, readEndpoints } from "@utils/apiV1";

// The method check runs before the credential check, so an unsupported method
// is a 405 even without a token. DELETE is not allowed on any read endpoint.
describe("Hosted API v1 read endpoints reject unsupported methods", () => {
  readEndpoints.forEach(({ name, path }) => {
    it(`${name} answers DELETE with a 405 problem document`, () => {
      cy.request<Record<string, unknown>>({
        url: path,
        method: "DELETE",
        failOnStatusCode: false,
      }).then(res => {
        expectProblem(
          res,
          405,
          "METHOD_NOT_ALLOWED",
          "Method not allowed",
          path,
        );
        // Allow advertises what the path does support, and every read
        // endpoint supports at least GET.
        expect(res.headers["allow"]).to.contain("GET");
      });
    });
  });
});
