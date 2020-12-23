import termTableMock from "./termTableMock";
import MockUtils from "./mock.utils";

export default function mockProducts(mock) {
  mock.onPost("api/products").reply(({ data }) => {
    const { product } = JSON.parse(data);
    const {
      model = "",
      manufacture = "",
      modelYear = 2000,
      mileage = 0,
      description = "",
      color = "Black",
      price = 1000,
      condition = 0,
      status = 0,
      VINCode = ""
    } = product;

    const id = generateProductId();
    const newProduct = {
      id,
      model,
      manufacture,
      modelYear,
      mileage,
      description,
      color,
      price,
      condition,
      status,
      VINCode
    };
    termTableMock.push(newProduct);
    return [200, { product: newProduct }];
  });

  mock.onPost("api/products/find").reply(config => {
    const mockUtils = new MockUtils();
    const { queryParams } = JSON.parse(config.data);
    const filteredProducts = mockUtils.baseFilter(termTableMock, queryParams);
    return [200, filteredProducts];
  });

  mock.onPost("api/products/deleteObjects").reply(config => {
    const { ids } = JSON.parse(config.data);
    ids.forEach(id => {
      const index = termTableMock.findIndex(el => el.id === id);
      if (index > -1) {
        termTableMock.splice(index, 1);
      }
    });
    return [200];
  });

  mock.onPost("api/products/updateStatusForProducts").reply(config => {
    const { ids, status } = JSON.parse(config.data);
    termTableMock.forEach(el => {
      if (ids.findIndex(id => id === el.id) > -1) {
        el.status = status;
      }
    });
    return [200];
  });

  mock.onGet(/api\/products\/\d+/).reply(config => {
    const id = config.url.match(/api\/products\/(\d+)/)[1];
    const product = termTableMock.find(el => el.id === +id);
    if (!product) {
      return [400];
    }

    return [200, product];
  });

  mock.onPut(/api\/products\/\d+/).reply(config => {
    const id = config.url.match(/api\/products\/(\d+)/)[1];
    const { product } = JSON.parse(config.data);
    const index = termTableMock.findIndex(el => el.id === +id);
    if (!index) {
      return [400];
    }

    termTableMock[index] = { ...product };
    return [200];
  });

  mock.onDelete(/api\/products\/\d+/).reply(config => {
    const id = config.url.match(/api\/products\/(\d+)/)[1];
    const index = termTableMock.findIndex(el => el.id === +id);
    termTableMock.splice(index, 1);
    if (!index === -1) {
      return [400];
    }

    return [200];
  });
}

function generateProductId() {
  const ids = termTableMock.map(el => el.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
}


// export default function mockTerms(mock) {
//   mock.onPost("api/terms").reply(({ data }) => {
//     const { term } = JSON.parse(data);
//     const {
//       EducationYearId = 0,
//       EducationHalfYearId = 0,
//       TermTitle = "",
//       TermDateStart = "",
//       TermDateEnd = "",
//       IsDeleted = 0
//     } = term;

//     const id = generateTermId();
//     const newTerm = {
//       id,
//       EducationYearId,
//       EducationHalfYearId,
//       TermTitle,
//       TermDateStart,
//       TermDateEnd,
//       IsDeleted
//     };
//     termTableMock.push(newTerm);
//     return [200, { term: newTerm }];
//   });

//   mock.onPost("api/terms/find").reply(config => {
//     const mockUtils = new MockUtils();
//     const { queryParams } = JSON.parse(config.data);
//     const filteredTerms = mockUtils.baseFilter(termTableMock, queryParams);
//     return [200, filteredTerms];
//   });

//   mock.onPost("api/terms/deleteTerms").reply(config => {
//     const { ids } = JSON.parse(config.data);
//     ids.forEach(id => {
//       const index = termTableMock.findIndex(el => el.id === id);
//       if (index > -1) {
//         termTableMock.splice(index, 1);
//       }
//     });
//     return [200];
//   });

//   mock.onPost("api/terms/updateStatusForTerms").reply(config => {
//     const { ids, status } = JSON.parse(config.data);
//     termTableMock.forEach(el => {
//       if (ids.findIndex(id => id === el.id) > -1) {
//         el.status = status;
//       }
//     });
//     return [200];
//   });

//   mock.onGet(/api\/terms\/\d+/).reply(config => {
//     const id = config.url.match(/api\/terms\/(\d+)/)[1];
//     const term = termTableMock.find(el => el.id === +id);
//     if (!term) {
//       return [400];
//     }

//     return [200, term];
//   });

//   mock.onPut(/api\/terms\/\d+/).reply(config => {
//     const id = config.url.match(/api\/terms\/(\d+)/)[1];
//     const { term } = JSON.parse(config.data);
//     const index = termTableMock.findIndex(el => el.id === +id);
//     if (!index) {
//       return [400];
//     }

//     termTableMock[index] = { ...term };
//     return [200];
//   });

//   mock.onDelete(/api\/terms\/\d+/).reply(config => {
//     const id = config.url.match(/api\/terms\/(\d+)/)[1];
//     const index = termTableMock.findIndex(el => el.id === +id);
//     termTableMock.splice(index, 1);
//     if (!index === -1) {
//       return [400];
//     }

//     return [200];
//   });
// }

// function generateTermId() {
//   const ids = termTableMock.map(el => el.id);
//   const maxId = Math.max(...ids);
//   return maxId + 1;
// }