// components/Breadcrumb.jsx
import { Link } from "react-router-dom";

function Breadcrumb({ items }) {
  return (
    <nav className="mb-4 text-sm text-gray-600">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-1">
            {item.to ? (
              <Link
                to={item.to}
                className="text-gray-800 hover:underline dark:text-white"
              >
                {item.label}
              </Link>
            ) : (
              <span>{item.label}</span>
            )}
            {idx < items.length - 1 && <span className="mx-1">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
