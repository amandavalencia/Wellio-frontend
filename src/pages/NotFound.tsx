import { Link } from 'react-router-dom'

export const NotFound = () => (
  <div className="mainContainer">
    <section className="page-content">
      <h1>Sidan hittades inte</h1>
      <Link className="page-link" to="/">Tillbaka till startsidan</Link>
    </section>
  </div>
)
