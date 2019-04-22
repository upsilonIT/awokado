import Resource from "../base";

const queryParamsString = "a=1&b=2";
const querySerializer = {
  serialize: () => queryParamsString
};
const emptySerializer = {
  serialize: () => ""
};

describe("findById", () => {
  test("should delegate call to fetcher", () => {
    const id = "123";
    const endpoint = "/res";
    const payload = { items: [] };
    const doGet = jest.fn().mockResolvedValue(payload);
    const httpAdapter = { doGet };
    const resource = new Resource({ endpoint, httpAdapter, querySerializer });

    return resource.findById(id).then(resResponse => {
      expect(doGet).toHaveBeenCalledWith(`${endpoint}/${id}`);
      expect(resResponse).toEqual({ payload });
    });
  });

  test("should delegate call to fetcher with include parameter", () => {
    const id = "123";
    const options = { include: "brands" };
    const endpoint = "/res";
    const payload = { items: [] };
    const doGet = jest.fn().mockResolvedValue(payload);
    const httpAdapter = { doGet };
    const resource = new Resource({ endpoint, httpAdapter, querySerializer });

    return resource.findById(id, options).then(resResponse => {
      expect(doGet).toHaveBeenCalledWith(`${endpoint}/${id}?include=brands`);
      expect(resResponse).toEqual({ payload });
    });
  });
});

describe("query", () => {
  test("should delegate call to fetcher", () => {
    const queryObject = { name: "123" };
    const endpoint = "/res";
    const payload = { payload: "1" };
    const doGet = jest.fn().mockResolvedValue(payload);
    const httpAdapter = { doGet };
    const resource = new Resource({ endpoint, httpAdapter, querySerializer });

    return resource.query(queryObject).then(resResponse => {
      expect(doGet).toHaveBeenCalledWith(`${endpoint}?${queryParamsString}`);
      expect(resResponse).toEqual(payload);
    });
  });

  test("should call fetcher without param", () => {
    const queryObject = { name: "123" };
    const endpoint = "/res";
    const payload = { payload: "1" };
    const doGet = jest.fn().mockResolvedValue(payload);
    const httpAdapter = { doGet };
    const resource = new Resource({
      endpoint,
      httpAdapter,
      querySerializer: emptySerializer
    });

    return resource.query(queryObject).then(resResponse => {
      expect(doGet).toHaveBeenCalledWith(`${endpoint}`);
      expect(resResponse).toEqual(payload);
    });
  });
});

describe("update", () => {
  test("should delegate call to fetcher", async () => {
    const endpoint = "/point";
    const resourceName = "name";
    const id = "1";
    const attrs = { name: "123" };
    const payload = { any: "data" };
    const doPatch = jest.fn().mockResolvedValue(payload);
    const httpAdapter = { doPatch };
    const resource = new Resource({
      endpoint,
      httpAdapter,
      resourceName,
      querySerializer
    });

    expect(doPatch).toHaveBeenCalledTimes(0);

    const result = await resource.update(id, attrs);

    expect(doPatch).toHaveBeenCalledTimes(1);
    expect(doPatch).toHaveBeenCalledWith(endpoint, {
      [resourceName]: [{ id, ...attrs }]
    });
    expect(result).toEqual(payload);
  });
});

describe("bulkUpdate", () => {
  test("should delegate call to fetcher", async () => {
    const endpoint = "/point";
    const resourceName = "name";
    const items = [{ id: 1, name: "John" }, { id: 2, name: "Andrew" }];
    const payload = { any: "data" };
    const doPatch = jest.fn().mockResolvedValue(payload);
    const httpAdapter = { doPatch };
    const resource = new Resource({
      endpoint,
      httpAdapter,
      resourceName,
      querySerializer
    });

    expect(doPatch).toHaveBeenCalledTimes(0);

    const result = await resource.bulkUpdate(items);

    expect(doPatch).toHaveBeenCalledTimes(1);
    expect(doPatch).toHaveBeenCalledWith(endpoint, {
      [resourceName]: items
    });
    expect(result).toEqual(payload);
  });
});

describe("delete", () => {
  test("should delegate call to fetcher", async () => {
    const endpoint = "/point";
    const resourceName = "name";
    const id = "1";
    const payload = { any: "data" };
    const doDelete = jest.fn().mockResolvedValue(payload);
    const httpAdapter = { doDelete };
    const resource = new Resource({
      endpoint,
      httpAdapter,
      resourceName,
      querySerializer
    });

    expect(doDelete).toHaveBeenCalledTimes(0);

    const result = await resource.delete(id);

    expect(doDelete).toHaveBeenCalledTimes(1);
    expect(doDelete).toHaveBeenCalledWith(`${endpoint}/${id}`);
    expect(result).toEqual({ payload });
  });
});

describe("getResourceItems", () => {
  test("should get resource items from response", () => {
    const endpoint = "/point";
    const resourceName = "resource";
    const resource = new Resource({ endpoint, resourceName, querySerializer });
    const response = {
      resource: [1, 2, 3],
      anotherResource: [4, 5]
    };

    expect(resource.getResourceItems(response)).toEqual([1, 2, 3]);
  });
});
