import "./NavbarLogo.css";
import { useNavigate } from "react-router-dom";
import logoImage from '../img/logo.png';

export default function Logo() {
  const navigate = useNavigate();

  function showMainPage() {
    navigate("/");
  }

  return (
    <img
      src={logoImage}
      alt="Delicious logo"
      className="logo"
      onClick={() => showMainPage()}
    />
  );
}
