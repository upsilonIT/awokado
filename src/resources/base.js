const addParams = string => (string ? `?${string}` : string);

class Resource {
  constructor({ endpoint, httpAdapter, resourceName, querySerializer }) {
    this.endpoint = endpoint;
    this.httpAdapter = httpAdapter;
    this.resourceName = resourceName;
    this.querySerializer = querySerializer;
  }

  findById(id, options = {}) {
    const { endpoint, httpAdapter } = this;
    const { include } = options;
    const params = new URLSearchParams();

    if (include) {
      params.set("include", include);
    }
    const queryParamsStr = decodeURIComponent(params.toString());
    const url = `${endpoint}/${id}${addParams(queryParamsStr)}`;

    return httpAdapter
      .doGet(url)
      .then(responseJson => ({ payload: responseJson }));
  }

  query(query) {
    const { endpoint, httpAdapter, querySerializer } = this;
    const queryParams = querySerializer.serialize(query);
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

    return httpAdapter
      .doPost(endpoint, body)
      .then(responseJson => ({ payload: responseJson }));
  }

  bulkCreate(...args) {
    return this.create(...args);
  }

  delete(id) {
    const { endpoint, httpAdapter } = this;
    const url = `${endpoint}/${id}`;

    return httpAdapter
      .doDelete(url)
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

export default Resource;
