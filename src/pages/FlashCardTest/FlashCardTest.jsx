import React from 'react'
import BackButton from '../../Components/BackButton/BackButton'
import './FlashCardTest.css'

const FlashCardTest = () => {
  return (
    <div className='test-card-container'>
        <BackButton />
        <h1>Test</h1>

        <div className="card-quiz-container">

            <button>Prev</button>

            <div className="card">
                <p>Placeholder</p>
            </div>

            <button>Next</button>

        </div>

        {/* <div className="score-btns">
            <button>I know it!</button>
            <button>I dont't know it...</button>
        </div> */}
    </div>
  )
}

export default FlashCardTest