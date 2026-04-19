export function HappyMascot() {
  return (
    <div className="mascot mascot-happy" role="img" aria-label="Carita feliz">
      <div className="mascot-face">
        <div className="mascot-eyes">
          <span className="mascot-eye" />
          <span className="mascot-eye" />
        </div>
        <div className="mascot-mouth" />
      </div>
      <div className="mascot-spark" aria-hidden="true">
        ✨
      </div>
    </div>
  )
}

export function StudyMascot() {
  return (
    <div className="mascot mascot-study" role="img" aria-label="Persona estudiando">
      <div className="mascot-book" aria-hidden="true">
        📚
      </div>
      <div className="mascot-student" aria-hidden="true">
        🤓
      </div>
    </div>
  )
}
