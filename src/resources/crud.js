const addParams = string => string ? `?${string}` : string;

class CRUDResource {
  constructor({ endpoint, httpAdapter, resourceName, serializer }) {
    this.endpoint = endpoint;
    this.httpAdapter = httpAdapter;
    this.resourceName = resourceName;
    this.serializer = serializer;
  }

  findById(id, options = {}) {
    const { endpoint, httpAdapter } = this;
    const { include } = options;
    const params = new URLSearchParams();

    if (include) {
      params.set('include', include);
    }

    const url = `${endpoint}/${id}${addParams(params.toString())}`;

    return httpAdapter.doGet(url).then(responseJson => ({ payload: responseJson }));
  }

  query(query) {
    const { endpoint, httpAdapter, serializer } = this;
    const queryParams = serializer.serialize(query);
    const queryParamsStr = decodeURIComponent(queryParams.toString());
    const url = `${endpoint}${addParams(queryParamsStr)}`;

    return httpAdapter.doGet(url);
  }

  update(id, attributes) {
    return this.bulkUpdate([{ id, ...attributes }]);
  }

  bulkUpdate(items) {
    const { endpoint, httpAdapter } = this;
    const body = this.buildResourceRequestBody(items);

    return httpAdapter.doPatch(endpoint, body);
  }

  create(attributes) {
    const { endpoint, httpAdapter } = this;
    const body = this.buildResourceRequestBody(attributes);

    return httpAdapter.doPost(endpoint, body).then(responseJson => ({ payload: responseJson }));
  }

  bulkCreate(...args) {
    return this.create(...args);
  }

  delete(id) {
    const { endpoint, httpAdapter } = this;
    const url = `${endpoint}/${id}`;

    return httpAdapter.doDelete(url)
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
