import blockTableMock from "./blockTableMock";
import MockUtils from "./mock.utils";

export default function mockBlock(mock) {
  mock.onPost("api/blocks").reply(({ data }) => {
    const { block } = JSON.parse(data);
    const {
        Title= "",
        DormId=0,
        Dorm= "",
        IsDeleted= 0
    } = block;

    const id = generateBlockId();
    const newBlock = {
      id,
      Title,
      DormId,
      Dorm,
      IsDeleted
    };
    blockTableMock.push(newBlock);
    return [200, { block: newBlock }];
  });

  mock.onPost("api/blocks/find").reply(config => {
    const mockUtils = new MockUtils();
    const { queryParams } = JSON.parse(config.data);
    const filteredUni = mockUtils.baseFilter(blockTableMock, queryParams);
    return [200, filteredUni];
  });

  mock.onPost("api/blocks/deleteObjects").reply(config => {
    const { ids } = JSON.parse(config.data);
    ids.forEach(id => {
      const index = blockTableMock.findIndex(el => el.id === id);
      if (index > -1) {
        blockTableMock.splice(index, 1);
      }
    });
    return [200];
  });

  mock.onPost("api/blocks/updateStatusForUni").reply(config => {
    const { ids, status } = JSON.parse(config.data);
    blockTableMock.forEach(el => {
      if (ids.findIndex(id => id === el.id) > -1) {
        el.status = status;
      }
    });
    return [200];
  });

  mock.onGet(/api\/blocks\/\d+/).reply(config => {
    const id = config.url.match(/api\/blocks\/(\d+)/)[1];
    const block = blockTableMock.find(el => el.id === +id);
    if (!block) {
      return [400];
    }

    return [200, block];
  });

  mock.onPut(/api\/blocks\/\d+/).reply(config => {
    const id = config.url.match(/api\/blocks\/(\d+)/)[1];
    const { block } = JSON.parse(config.data);
    const index = blockTableMock.findIndex(el => el.id === +id);
    if (!index) {
      return [400];
    }

    blockTableMock[index] = { ...block };
    return [200];
  });

  mock.onDelete(/api\/blocks\/\d+/).reply(config => {
    const id = config.url.match(/api\/blocks\/(\d+)/)[1];
    const index = blockTableMock.findIndex(el => el.id === +id);
    blockTableMock.splice(index, 1);
    if (!index === -1) {
      return [400];
    }

    return [200];
  });
}

function generateBlockId() {
  const ids = blockTableMock.map(el => el.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
}