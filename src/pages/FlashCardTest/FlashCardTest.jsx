import React, { useEffect, useState } from 'react'
import BackButton from '../../Components/BackButton/BackButton'
import './FlashCardTest.css'
import ReactCardFlip from 'react-card-flip'
import BASE_URL from '../../utils/config'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';

const FlashCardTest = () => {
    const { matId } = useParams();
    const url = `${BASE_URL}/api/subtopic/${matId}/flashcard/`
    const [isFlipped, setIsFlipped] = useState(false)
    const [score, setScore] = useState(0)
    const [index, setIndex] = useState(0)
    const [cards, setCards] = useState([])

    const flipCard = () => {
        setIsFlipped(!isFlipped)
    }

    const incrementScore = () => {
        setScore(score + 1)
    }
    
    const decrementScore = () => {
        if (score> 0) {
            setScore(score - 1)
        }
    }

    const handleNext = () => {
        setIsFlipped(false)
        if (index > cards.length - 2) {
            setIndex(0)
        } else {
            setIndex(index + 1)
        }
    }
    
    const handlePrev = () => {
        setIsFlipped(false)
        if (index < 0) {
            setIndex(cards.length - 1)
        } else {
            setIndex(index - 1)
        }
    }

    useEffect(()=> {
        const getCards = async () => {
            let response = await fetch(url)
            let data = await response.json()
            setCards(data)
        }
        getCards()
    }, [url])

    if (cards.length === 0) {
        return (
            <div style={{margin:'2rem'}}>
                <BackButton />
                <p>No Flash Cards</p>
            </div>
        )
    }

  return (
    <div className='test-card-container'>
        <BackButton />
        <h1>Test</h1>

        <div className="card-quiz-container">

            <button onClick={handlePrev} disabled={index === 0}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>

            <ReactCardFlip flipDirection='horizontal' isFlipped={isFlipped} >
                <div className="card" onClick={flipCard}>
                    <p>{cards[index]?.question}</p>
                </div>

                <div className="card" onClick={flipCard}>
                    <p>{cards[index]?.answer}</p>
                </div>
            </ReactCardFlip>

            <button onClick={handleNext}>
                <FontAwesomeIcon icon={faArrowRight} />
            </button>
        </div>

        <div className="arrow-nav-btns">
            <button onClick={handlePrev} disabled={index === 0}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>

            <button onClick={handleNext}>
                <FontAwesomeIcon icon={faArrowRight} />
            </button>
        </div>

        <div className="score-btns">
            <button onClick={incrementScore}>
                <FontAwesomeIcon icon={faCheck} />
            </button>

            <button onClick={decrementScore}>
                <FontAwesomeIcon icon={faTimes} />
            </button>
        </div>

        <div className='score-container'>
            <p>Score: {score}</p>
        </div>
    </div>
  )
}

export default FlashCardTest