export class UserInfo {
    constructor(nameSelector, jobSelector, avatar) {
        this._nameElement = document.querySelector(nameSelector);
        this._jobElement = document.querySelector(jobSelector);
        this._avatarElement = document.querySelector(avatar);
    }

    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            job: this._jobElement.textContent,
        }
    }

    setUserInfo(data) {
        this._jobElement.textContent = data.job;
        this._nameElement.textContent = data.name;
    }
    setUserAvatar(values) {
        this._avatarElement.src = values['avatar-link'];
    }
}