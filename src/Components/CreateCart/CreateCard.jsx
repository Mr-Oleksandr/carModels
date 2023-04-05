import React, { useState } from 'react'
import { nanoid } from 'nanoid'
import { Progress, Step } from '@avtopro/progress/dist/index'
import Button from '@avtopro/button/dist/index'
import NumberInput from '@avtopro/number-input/dist/index'
import RobotPreloader from '@avtopro/preloader/dist/index'

import { observer } from 'mobx-react-lite'
import './CreateCard.css'
import Plus from '../../asstes/icons/Plus'
import { useContext } from 'react'
import { RootStoreContext } from '../../context/modelContext'
import { useEffect } from 'react'
import PropTypes from 'prop-types'
import SelectModelName from '../FormCreateCard/SelectModelName/SelectModelName'
import SelectModelYears from '../FormCreateCard/SelectModelYears/SelectModelYear'
import SelectModelEquipment from '../FormCreateCard/SelectModelEquipment/SelectModelEquipment'
import SelectModelComplectation from '../FormCreateCard/SelectModelComplectation/SelectModelComplectation'
import SelectModelGroupe from '../FormCreateCard/SelectModelGroupe/SelectModelGroupe'
import SelectModelSubGroupe from '../FormCreateCard/SelectModelSubgroupe/SelectModelSubGroupe'
import SelectModelParts from '../FormCreateCard/SelectModelParts/SelectModelParts'

const CreateCard = ({ setShowModal }) => {
  const {
    model: { modelCar }
  } = useContext(RootStoreContext)

  const [value, setValue] = useState({
    modelName: '',
    carModelId: '',
    mileage: '',
    dateStart: '',
    engineType: '',
    complectationType: '',
    groupName: '',
    subGroupName: ''
  })
  const [partCount, setCount] = useState(0)
  const [carInfo, setCarInfo] = useState({ parts: [] })
  const [part, setPart] = useState({})

  const getModel = async () => {
    try {
      await modelCar.getModelName()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getModel()
  }, [])

  const handleCount = (e) => {
    const value = e.target.value
    setCount(+value)
  }
  const handleMilage = (e) => {
    const value = e.target.value
    setValue((prevState) => ({
      ...prevState,
      mileage: value
    }))
  }

  const addCarInfo = (e) => {
    e.preventDefault()
    setCarInfo((prevState) => {
      const index = prevState.parts.findIndex((item) => item.tree === part.tree)

      if (index !== -1) {
        const parts = [...prevState.parts]
        parts[index].partCount += partCount

        return {
          ...prevState,
          parts
        }
      } else {
        return {
          ...prevState,
          ...value,
          parts: [...prevState.parts, { ...part, partCount }]
        }
      }
    })
    setCount(1)
  }
  console.log(1)

  const createCar = async () => {
    await modelCar.createCarCard(carInfo)
    setShowModal(false)
  }

  if (modelCar.state === 'loading') {
    return <RobotPreloader />
  }

  console.log(part)
  return (
    <form className="create-card" onSubmit={createCar}>
      <h3>New List</h3>
      <hr />
      <div className="create-card_content">
        <div>
          <Progress>
            <Step isCompleted={value.modelName ? true : false}>Select Model</Step>
            <Step isCompleted={Object.keys(part).length ? true : false}>Select Parts</Step>
            <Step isCompleted={partCount ? true : false}>Select Count</Step>
            <Step isCompleted={carInfo.parts.length ? true : false}>Add Part in List</Step>
          </Progress>
        </div>
        <div>
          <div className="create-card__options">
            <SelectModelName setValue={setValue} modelCar={modelCar} />
            <SelectModelYears setValue={setValue} value={value} />
          </div>
          <div className="create-card__options">
            <SelectModelEquipment setValue={setValue} value={value} />
            <SelectModelComplectation setValue={setValue} value={value} />
          </div>
          <hr />
          <div className="create-card__options">
            <SelectModelGroupe setValue={setValue} value={value} />
            <SelectModelSubGroupe setValue={setValue} value={value} />
          </div>
          <div className="create-card__options">
            <SelectModelParts setPart={setPart} partCount={partCount} />
          </div>
          <NumberInput
            className="create-card__mileage"
            placeholder="mileage"
            type="number"
            onChange={handleMilage}
            value={value.mileage}
            min={1}
          />
          <div className="create-card-btn">
            <NumberInput
              placeholder="count"
              type="number"
              onChange={handleCount}
              value={partCount}
              min={1}
            />
            <Button className="search__filter-btn" theme="blue" onClick={addCarInfo}>
              <Plus />
            </Button>
          </div>
          <ul className="create-card__list">
            {carInfo.parts.map((item) => {
              return (
                <li key={nanoid()}>
                  {item.tree} ({item.partCount})
                </li>
              )
            })}
          </ul>
          <hr />
          <div className="create-card__group-btn">
            <Button className="search__filter-btn" theme="blue">
              Cancel
            </Button>
            <Button className="search__filter-btn" theme="blue">
              Create
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}
CreateCard.propTypes = {
  setShowModal: PropTypes.func
}
export default observer(CreateCard)
