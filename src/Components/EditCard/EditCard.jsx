import React from 'react'
import Modal from '@avtopro/modal/dist/index'
import Button from '@avtopro/button/dist/index'
import RobotPreloader from '@avtopro/preloader/dist/index'
import TextInput from '@avtopro/text-input/dist/index'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../../context/modelContext'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { nanoid } from 'nanoid'
import './EditCard.css'

const EditCard = () => {
  const {
    model: { modelCardList }
  } = useContext(RootStoreContext)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    modelCardList.getCard({ Id: id })
  }, [])

  console.log(modelCardList.card)

  const onChange = ({ tree }, e) => {
    const value = e.target.value
    modelCardList.changeValueParts(tree, value)
  }

  const deletePart = ({ tree }) => {
    modelCardList.deletePart(tree)
  }
  if (modelCardList.state === 'loading') {
    return <RobotPreloader fixed />
  }

  return (
    <Modal onClose={() => navigate('/')}>
      <form className="edit__form">
        <Button
          className="search__filter-btn"
          type="button"
          theme="blue"
          onClick={() => modelCardList.deleteCard(id)}>
          Delete
        </Button>
        <ul className="create-card__list">
          {modelCardList.card.parts?.map((item) => {
            return (
              <li key={nanoid()} className="edit_parts">
                {item.tree}{' '}
                <TextInput
                  type="number"
                  min={0}
                  defaultValue={item.partCount}
                  onChange={(e) => onChange(item, e)}
                />
                <Button type="button" onClick={() => deletePart(item)}>
                  Delete
                </Button>
              </li>
            )
          })}
        </ul>

        <Button type="button" onClick={() => modelCardList.updateCard()}>
          Submit changes
        </Button>
      </form>
    </Modal>
  )
}

EditCard.propTypes = {
  id: PropTypes.number
}

export default observer(EditCard)
