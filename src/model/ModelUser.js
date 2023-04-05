import { makeAutoObservable, observable, action, runInAction } from 'mobx'

class ModelUser {
  auth = {}
  user = {}
  state = 'done'
  constructor(userService) {
    makeAutoObservable(this, {
      user: observable,
      login: action
    })
    this.userService = userService
  }

  async register(user) {
    try {
      const { isSuccessful } = await this.userService.register(user)
      runInAction(() => {
        this.auth = isSuccessful
        this.state = 'done'
      })
    } catch (error) {
      this.state = 'error'
    }
  }

  async login(user) {
    try {
      this.state = 'loading'
      const { jwt } = await this.userService.login(user)
      runInAction(() => {
        this.user = jwt
        this.state = 'done'
      })
      return jwt
    } catch (error) {
      this.state = 'error'
    }
  }
}

export default ModelUser
