import { observer } from 'mobx-react-lite'
import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import RobotPreloader from '@avtopro/preloader/dist/index'
import Banner from '@avtopro/banner/dist/index'
import Card from '../Card/Card'
import './CardList.css'
import { nanoid } from 'nanoid'
import { RootStoreContext } from '../../context/modelContext'

const CardList = () => {
  const {
    model: { modelCar }
  } = useContext(RootStoreContext)

  useEffect(() => {
    modelCar.getAllCarCard()
  }, [])

  if (modelCar.state === 'loading') {
    return <RobotPreloader />
  }

  if (modelCar.carCards.length === 0) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Banner>
          <h1>List of Card empty</h1>
        </Banner>
      </div>
    )
  }
  return (
    <div className="card__container">
      <section className="card-list">
        {modelCar.carCards.map((item) => {
          return <Card key={nanoid()} {...item} />
        })}
      </section>
    </div>
  )
}
export default observer(CardList)
