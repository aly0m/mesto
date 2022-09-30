export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }
//get user info object
  getUserInfo() {
    this._profileValues = {};
    this._profileValues.name = this._name.textContent;
    this._profileValues.job = this._job.textContent;
    this._profileValues.avatar = this._avatar.src;
    return this._profileValues;
  }
// update user info
  setUserInfo(data) {
    if (data.name) {
      this._name.textContent = data.name;
    }
    if (data.about) {
      this._job.textContent = data.about;
    }
    if (data.avatar) {
      this._avatar.src = data.avatar;
    }
  }
}