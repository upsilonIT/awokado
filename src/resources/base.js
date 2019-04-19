class Resource {
  constructor() {
    this.apiInstance = null;
  }

  setApiInstance(apiInstance) {
    this.apiInstance = apiInstance;
  }

  doRequest(options) {
    const { apiInstance } = this;

    return apiInstance.fetcher(options);
  }

  doDelete(url) {
    return this.doRequest({ method: 'DELETE', url })
  }

  doGet(url) {
    return this.doRequest({ url });
  }

  doPatch(url, data) {
    return this.doRequest({ method: 'PATCH', url, data });
  }

  doPost(url, data) {
    return this.doRequest({ method: 'POST', url, data });
  }
}

export default Resource;
