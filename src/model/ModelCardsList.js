import { makeAutoObservable, observable, action, runInAction, toJS } from 'mobx'

class ModelCardList {
  models = []
  card = {}
  state = 'loading'
  constructor(modelService) {
    makeAutoObservable(this, {
      cards: observable,
      card: observable,
      getAllCarCard: action,
      getCard: action,
      deleteCard: action,
      getCardsBySearchRange: action,
      updateCard: action
    })
    this.modelService = modelService
  }

  async getCard(id) {
    try {
      this.state = 'loading'
      const { carCard } = await this.modelService.getCard(id)
      runInAction(() => {
        this.card = carCard
        this.state = 'done'
      })
    } catch (error) {
      console.log(error)
    }
  }

  async deleteCard(id) {
    try {
      this.state = 'loading'
      await this.modelService.deleteCard(id)
      const { carCards } = await this.modelService.getAllCarCard()
      runInAction(() => {
        this.carCards = carCards
        this.state = 'done'
      })
      this.state = 'done'
    } catch (error) {
      console.log(error)
    }
  }

  async getUserModelNames() {
    try {
      this.state = 'loading'
      const { modelNames } = await this.modelService.getUserModelNames()
      runInAction(() => {
        this.models = modelNames
        this.state = 'done'
      })
    } catch (error) {
      console.log(error)
    }
  }

  async updateCard() {
    try {
      this.state = 'loading'
      const { carCard } = await this.modelService.updateCard(toJS(this.card))
      runInAction(() => {
        this.card = carCard
        this.state = 'done'
      })
    } catch (error) {
      console.log(error)
    }
  }

  changeValueParts = (tree, value) => {
    const index = this.card.parts.findIndex((el) => el.tree === tree)
    this.card.parts[index].partCount = value
  }

  deletePart = (tree) => {
    console.log(tree)
    this.card.parts = this.card.parts.filter((item) => item.tree !== tree)
  }
}

export default ModelCardList
