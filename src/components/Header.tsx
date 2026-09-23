import './Header.css'

/**
 * Top navigation bar with the text-based "Dev Insights" logo and a
 * "New Post" link (not wired up yet — it points to a placeholder anchor).
 */
function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <a href="/" className="header__logo" aria-label="Dev Insights home">
          <span className="header__logo-mark" aria-hidden="true">
            {'</>'}
          </span>
          Dev Insights
        </a>
        <nav aria-label="Main">
          <a href="#new-post" className="header__nav-link">
            + New Post
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Header
