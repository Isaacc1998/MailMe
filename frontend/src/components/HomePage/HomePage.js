import NavBar from "../NavBar/NavBar";
import "./HomePage.css";
function HomePage() {
  return (
    <>
      <NavBar />
      <div className="home-container">
        <div className="left-home-container">
          Left side container
          <p>Email history goes here</p>
        </div>
        <div className="right-home-container">
          <div className="top-right-home-container">
            Top Right side container
            <div>Display user email</div>
            <div>Create Email</div>
          </div>
          <div className="bottom-right-home-container">
            <div>Bottom Right side container &nbsp;</div>
            <div>Mailing Lists goes here</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
