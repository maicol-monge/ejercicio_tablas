export default function ProgressBar({ value, max }) {
  const safeMax = Math.max(1, max)
  const safeValue = Math.min(Math.max(0, value), safeMax)
  const percent = Math.round((safeValue / safeMax) * 100)

  return (
    <div className="progress" role="progressbar" aria-valuenow={safeValue} aria-valuemin={0} aria-valuemax={safeMax}>
      <div className="progress-bar" style={{ width: `${percent}%` }} />
      <div className="progress-label">{percent}%</div>
    </div>
  )
}
