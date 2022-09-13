export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
  }
//get user info object
  getUserInfo() {
    this._profileValues = {};
    this._profileValues.name = this._name.textContent;
    this._profileValues.job = this._job.textContent;

    return this._profileValues;
  }
// update user info
  setUserInfo(data) {
    this._name.textContent = data['field-name'];
    this._job.textContent = data['field-job'];
  }
}