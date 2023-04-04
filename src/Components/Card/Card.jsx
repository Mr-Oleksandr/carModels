import React from 'react'
import './Card.css'
import PropTypes from 'prop-types'
import ItemCard from '@avtopro/item-card/dist/index'
import { nanoid } from 'nanoid'
import { Link } from 'react-router-dom'

const Card = ({
  id,
  modelName = '',
  dateRange = '',
  engineType = '',
  mileage = '',
  parts = []
}) => {
  return (
    <ItemCard
      className="card"
      title={
        <span>
          {modelName} <br />
          {dateRange} {engineType} {mileage}km <br />
          <button
            style={{
              width: '50px',
              height: '25px',
              backgroundColor: '#418aca',
              border: 'none',
              color: 'white',
              borderRadius: '2px'
            }}>
            <Link to={`/edit/${id}`}>Edit</Link>
          </button>
        </span>
      }>
      {parts.map((item) => {
        return (
          <div key={nanoid()} className="itemcard__block">
            {item.tree} {item.code} ({item.partCount})
          </div>
        )
      })}
    </ItemCard>
  )
}

Card.propTypes = {
  modelName: PropTypes.string,
  dateRange: PropTypes.string,
  engineType: PropTypes.string,
  mileage: PropTypes.number,
  id: PropTypes.number,
  parts: PropTypes.array
}

export default Card
