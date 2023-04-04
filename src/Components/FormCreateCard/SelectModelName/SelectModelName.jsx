import React from 'react'
import Select, { Option } from '@avtopro/select/dist/index'
import PropTypes from 'prop-types'
import { nanoid } from 'nanoid'
import { toJS } from 'mobx'

const SelectModelName = ({ setValue, modelCar }) => {
  const handleModelName = (newValue) => {
    setValue((prevState) => ({
      ...prevState,
      modelName: newValue[0]
    }))
    modelCar.getModelConfiguration({ ModelName: newValue[0] })
  }
  return (
    <Select
      required
      placeholder="Select Model Name"
      className="create-card__options-select"
      name="carModel"
      onChange={(_, newValue) => handleModelName(newValue)}>
      {toJS(modelCar.modelName).map(({ modelName }) => {
        return (
          <Option key={nanoid()} value={modelName}>
            {modelName}
          </Option>
        )
      })}
    </Select>
  )
}

SelectModelName.propTypes = {
  setValue: PropTypes.func,
  modelCar: PropTypes.object
}
export default SelectModelName
