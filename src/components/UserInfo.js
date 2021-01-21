export class UserInfo {
    constructor(nameSelector, jobSelector, avatarSelector, id) {
        this._nameElement = document.querySelector(nameSelector);
        this._jobElement = document.querySelector(jobSelector);
        this._avatarElement = document.querySelector(avatarSelector);
        this._id = id;
    }

    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            job: this._jobElement.textContent,
            id: this._id
        }
    }

    setUserInfo(data) {
        this._jobElement.textContent = data.job;
        this._nameElement.textContent = data.name;
        this._id = data.id;
    }
    setUserAvatar(avatarLink) {
        console.log(this)
        this._avatarElement.src = avatarLink;
    }
}
