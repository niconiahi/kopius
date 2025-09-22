import { Link, Outlet } from "react-router"

export default function () {
  return (
    <div className="flex">
      <nav className="border-1 border-white p-2">
        examples
        <ul>
          <li>
            <Link to="react" className="underline">
              React
            </Link>
          </li>
          <li>
            <Link
              to="fetching-and-validating"
              className="underline"
            >
              Fetching and validating
            </Link>
          </li>
        </ul>
      </nav>
      <main className="p-2">
        <Outlet />
      </main>
    </div>
  )
}
