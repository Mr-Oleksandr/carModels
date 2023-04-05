/* eslint-disable no-constant-condition */
import React, { useContext } from 'react'
import TextInput from '@avtopro/text-input/dist/index'
import Alert from '@avtopro/alert/dist/index'
import Button from '@avtopro/button/dist/index'
import { useState } from 'react'
import { contextAuth } from '../../context/contextAuth'
import { RootStoreContext } from '../../context/modelContext'
import { observer } from 'mobx-react-lite'
import './LoginForm.css'
import { useNavigate } from 'react-router-dom'
import RobotPreloader from '@avtopro/preloader/dist/index'

const LoginForm = () => {
  const [user, setUser] = useState(null)
  const [registration, setRegistration] = useState(false)
  const { setItem } = useContext(contextAuth)
  const {
    model: { modelUser }
  } = useContext(RootStoreContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    setUser((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const onSubmitRegister = (e) => {
    e.preventDefault()
    modelUser.register(user)
    setRegistration(false)
  }

  const onSubmitLogin = async (e) => {
    e.preventDefault()
    const data = await modelUser.login(user)
    console.log(data)
    if (data) {
      setItem('jwt', data)
      navigate('/')
    }
  }
  if (modelUser.state === 'loading') {
    return <RobotPreloader />
  }
  return (
    <div className="login__container">
      <h5>
        {modelUser.state === 'error' ? (
          <Alert>
            <div style={{ marginRight: '10px' }}>email or password is incorrect</div> <br />
            <Button theme="prime" onClick={() => setRegistration(true)}>
              Registration
            </Button>
          </Alert>
        ) : null}
      </h5>
      {registration ? (
        <form onSubmit={onSubmitRegister} className="login__from">
          <TextInput name="email" placeholder="Enter Email" onChange={handleChange} />
          <TextInput name="password" placeholder="Enter Password" onChange={handleChange} />
          <Button theme="blue" type="submit">
            Registration
          </Button>
        </form>
      ) : (
        <form onSubmit={onSubmitLogin} className="login__from">
          <TextInput name="email" placeholder="Enter Email" onChange={handleChange} />
          <TextInput name="password" placeholder="Enter Password" onChange={handleChange} />
          <Button theme="blue" type="submit">
            Login
          </Button>
        </form>
      )}
    </div>
  )
}
export default observer(LoginForm)
