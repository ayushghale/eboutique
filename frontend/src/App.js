import Router from "./router/Router";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./App.css";

function App() {
  // var userData = [
  //   {
  //     id: 1,
  //     name: "Ayush Gurung",
  //     email: "ayush@gmail.com",
  //     phoneNumber: "(+977) 9819160357",
  //     address: "Gandaki Province,Pokhara,Old Airport Area,Mustang chok",
  //   },
  // ];
  // if (localStorage.getItem("userData") === null)
  //   localStorage.setItem("userData", JSON.stringify(userData));

  return (
    <>
      <Provider store={store}>
        <Router />
      </Provider>
    </>
  );
}

export default App;
