import React from 'react'
import Select, { Option } from '@avtopro/select/dist/index'
import PropTypes from 'prop-types'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { RootStoreContext } from '../../../context/modelContext'

const SelectModelSubGroupe = ({ setValue, value }) => {
  const {
    model: { modelCar }
  } = useContext(RootStoreContext)

  const handleSubGroupe = (newValue) => {
    setValue((prevState) => ({
      ...prevState,
      subGroupName: newValue[0].subGroupName
    }))
    modelCar.getParts({ subGroupId: newValue[0].id })
  }

  return (
    <Select
      placeholder={value.subGroupName ? value.subGroupName : 'Select Sub GroupName'}
      className="create-card__options-select"
      onChange={(_, newValue) => handleSubGroupe(newValue)}
      disabled={toJS(modelCar.subGroups.length) ? false : true}>
      {toJS(modelCar.subGroups).map(({ id, subGroupName }) => {
        return (
          <Option key={id} value={{ id, subGroupName }}>
            {subGroupName}
          </Option>
        )
      })}
    </Select>
  )
}

SelectModelSubGroupe.propTypes = {
  setValue: PropTypes.func,
  value: PropTypes.object
}
export default observer(SelectModelSubGroupe)
