
const EditButton = ({handleNavigation}) => {
  return (
    <button onClick={handleNavigation}>
      <span className="material-symbols-outlined">
          edit
      </span>
    </button>
  )
}

export default EditButton