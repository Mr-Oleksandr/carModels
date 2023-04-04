import React from 'react'
import Select, { Option } from '@avtopro/select/dist/index'
import PropTypes from 'prop-types'
import { nanoid } from 'nanoid'
import { observer } from 'mobx-react-lite'
import { toJS } from 'mobx'
import { useContext } from 'react'
import { RootStoreContext } from '../../../context/modelContext'

const SelectModelEquipment = ({ setValue, value }) => {
  const {
    model: { modelCar }
  } = useContext(RootStoreContext)

  const handelEngine = async (newValue) => {
    setValue((prevState) => ({
      ...prevState,
      engineType: newValue[0]
    }))
    modelCar.getComplectationsByEngine({ engineType: newValue[0], carModelId: value.carModelId })
  }
  return (
    <Select
      required
      placeholder="Select Equipment"
      className="create-card__options-select"
      onChange={(_, newValue) => handelEngine(newValue)}
      disabled={toJS(modelCar.engine.length) ? false : true}>
      {toJS(modelCar.engine).map(({ engineType }) => {
        return (
          <Option key={nanoid()} value={engineType}>
            {engineType}
          </Option>
        )
      })}
    </Select>
  )
}

SelectModelEquipment.propTypes = {
  setValue: PropTypes.func,
  value: PropTypes.object
}
export default observer(SelectModelEquipment)
