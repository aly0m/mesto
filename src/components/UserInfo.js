export default class UserInfo {
  constructor({ nameContainer, jobContainer }) {
    this._nameContainer = nameContainer;
    this._jobContainer = jobContainer;
  }
//get user info object
  getUserInfo() {
    this._profileValues = {};
    this._profileValues.name = this._nameContainer.textContent;
    this._profileValues.job = this._jobContainer.textContent;

    return this._profileValues;
  }
// update user info
  setUserInfo(data) {
    this._nameContainer.textContent = data['field-name'];
    this._jobContainer.textContent = data['field-job'];
  }
}