import ModelCar from './ModelCar'
import ModelServices from '../Services/ModelServices'
import UserServices from '../Services/UserServices,'
import ModelUser from './ModelUser'
import ModelCardList from './ModelCardsList'

const modelService = new ModelServices()
const userService = new UserServices()

export default class Model {
  constructor() {
    this.modelCar = new ModelCar(modelService)
    this.modelUser = new ModelUser(userService)
    this.modelCardList = new ModelCardList(modelService)
  }
}
