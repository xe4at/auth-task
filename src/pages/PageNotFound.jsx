import "./PageNotFound.css";

const PageNotFound = () => {
  return (
    <div className="container">
      <h1 className="title">404</h1>
      <p className="description">
        Sorry, the page you're looking for doesn't exist.
      </p>
      <a href="/" className="home-button">
        Go to Home
      </a>
    </div>
  );
};

export default PageNotFound;
