import { NavLink } from 'react-router-dom'

const navLinkClassName = ({ isActive }) =>
  isActive ? 'nav-link nav-link-active' : 'nav-link'

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="brand" aria-label="Tablas de multiplicar">
          <span className="brand-badge" aria-hidden="true">
            ×
          </span>
          <span className="brand-title">Tablas</span>
        </div>

        <nav className="nav" aria-label="Navegación">
          <NavLink to="/" className={navLinkClassName} end>
            Inicio
          </NavLink>
          <NavLink to="/tablas" className={navLinkClassName}>
            Elegir tablas
          </NavLink>
          <NavLink to="/practicar" className={navLinkClassName}>
            Practicar
          </NavLink>
          <NavLink to="/resultados" className={navLinkClassName}>
            Resultados
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
