import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import TextInput from '@avtopro/text-input/dist/index'
import Button from '@avtopro/button/dist/index'
import Modal from '@avtopro/modal/dist/index'
import Plus from '../../asstes/icons/Plus'
import './Search.css'
import Filter from '../Fiter/Filter'
import CreateCard from '../CreateCart/CreateCard'
import { contextAuth } from '../../context/contextAuth'
import { RootStoreContext } from '../../context/modelContext'
import useDebounce from '../../hooks/useDebounce'
import { useEffect } from 'react'

const Search = () => {
  const [activeFilter, setActiveFilter] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const { removeItem } = useContext(contextAuth)
  const {
    model: { modelCar, modelCardList }
  } = useContext(RootStoreContext)
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const openModel = () => {
    setShowModal((prevState) => !prevState)
    setActiveFilter(false)
  }

  useEffect(() => {
    if (debouncedSearchTerm) {
      modelCar.getAllCarCard({ SearchString: debouncedSearchTerm })
    }
    return () => {
      if (debouncedSearchTerm === '') {
        modelCar.getAllCarCard()
      }
    }
  }, [debouncedSearchTerm])

  return (
    <header className="search">
      <div className="search__container">
        <div className="search__filter">
          <div className="search__group pro-btn-group">
            <TextInput onChange={(e) => setSearchTerm(e.target.value)} />
            <Button theme="blue" onClick={openModel}>
              <Plus />
            </Button>
          </div>
          {activeFilter ? <Filter modelCar={modelCar} modelCardList={modelCardList} /> : null}
        </div>
        <Button
          className="search__filter-btn"
          onClick={() => setActiveFilter((prevState) => !prevState)}>
          Filter
        </Button>
        <Button className="search__filter-btn" onClick={() => removeItem('jwt')}>
          Exit
        </Button>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal((prevState) => !prevState)}>
          <CreateCard setShowModal={setShowModal} />
        </Modal>
      )}
    </header>
  )
}

Search.propTypes = {
  setActiveFilter: PropTypes.func
}

Search.defaultProps = {
  setActiveFilter: () => {}
}

export default Search
