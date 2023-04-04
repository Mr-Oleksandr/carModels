import API from '../API.js'
class UserServices {
  async register(user) {
    const userData = { ...user }
    console.log(userData)
    try {
      const { data: isSuccessful } = await API.post('register', userData)
      return isSuccessful
    } catch (error) {
      console.log(error)
    }
  }

  async login(user) {
    const userData = { ...user }
    console.log(userData)
    try {
      const { data: jwt } = await API.post('login', userData)
      return jwt
    } catch (error) {
      console.log(error)
    }
  }
}

export default UserServices
