// The Hosted API v1 read endpoints, as declared in
// hosted-web/packages/hosted/openapi/v1.yaml.
//
// Every v1 endpoint requires `Authorization: Bearer <token>`, and there is no
// session-cookie fallback, so these specs cover the contract a caller sees
// *without* a token. The handler checks the Authorization header before it
// resolves the owner, the deployment or the query parameters, so the
// placeholders below are never looked up and need not exist.

export interface ReadEndpoint {
  name: string;
  path: string;
}

const owner = "cypresstesting";
const deployment = "cypress-test";
const deploymentPath = `/api/v1/deployments/${owner}/${deployment}`;

export const problemType =
  "https://docs.dolthub.com/products/hosted/api/v1/models/#model-errorcode";

// `deployment-options` requires `cloud` and `pulls` requires `database`.
// They are supplied so these paths exercise the same code path as the rest:
// without them the request fails validation with a 400 before it is refused.
export const readEndpoints: ReadEndpoint[] = [
  { name: "GET /user", path: "/api/v1/user" },
  {
    name: "GET /deployment-options",
    path: "/api/v1/deployment-options?cloud=aws",
  },
  { name: "GET /deployments/{owner}", path: `/api/v1/deployments/${owner}` },
  { name: "GET /deployments/{owner}/{deployment}", path: deploymentPath },
  { name: "GET /instances", path: `${deploymentPath}/instances` },
  { name: "GET /backups", path: `${deploymentPath}/backups` },
  { name: "GET /config", path: `${deploymentPath}/config` },
  {
    name: "GET /pulls",
    path: `${deploymentPath}/pulls?database=cypress_test`,
  },
  {
    name: "GET /pulls/{id}/comments",
    path: `${deploymentPath}/pulls/1/comments`,
  },
  { name: "GET /pulls/{id}/logs", path: `${deploymentPath}/pulls/1/logs` },
];

// Asserts the RFC 9457 problem document that every non-2xx v1 response
// carries. `instance` is the requested path including its query string.
export function expectProblem(
  res: Cypress.Response<Record<string, unknown>>,
  status: number,
  code: string,
  title: string,
  instance: string,
): void {
  expect(res.status).to.equal(status);
  expect(res.headers["content-type"]).to.contain("application/problem+json");
  expect(res.body["type"]).to.equal(problemType);
  expect(res.body["title"]).to.equal(title);
  expect(res.body["status"]).to.equal(status);
  expect(res.body["code"]).to.equal(code);
  expect(res.body["instance"]).to.equal(instance);
  expect(res.body["request_id"]).to.be.a("string");
}
