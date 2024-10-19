import React from 'react'

const DeleteButton = ({deleteCard}) => {
  return (
    <button onClick={deleteCard}>
        <span className="material-symbols-outlined">
            delete
        </span>
    </button>
  )
}

export default DeleteButton