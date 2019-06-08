import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion} from '../../actions/questions'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    redirect: false
  }
  handleChangeOne = (e) => {
    const text = e.target.value

    this.setState(() => ({
      optionOne:text
    }))
  }  
  handleChangeTwo = (e) => {
    const text = e.target.value

    this.setState(() => ({
      optionTwo:text
    }))
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const { optionOne, optionTwo } = this.state
    const { dispatch, id } = this.props

    dispatch(handleAddQuestion( optionOne, optionTwo, id))

    this.setState(() => ({
      optionOne: '', 
      optionTwo: '', 
      redirect: true
    }))
  }
  render() {
    if (!this.props.loggedIn) {
      return <Redirect to={{
      pathname: '/',
      state: { priorPath: '/add' }
    }}/>
  }
     
    if (this.state.redirect === true) {
      return <Redirect to='/home' />
    }
    const { text } = this.state

    return (
      <div>
        <h3 className='center'>Would you rather </h3>
        <form className='new-tweet' onSubmit={this.handleSubmit}>
          <textarea
            placeholder="Option One"
            onChange={this.handleChangeOne}
            className='textarea'
            maxLength={280}
          />

          <textarea
            placeholder="Option Two"
            onChange={this.handleChangeTwo}
            className='textarea'
            maxLength={280}
          />
         
          <button
            className='btn'
            type='submit'
            disabled={text === ''}>
              Submit
          </button>
        </form>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loggedIn: authedUser != false
  }
}

export default connect(mapStateToProps)(NewQuestion)