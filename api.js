class Api {
    constructor(uri) {
        this.baseUrl = 'https://kodilla.com/pl/bootcamp-api';
        this.uri = uri;
        this.url = this.baseUrl + uri;
    }
    fetch(success) {
        this.request('GET', null, success);
    }
    create(data, success) {
        this.request('POST', data, success);
    }
    remove(success) {
        this.request('DELETE', null, success);
    }
    update(data, success) {
        this.request('PUT', data, success);
    }
    request(method, data, success) {
        let req = $.ajax({
            headers: {
                'X-Client-Id': '1935',
                'X-Auth-Token': '66408993e1b309378d6d525cf413a2ed'
            },
            url: this.url,
            method: method,
            data: data,
        });

        if (typeof success === 'function') {
            req.done(success);
        }
    }
}

