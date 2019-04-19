import CRUDResource from '../crud';

const queryParamsString = 'a=1&b=2';
const serializer = {
  serialize: () => queryParamsString,
};
const emptySerializer = {
  serialize: () => '',
};

describe('findById', () => {
  test('should delegate call to fetcher', () => {
    const id = '123';
    const endpoint = '/res';
    const payload = { items: [] };
    const resource = new CRUDResource({ endpoint, serializer });

    const fetcher = jest.fn().mockResolvedValue(payload);
    const apiInstance = { fetcher };

    resource.setApiInstance(apiInstance);

    return resource.findById(id).then(resResponse => {
      expect(fetcher).toHaveBeenCalledWith({
        url: `${endpoint}/${id}`,
      });
      expect(resResponse).toEqual({ payload });
    });
  });

  test('should delegate call to fetcher with include parameter', () => {
    const id = '123';
    const options = { include: 'brands' };
    const endpoint = '/res';
    const payload = { items: [] };
    const resource = new CRUDResource({ endpoint, serializer });

    const fetcher = jest.fn().mockResolvedValue(payload);
    const apiInstance = { fetcher };

    resource.setApiInstance(apiInstance);

    return resource.findById(id, options).then(resResponse => {
      expect(fetcher).toHaveBeenCalledWith({
        url: `${endpoint}/${id}?include=brands`,
      });
      expect(resResponse).toEqual({ payload });
    });
  });
});

describe('query', () => {
  test('should delegate call to fetcher', () => {
    const queryObject = { name: '123' };
    const endpoint = '/res';
    const payload = { payload: '1' };
    const resource = new CRUDResource({ endpoint, serializer });

    const fetcher = jest.fn().mockResolvedValue(payload);
    const apiInstance = { fetcher };

    resource.setApiInstance(apiInstance);

    return resource.query(queryObject).then(resResponse => {
      expect(fetcher).toHaveBeenCalledWith({
        url: `${endpoint}?${queryParamsString}`,
      });
      expect(resResponse).toEqual(payload);
    });
  });

  test('should call fetcher without param', () => {
    const queryObject = { name: '123' };
    const endpoint = '/res';
    const payload = { payload: '1' };
    const resource = new CRUDResource({
      endpoint,
      serializer: emptySerializer,
    });

    const fetcher = jest.fn().mockResolvedValue(payload);
    const apiInstance = { fetcher };

    resource.setApiInstance(apiInstance);

    return resource.query(queryObject).then(resResponse => {
      expect(fetcher).toHaveBeenCalledWith({
        url: `${endpoint}`,
      });
      expect(resResponse).toEqual(payload);
    });
  });
});

describe('update', () => {
  test('should delegate call to fetcher', async () => {
    const endpoint = '/point';
    const resourceName = 'name';
    const resource = new CRUDResource({ endpoint, resourceName, serializer });
    const id = '1';
    const attrs = { name: '123' };
    const payload = { any: 'data' };
    const fetcher = jest.fn().mockResolvedValue(payload);
    const apiInstance = { fetcher };

    resource.setApiInstance(apiInstance);
    expect(fetcher).toHaveBeenCalledTimes(0);

    const result = await resource.update(id, attrs);

    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(fetcher).toHaveBeenCalledWith(
      expect.objectContaining({
        url: endpoint,
        data: {
          [resourceName]: [{ id, ...attrs }],
        },
      }),
    );
    expect(result).toEqual(payload);
  });
});

describe('bulkUpdate', () => {
  test('should delegate call to fetcher', async () => {
    const endpoint = '/point';
    const resourceName = 'name';
    const resource = new CRUDResource({ endpoint, resourceName, serializer });
    const items = [{ id: 1, name: 'John' }, { id: 2, name: 'Andrew' }];
    const payload = { any: 'data' };
    const fetcher = jest.fn().mockResolvedValue(payload);
    const apiInstance = { fetcher };

    resource.setApiInstance(apiInstance);
    expect(fetcher).toHaveBeenCalledTimes(0);

    const result = await resource.bulkUpdate(items);

    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(fetcher).toHaveBeenCalledWith(
      expect.objectContaining({
        url: endpoint,
        data: {
          [resourceName]: items,
        },
      }),
    );
    expect(result).toEqual(payload);
  });
});

describe('delete', () => {
  test('should delegate call to fetcher', async () => {
    const endpoint = '/point';
    const resourceName = 'name';
    const resource = new CRUDResource({ endpoint, resourceName, serializer });
    const id = '1';
    const payload = { any: 'data' };
    const fetcher = jest.fn().mockResolvedValue(payload);
    const apiInstance = { fetcher };

    resource.setApiInstance(apiInstance);
    expect(fetcher).toHaveBeenCalledTimes(0);

    const result = await resource.delete(id);

    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(fetcher).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'DELETE',
        url: `${endpoint}/${id}`,
      }),
    );
    expect(result).toEqual({ payload });
  });
});

describe('getResourceItems', () => {
  test('should get resource items from response', () => {
    const endpoint = '/point';
    const resourceName = 'resource';
    const resource = new CRUDResource({ endpoint, resourceName, serializer });
    const response = {
      resource: [1, 2, 3],
      anotherResource: [4, 5],
    };

    expect(resource.getResourceItems(response)).toEqual([1, 2, 3]);
  });
});
