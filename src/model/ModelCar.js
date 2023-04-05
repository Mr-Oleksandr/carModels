import { makeAutoObservable, observable, action, runInAction } from 'mobx'

class ModelCar {
  modelName = []
  equipment = []
  engine = []
  complictationByEngine = []
  groups = []
  subGroups = []
  parts = []
  carCards = []
  minMaxFilter = []
  state = 'loading'
  constructor(modelService) {
    makeAutoObservable(this, {
      modelName: observable,
      equipment: observable,
      engine: observable,
      complictationByEngine: observable,
      groups: observable,
      subGroups: observable,
      parts: observable,
      carCards: observable,
      minMaxFilter: observable,
      getModelName: action,
      deleteCard: action
    })

    this.modelService = modelService
  }

  async getAllCarCard(params) {
    try {
      this.state = 'loading'
      const { carCards } = await this.modelService.getAllCarCard(params)
      const minValue = carCards.reduce((acc, value) => {
        acc[0] = acc[0] === undefined || value.mileage < acc[0] ? value.mileage : acc[0]
        acc[1] = acc[1] === undefined || value.mileage > acc[1] ? value.mileage : acc[1]
        return acc
      }, [])
      runInAction(() => {
        this.carCards = carCards
        this.minMaxFilter = minValue
        this.state = 'done'
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getCardsBySearch(queryParams) {
    try {
      this.state = 'loading'
      const { carCards } = await this.modelService.getCardsBySearch(queryParams)
      runInAction(() => {
        this.carCards = carCards
        this.state = 'done'
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getModelName() {
    try {
      this.state = 'loading'
      const { carModelNames } = await this.modelService.getModelName()
      runInAction(() => {
        this.modelName = carModelNames
        this.state = 'done'
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getModelConfiguration(queryParams) {
    try {
      const { carModels } = await this.modelService.getModelConfiguration(queryParams)
      runInAction(() => {
        this.equipment = carModels
        this.state = 'done'
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getModelEngine(queryParams) {
    try {
      const { engines } = await this.modelService.getModelEngine(queryParams)
      runInAction(() => {
        this.engine = engines
        this.state = 'done'
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getComplectationsByEngine(queryParams) {
    try {
      const { complectations } = await this.modelService.getComplectationsByEngine(queryParams)
      runInAction(() => {
        this.complictationByEngine = complectations
        this.state = 'done'
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getGroups(queryParams) {
    try {
      const { groups } = await this.modelService.getGroups(queryParams)
      runInAction(() => {
        this.groups = groups
        this.state = 'done'
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getSubGroups(queryParams) {
    try {
      const { subGroups } = await this.modelService.getSubGroups(queryParams)
      runInAction(() => {
        this.subGroups = subGroups
        this.state = 'done'
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getParts(queryParams) {
    try {
      const { parts } = await this.modelService.getParts(queryParams)
      runInAction(() => {
        this.parts = parts
        this.state = 'done'
      })
    } catch (error) {
      console.log(error)
    }
  }

  async createCarCard(data) {
    try {
      this.state = 'loading'
      const { carCard } = await this.modelService.createCarCard(data)
      const { carCards } = await this.modelService.getAllCarCard()
      const minValue = carCards.reduce((acc, value) => {
        acc[0] = acc[0] === undefined || value.mileage < acc[0] ? value.mileage : acc[0]
        acc[1] = acc[1] === undefined || value.mileage > acc[1] ? value.mileage : acc[1]
        return acc
      }, [])
      runInAction(() => {
        this.carCards.push(carCard)
        this.minMaxFilter = minValue
        this.state = 'done'
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getCardsBySearchRange(queryParams) {
    try {
      this.state = 'loading'
      const { carCards } = await this.modelService.getCardsBySearchRange(queryParams)
      runInAction(() => {
        this.carCards = carCards
        this.state = 'done'
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export default ModelCar
