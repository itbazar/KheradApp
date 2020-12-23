import uniTableMock from "./uniTableMock";
import MockUtils from "./mock.utils";

export default function mockUni(mock) {
  mock.onPost("api/uni").reply(({ data }) => {
    const { uni } = JSON.parse(data);
    const {
        UniversityTitle= "",
        UniversityCode=0,
        Address= "",
        Tel= "",
        PostalCode= "",
        UsersActiveCount= "",
        Manager= "",
        ManagerTel= "",
        FoodManager= "",
        FoodManagerTel= " ",
        DormManager= " ",
        DormManagerTel= " ",
        SportManager= " ",
        SportManagerTel= " ",
        OfficialManager= "",
        OfficialManagerTel= " ",
        IsDeleted= 0
    } = uni;

    const id = generateUniId();
    const newUni = {
      id,
      UniversityTitle,
      UniversityCode,
      Address,
      Tel,
      PostalCode,
      UsersActiveCount,
      Manager,
      ManagerTel,
      FoodManager,
      FoodManagerTel,
      DormManager,
      DormManagerTel,
      SportManager,
      SportManagerTel,
      OfficialManager,
      OfficialManagerTel,
      IsDeleted
    };
    uniTableMock.push(newUni);
    return [200, { uni: newUni }];
  });

  mock.onPost("api/uni/find").reply(config => {
    const mockUtils = new MockUtils();
    const { queryParams } = JSON.parse(config.data);
    const filteredUni = mockUtils.baseFilter(uniTableMock, queryParams);
    return [200, filteredUni];
  });

  mock.onPost("api/uni/deleteObjects").reply(config => {
    const { ids } = JSON.parse(config.data);
    ids.forEach(id => {
      const index = uniTableMock.findIndex(el => el.id === id);
      if (index > -1) {
        uniTableMock.splice(index, 1);
      }
    });
    return [200];
  });

  mock.onPost("api/uni/updateStatusForUni").reply(config => {
    const { ids, status } = JSON.parse(config.data);
    uniTableMock.forEach(el => {
      if (ids.findIndex(id => id === el.id) > -1) {
        el.status = status;
      }
    });
    return [200];
  });

  mock.onGet(/api\/uni\/\d+/).reply(config => {
    const id = config.url.match(/api\/uni\/(\d+)/)[1];
    const uni = uniTableMock.find(el => el.id === +id);
    if (!uni) {
      return [400];
    }

    return [200, uni];
  });

  mock.onPut(/api\/uni\/\d+/).reply(config => {
    const id = config.url.match(/api\/uni\/(\d+)/)[1];
    const { uni } = JSON.parse(config.data);
    const index = uniTableMock.findIndex(el => el.id === +id);
    if (!index) {
      return [400];
    }

    uniTableMock[index] = { ...uni };
    return [200];
  });

  mock.onDelete(/api\/uni\/\d+/).reply(config => {
    const id = config.url.match(/api\/uni\/(\d+)/)[1];
    const index = uniTableMock.findIndex(el => el.id === +id);
    uniTableMock.splice(index, 1);
    if (!index === -1) {
      return [400];
    }

    return [200];
  });
}

function generateUniId() {
  const ids = uniTableMock.map(el => el.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
}