
const ActionButton = ({handleAction, className, type}) => {
  return (
    <button className={className} onClick={handleAction}>
      { type === 'edit' ? (
      <span className="material-symbols-outlined">
          edit
      </span> 
      ) : (
      <span className="material-symbols-outlined">
          delete
      </span>
      )}
    </button>
  )
}

export default ActionButton