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
    const { endpoint } = this;
    const { include } = options;
    const params = new URLSearchParams();

    if (include) {
      params.set('include', include);
    }

    const url = `${endpoint}/${id}${addParams(params.toString())}`;

    return this.doGet(url).then(responseJson => ({ payload: responseJson }));
  }

  query(query) {
    const { endpoint, serializer } = this;
    const queryParams = serializer.serialize(query);
    const queryParamsStr = decodeURIComponent(queryParams.toString());
    const url = `${endpoint}${addParams(queryParamsStr)}`;

    return this.doGet(url);
  }

  update(id, attributes) {
    return this.bulkUpdate([{ id, ...attributes }]);
  }

  bulkUpdate(items) {
    const { endpoint } = this;
    const body = this.buildResourceRequestBody(items);

    return this.doPatch(endpoint, body);
  }

  create(attributes) {
    const { endpoint } = this;
    const body = this.buildResourceRequestBody(attributes);

    return this.doPost(endpoint, body).then(responseJson => ({ payload: responseJson }));
  }

  bulkCreate(...args) {
    return this.create(...args);
  }

  delete(id) {
    const { endpoint } = this;
    const url = `${endpoint}/${id}`;

    return this.doDelete(url)
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
