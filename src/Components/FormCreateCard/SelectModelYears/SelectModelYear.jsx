import React from 'react'
import Select, { Option } from '@avtopro/select/dist/index'
import PropTypes from 'prop-types'
import { nanoid } from 'nanoid'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { RootStoreContext } from '../../../context/modelContext'

const SelectModelYears = ({ value, setValue }) => {
  const {
    model: { modelCar }
  } = useContext(RootStoreContext)

  const handelEquipment = async (newValue) => {
    setValue((prevState) => ({
      ...prevState,
      carModelId: newValue[0].id,
      dateRange: newValue[0].dateRange
    }))
    modelCar.getModelEngine({ carModelId: newValue[0].id })
  }

  return (
    <Select
      required
      name="carEquipment"
      placeholder={value.dateRange ? value.dateRange : 'Select year'}
      className="create-card__options-select"
      onChange={(_, newValue) => handelEquipment(newValue)}
      disabled={toJS(modelCar.equipment.length) ? false : true}>
      {toJS(modelCar.equipment).map(({ id, dateRange }) => {
        return (
          <Option key={nanoid()} value={{ id, dateRange }}>
            {dateRange}
          </Option>
        )
      })}
    </Select>
  )
}

SelectModelYears.propTypes = {
  setValue: PropTypes.func,
  modelCar: PropTypes.object,
  value: PropTypes.object
}
export default observer(SelectModelYears)
