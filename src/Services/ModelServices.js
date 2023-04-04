import API from '../API.js'
import qs from 'query-string'
class ModelServices {
  async getModelName() {
    try {
      const { data: carModelNames } = await API.get('ModelNames')
      return carModelNames
    } catch (error) {
      console.log(error)
    }
  }

  async getAllCarCard(queryParams) {
    const params = qs.stringify(queryParams)
    try {
      const { data: carCards } = await API.get(`getCards?${params}`)
      return carCards
    } catch (error) {
      console.log(error)
    }
  }

  async getModelConfiguration(queryParams) {
    const params = qs.stringify(queryParams)
    try {
      const { data: carModels } = await API.get(`Models?${params}`)
      return carModels
    } catch (error) {
      console.log(error)
    }
  }

  async getModelEngine(queryParams) {
    const params = qs.stringify(queryParams)
    try {
      const { data: engines } = await API.get(`Engines?${params}`)
      return engines
    } catch (error) {
      console.log(error)
    }
  }

  async getComplectationsByEngine(queryParams) {
    const params = qs.stringify(queryParams)
    try {
      const { data: complectations } = await API.get(`complectationsByEngine?${params}`)
      return complectations
    } catch (error) {
      console.log(error)
    }
  }

  async getGroups(queryParams) {
    const params = qs.stringify(queryParams)
    try {
      const { data: groups } = await API.get(`groups?${params}`)
      return groups
    } catch (error) {
      console.log(error)
    }
  }

  async getSubGroups(queryParams) {
    const params = qs.stringify(queryParams)
    try {
      const { data: subGroups } = await API.get(`subGroups?${params}`)
      return subGroups
    } catch (error) {
      console.log(error)
    }
  }

  async getParts(queryParams) {
    const params = qs.stringify(queryParams)
    try {
      const { data: parts } = await API.get(`parts?${params}`)
      return parts
    } catch (error) {
      console.log(error)
    }
  }

  async createCarCard({ modelName, mileage, dateRange, engineType, parts }) {
    try {
      this.state = 'loading'
      const { data: carCard } = await API.post('addCard', {
        modelName,
        mileage,
        dateRange,
        engineType,
        parts
      })
      this.state = 'done'
      return carCard
    } catch (error) {
      console.log(error)
    }
  }
  async deleteCard(id) {
    try {
      await API.delete('deleteCard', { data: { id: id } })
    } catch (error) {
      console.log(error)
    }
  }

  async getCardsBySearch(queryParams) {
    const params = qs.stringify(queryParams)
    try {
      const { data: carCards } = await API.get(`getCardsBySearch?${params}`)
      return carCards
    } catch (error) {
      console.log(error)
    }
  }

  async getCardsBySearchRange(queryParams) {
    const params = qs.stringify(queryParams)
    try {
      const { data: carCards } = await API.get(`getCardsByMileage?${params}`)
      return carCards
    } catch (error) {
      console.log(error)
    }
  }

  async getUserModelNames() {
    try {
      const { data: modelNames } = await API.get(`userModelNames`)
      return modelNames
    } catch (error) {
      console.log(error)
    }
  }

  async getCard(id) {
    const params = qs.stringify(id)
    try {
      const { data: carCard } = await API.get(`/getCard?${params}`)
      return carCard
    } catch (error) {
      console.log(error)
    }
  }

  async updateCard(data) {
    try {
      const { data: carCard } = await API.put('updateCard', data)
      return carCard
    } catch (error) {
      console.log(error)
    }
  }
}

export default ModelServices
