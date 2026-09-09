import { expectProblem, readEndpoints } from "@utils/apiV1";

describe("Hosted API v1 read endpoints refuse unauthenticated requests", () => {
  readEndpoints.forEach(({ name, path }) => {
    it(`${name} returns a 401 problem document`, () => {
      cy.request<Record<string, unknown>>({
        url: path,
        failOnStatusCode: false,
      }).then(res => {
        expectProblem(res, 401, "UNAUTHENTICATED", "Unauthenticated", path);
      });
    });
  });
});
