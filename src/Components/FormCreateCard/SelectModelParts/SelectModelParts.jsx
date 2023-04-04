import React from 'react'
import Select, { Option } from '@avtopro/select/dist/index'
import PropTypes from 'prop-types'
import { toJS } from 'mobx'
import { nanoid } from 'nanoid'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { RootStoreContext } from '../../../context/modelContext'

const SelectModelSubGroupe = ({ setPart, partCount }) => {
  const {
    model: { modelCar }
  } = useContext(RootStoreContext)

  const handlePart = (newValue) => {
    setPart({
      tree: newValue[0],
      partCount: partCount,
      code: '021300230'
    })
  }
  return (
    <Select
      placeholder="Select Equipment"
      className="create-card__options-select"
      onChange={(_, newValue) => handlePart(newValue)}
      disabled={toJS(modelCar.parts.length) ? false : true}>
      {toJS(modelCar.parts).map(({ tree }) => {
        return (
          <Option key={nanoid()} value={tree}>
            {tree}
          </Option>
        )
      })}
    </Select>
  )
}

SelectModelSubGroupe.propTypes = {
  setPart: PropTypes.func,
  partCount: PropTypes.number
}
export default observer(SelectModelSubGroupe)
