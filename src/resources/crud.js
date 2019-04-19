import Resource from './base';

const addParams = string => string ? `?${string}` : string;

class CRUDResource extends Resource {
  constructor({ resourceName, endpoint, serializer }) {
    super();

    this.resourceName = resourceName;
    this.endpoint = endpoint;
    this.serializer = serializer;
  }

  findById(id, options = {}) {
    const { apiInstance, endpoint } = this;
    const { include } = options;
    const params = new URLSearchParams();

    if (include) {
      params.set('include', include);
    }

    const url = `${endpoint}/${id}${addParams(params.toString())}`;

    return apiInstance.fetcher({ url }).then(responseJson => ({ payload: responseJson }));
  }

  query(query) {
    const { apiInstance, endpoint, serializer } = this;
    const queryParams = serializer.serialize(query);
    const queryParamsStr = decodeURIComponent(queryParams.toString());
    const url = `${endpoint}${addParams(queryParamsStr)}`;

    return apiInstance.fetcher({ url });
  }

  update(id, attributes) {
    return this.bulkUpdate([{ id, ...attributes }]);
  }

  bulkUpdate(items) {
    const { apiInstance, endpoint } = this;

    return apiInstance
      .fetcher({
        method: 'PATCH',
        url: endpoint,
        data: this.buildResourceRequestBody(items),
      });
  }

  create(attributes) {
    const { apiInstance, endpoint } = this;

    return apiInstance
      .fetcher({
        method: 'POST',
        url: endpoint,
        data: this.buildResourceRequestBody(attributes),
      })
      .then(responseJson => ({ payload: responseJson }));
  }

  bulkCreate(...args) {
    return this.create(...args);
  }

  delete(id) {
    const { apiInstance, endpoint } = this;

    return apiInstance
      .fetcher({
        method: 'DELETE',
        url: `${endpoint}/${id}`,
      })
      .then(responseJson => ({ payload: responseJson }));
  }

  buildResourceRequestBody(attributes) {
    const { resourceName } = this;

    return { [resourceName]: attributes };
  }

  getResourceItems(response) {
    const { resourceName } = this;

    return response[resourceName];
  }
}

export default CRUDResource;
