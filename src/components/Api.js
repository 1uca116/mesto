export class Api {
    constructor(baseUrl, token, groupId) {
        this._baseUrl = baseUrl
        this._token = token
        this._groupId = groupId
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/v1/${this._groupId}/cards`,{
            headers: {
                authorization: this._token
            }
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return new Promise.reject(`Ошибка: ${res.status}`);
        }).catch(e => console.log(e));
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/v1/${this._groupId}/users/me`,{
            headers: {
                authorization: this._token
            }
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return new Promise.reject(`Ошибка: ${res.status}`);
        }).catch(e => console.log(e));
    }

    editUserInfo(name, about) {
        return fetch(`${this._baseUrl}/v1/${this._groupId}/users/me`,{
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: about,

            })
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return new Promise.reject(`Ошибка: ${res.status}`);
        }).catch(e => console.log(e));
    }

    addCard(name, link) {
        return fetch(`${this._baseUrl}/v1/${this._groupId}/cards`,{
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link,

            })
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return new Promise.reject(`Ошибка: ${res.status}`);
        }).catch(e => console.log(e));
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/v1/${this._groupId}/cards/${cardId}`,{
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return new Promise.reject(`Ошибка: ${res.status}`);
        }).catch(e => console.log(e));
    }

    likeCard(cardId) {
        return fetch(`${this._baseUrl}/v1/${this._groupId}/cards/likes/${cardId}`,{
            method: 'PUT',
            headers: {
                authorization: this._token
            }
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return new Promise.reject(`Ошибка: ${res.status}`);
        }).catch(e => console.log(e));
    }

    dislikeCard(cardId) {
        return fetch(`${this._baseUrl}/v1/${this._groupId}/cards/likes/${cardId}`,{
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return new Promise.reject(`Ошибка: ${res.status}`);
        }).catch(e => console.log(e));
    }

    updateAvatar(avatar) {
        return fetch(`${this._baseUrl}/v1/${this._groupId}/users/me/avatar`,{
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatar,
            })
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return new Promise.reject(`Ошибка: ${res.status}`);
        }).catch(e => console.log(e));
    }
}
