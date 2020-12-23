import dormTableMock from "./dormTableMock";
import MockUtils from "./mock.utils";

export default function mockDorm(mock) {
  mock.onPost("api/dorms").reply(({ data }) => {
    const { dorm } = JSON.parse(data);
    const {
        Title= "",
        IsDeleted= 0
    } = dorm;

    const id = generateDormId();
    const newDorm = {
      id,
      Title,
      IsDeleted
    };
    dormTableMock.push(newDorm);
    return [200, { dorm: newDorm }];
  });

  mock.onPost("api/dorms/find").reply(config => {
    const mockUtils = new MockUtils();
    const { queryParams } = JSON.parse(config.data);
    const filteredUni = mockUtils.baseFilter(dormTableMock, queryParams);
    return [200, filteredUni];
  });

  mock.onPost("api/dorms/deleteObjects").reply(config => {
    const { ids } = JSON.parse(config.data);
    ids.forEach(id => {
      const index = dormTableMock.findIndex(el => el.id === id);
      if (index > -1) {
        dormTableMock.splice(index, 1);
      }
    });
    return [200];
  });

  mock.onPost("api/dorms/updateStatusForUni").reply(config => {
    const { ids, status } = JSON.parse(config.data);
    dormTableMock.forEach(el => {
      if (ids.findIndex(id => id === el.id) > -1) {
        el.status = status;
      }
    });
    return [200];
  });

  mock.onGet(/api\/dorms\/\d+/).reply(config => {
    const id = config.url.match(/api\/dorms\/(\d+)/)[1];
    const dorm = dormTableMock.find(el => el.id === +id);
    if (!dorm) {
      return [400];
    }

    return [200, dorm];
  });

  mock.onPut(/api\/dorms\/\d+/).reply(config => {
    const id = config.url.match(/api\/dorms\/(\d+)/)[1];
    const { dorm } = JSON.parse(config.data);
    const index = dormTableMock.findIndex(el => el.id === +id);
    if (!index) {
      return [400];
    }

    dormTableMock[index] = { ...dorm };
    return [200];
  });

  mock.onDelete(/api\/dorms\/\d+/).reply(config => {
    const id = config.url.match(/api\/dorms\/(\d+)/)[1];
    const index = dormTableMock.findIndex(el => el.id === +id);
    dormTableMock.splice(index, 1);
    if (!index === -1) {
      return [400];
    }

    return [200];
  });
}

function generateDormId() {
  const ids = dormTableMock.map(el => el.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
}