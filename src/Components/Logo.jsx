import "./NavbarLogo.css";
import { useNavigate } from "react-router-dom";

export default function Logo() {
  const navigate = useNavigate();

  function showMainPage() {
    navigate("/", "_blank");
  }

  return (
    <img
      src="./img/logo.png"
      alt="Delicious logo"
      className="logo"
      onClick={() => showMainPage()}
    />
  );
}
