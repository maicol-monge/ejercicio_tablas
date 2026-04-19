import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="stack">
      <div className="hero-card">
        <h1 className="hero-title">Tablas de multiplicar</h1>
        <p className="hero-subtitle">
          Elige una o varias tablas, responde preguntas en orden aleatorio y recibe
          mensajes motivadores estilo IA.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-primary" to="/tablas">
            Empezar
          </Link>
          <a
            className="btn btn-ghost"
            href="https://juegocok8.github.io/parcial2/claveb.html"
            target="_blank"
            rel="noreferrer"
          >
            Ver consigna
          </a>
        </div>
      </div>

      <div className="info-grid" aria-label="Cómo funciona">
        <div className="info-card">
          <h2>1) Elige tablas</h2>
          <p>Selecciona del 1 al 10 con tarjetas llamativas.</p>
        </div>
        <div className="info-card">
          <h2>2) Practica</h2>
          <p>Preguntas al azar sin repetirse (1 al 10).</p>
        </div>
        <div className="info-card">
          <h2>3) Mira tus resultados</h2>
          <p>Porcentaje de aciertos y una retroalimentación visual.</p>
        </div>
      </div>
    </section>
  )
}
