class Resource {
  constructor() {
    this.apiInstance = null;
  }

  setApiInstance(apiInstance) {
    this.apiInstance = apiInstance;
  }

  doDelete(url) {
    const { apiInstance } = this;

    return apiInstance.fetcher({ method: 'DELETE', url })
  }

  doGet(url) {
    return this.apiInstance.fetcher({ url });
  }

  doPatch(url, data) {
    const { apiInstance } = this;

    return apiInstance.fetcher({ method: 'PATCH', url, data });
  }

  doPost(url, data) {
    const { apiInstance } = this;

    return apiInstance.fetcher({ method: 'POST', url, data });
  }
}

export default Resource;
