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

    return apiInstance.fetcher({ url }).then(({ data }) => ({ payload: data }));
  }

  query(query) {
    const { apiInstance, endpoint, serializer } = this;
    const { queryParamsSerializer } = serializer;
    const queryParams = queryParamsSerializer.serialize(query);
    const queryParamsStr = decodeURIComponent(queryParams.toString());
    const url = `${endpoint}${addParams(queryParamsStr)}`;

    return apiInstance.fetcher({ url }).then(({ data }) => data);
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
      })
      .then(({ data }) => data);
  }

  create(attributes) {
    const { apiInstance, endpoint } = this;

    return apiInstance
      .fetcher({
        method: 'POST',
        url: endpoint,
        data: this.buildResourceRequestBody(attributes),
      })
      .then(({ data }) => ({ payload: data }));
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
      .then(({ data }) => ({ payload: data }));
  }

  buildResourceRequestBody(attributes) {
    const { resourceName, serializer } = this;
    const { attributesSerializer } = serializer;
    const serializedAttributes = Array.isArray(attributes)
      ? attributes.map(attributesSerializer.serialize)
      : attributesSerializer.serialize(attributes);

    return {
      [resourceName]: serializedAttributes,
    };
  }

  getResourceItems(response) {
    const { resourceName } = this;

    return response[resourceName];
  }
}

export default CRUDResource;
