import React, { useEffect, useState } from 'react'
import Select, { Option } from '@avtopro/select/dist/index'
import PropTypes from 'prop-types'
import './Filter.css'
import { toJS } from 'mobx'
import MultiRangeSlider from '../Slider/Slider'
import useDebounce from '../../hooks/useDebounce'
import { observer } from 'mobx-react-lite'

const Filter = ({ modelCardList, modelCar }) => {
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(0)
  const handleChange = (min, max) => {
    setMin(min)
    setMax(max)
  }

  const debouncedSearchMin = useDebounce(min, 500)
  const debouncedSearchMax = useDebounce(max, 500)

  useEffect(() => {
    if (debouncedSearchMin && debouncedSearchMax) {
      modelCar.getCardsBySearchRange({ MileageMin: min, MileageMax: max })
    }
  }, [debouncedSearchMin, debouncedSearchMax, modelCardList])

  useEffect(() => {
    modelCardList.getUserModelNames()
  }, [])
  const handleChangeModel = (newValue) => {
    modelCar.getCardsBySearch({ SearchString: newValue[0] })
  }
  return (
    <div className="filter__container">
      <div className="filter__container__slider">
        <MultiRangeSlider
          min={toJS(modelCar.minMaxFilter)[0]}
          max={toJS(modelCar.minMaxFilter)[1]}
          onChange={({ min, max }) => handleChange(min, max)}
        />
      </div>
      <div className="filter__container__select">
        <Select placeholder="Search Model" onChange={(_, newValue) => handleChangeModel(newValue)}>
          <Option value={''}>All</Option>
          {modelCardList.models.map((item) => {
            return (
              <Option key={item} value={item}>
                {item ? item : 'all'}
              </Option>
            )
          })}
        </Select>
      </div>
    </div>
  )
}

Filter.propTypes = {
  modelCar: PropTypes.object,
  modelCardList: PropTypes.object
}
export default observer(Filter)
