import React from 'react'
import Select, { Option } from '@avtopro/select/dist/index'
import PropTypes from 'prop-types'
import { nanoid } from 'nanoid'
import { observer } from 'mobx-react-lite'
import { toJS } from 'mobx'
import { useContext } from 'react'
import { RootStoreContext } from '../../../context/modelContext'
const SelectModelComplectation = ({ setValue, value }) => {
  const {
    model: { modelCar }
  } = useContext(RootStoreContext)

  const handelComplictation = (newValue) => {
    setValue((prevState) => ({
      ...prevState,
      complectationType: newValue[0].code
    }))
    modelCar.getGroups({ complectationId: newValue[0].id })
  }
  return (
    <Select
      placeholder={value.complectationType ? value.complectationType : 'Select Complictation'}
      className="create-card__options-select"
      onChange={(_, newValue) => handelComplictation(newValue)}
      disabled={toJS(modelCar.complictationByEngine.length) ? false : true}>
      {toJS(modelCar.complictationByEngine).map(({ id, code }) => {
        return (
          <Option key={nanoid()} value={{ id, code }}>
            {code}
          </Option>
        )
      })}
    </Select>
  )
}

SelectModelComplectation.propTypes = {
  setValue: PropTypes.func,
  value: PropTypes.object
}
export default observer(SelectModelComplectation)
