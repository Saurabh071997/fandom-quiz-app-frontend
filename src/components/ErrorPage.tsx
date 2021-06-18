import { Link } from "react-router-dom";
import "./ErrorPage.css";

export const ErrorPage = () => {
  return (
    <div className="error-container">
      <div className="error-txt-md">OOPs!!</div>

      <div className="error-txt-sm">Something went wrong</div>
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="btn-empty" style={{color:'#1E40AF'}}>Go to Home -&gt;</div>
      </Link>
    </div>
  );
};
