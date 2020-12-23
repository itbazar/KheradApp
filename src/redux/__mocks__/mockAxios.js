import MockAdapter from "axios-mock-adapter";
import mockAuth from "../../app/modules/Auth/__mocks__/mockAuth";
import mockBlock from "../../app/modules/BaseInfo/__mocks__/mockBlock";
import mockDorm from "../../app/modules/BaseInfo/__mocks__/mockDorm";
import mockTerms from "../../app/modules/BaseInfo/__mocks__/mockTerm";
import mockUni from "../../app/modules/BaseInfo/__mocks__/mockUni";

export default function mockAxios(axios) {
  const mock = new MockAdapter(axios, { delayResponse: 300 });

  mockAuth(mock);
  mockTerms(mock);
  mockUni(mock);
  mockDorm(mock);
  mockBlock(mock);

  return mock;
}
