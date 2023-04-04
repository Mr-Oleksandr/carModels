import React from 'react'
import Select, { Option } from '@avtopro/select/dist/index'
import PropTypes from 'prop-types'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { RootStoreContext } from '../../../context/modelContext'

const SelectModelGroupe = ({ setValue, value }) => {
  const {
    model: { modelCar }
  } = useContext(RootStoreContext)

  const handelGroupe = (newValue) => {
    setValue((prevState) => ({
      ...prevState,
      groupName: newValue[0].groupName
    }))
    modelCar.getSubGroups({ groupId: newValue[0].id })
  }
  return (
    <Select
      placeholder={value.groupName ? value.groupName : 'Select Group Name'}
      className="create-card__options-select"
      onChange={(_, newValue) => handelGroupe(newValue)}
      disabled={toJS(modelCar.groups.length) ? false : true}>
      {toJS(modelCar.groups).map(({ id, groupName }) => {
        return (
          <Option key={id} value={{ id, groupName }}>
            {groupName}
          </Option>
        )
      })}
    </Select>
  )
}

SelectModelGroupe.propTypes = {
  setValue: PropTypes.func,
  value: PropTypes.object
}
export default observer(SelectModelGroupe)
