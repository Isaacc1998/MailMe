import NavBar from "../NavBar/NavBar";
import "./HomePage.css";
import CreateEmailFormModal from "../CreateEmailForm/CreateEmailForm";
import { useSelector } from "react-redux";
function HomePage() {
  // const mailingLists = useSelector(state => state.mailingLists.lists)
  return (
    <>
      <NavBar />
      <div className="home-container">
        <div className="left-home-container">
          Left side container
          <p>Mailing List goes here</p>
        </div>
        <div className="right-home-container">
          <div className="top-right-home-container">
            Top Right side container
            <div>Display user email</div>
            <div>
              <CreateEmailFormModal />
            </div>
          </div>
          <div className="bottom-right-home-container">
            <div>Bottom Right side container &nbsp;</div>
            <div>Content of Mailing List</div>
            {/* {mailingLists.length > 0 &&
              mailingLists.map((list) => {
                return (
                  <>
                    <div>{list.name}</div>
                    <div>{JSON.stringify(list.emails)}</div>
                  </>
                );
              })} */}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
