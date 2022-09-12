export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameSelector = document.querySelector(nameSelector);
    this._jobSelector = document.querySelector(jobSelector);
  }
//get user info object
  getUserInfo() {
    this._profileValues = {};
    this._profileValues.name = this._nameSelector.textContent;
    this._profileValues.job = this._jobSelector.textContent;

    return this._profileValues;
  }
// update user info
  setUserInfo(data) {
    this._nameSelector.textContent = data['field-name'];
    this._jobSelector.textContent = data['field-job'];
  }
}