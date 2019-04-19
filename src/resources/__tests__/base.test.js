import Resource from '../base';

describe('setApiInstance', () => {
  test('should change apiInstance prop', () => {
    const resource = new Resource({});
    const apiInstance = { fetcher: () => {} };

    expect(resource.apiInstance).toEqual(null);

    resource.setApiInstance(apiInstance);

    expect(resource.apiInstance).toEqual(apiInstance);
  });
});
