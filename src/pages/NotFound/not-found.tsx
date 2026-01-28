import { Link } from "react-router";
import "./not-found.scss";

const NotFound = () => {
  return (
    <div className="not-found-page">
      <h1>404!</h1>
      <p>The page you’re looking for doesn’t exist.</p>

      <Link to="/users" className="back-link">
        Return to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
