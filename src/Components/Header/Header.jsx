import { useContext, useState} from 'react'
import { Link } from 'react-router-dom'

import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import Logo from '../../assets/logo.png'
import './Header.css'

import AuthContext from '../../context/AuthContext'

const StyledHeader = styled.header`
  background-color: black;
  width: 100%;
  padding: 10px 12px 8px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .nav_logo {
    padding: 0 12px;
    .nav-logo-link {
      text-decoration: none;
      font-size: 24px;
      color: #fab005;
      font-weight: bold;
    }
  }
  .menuToggleBtn {
    display: none;
    color: white;
    font-size: 24px;
    position: absolute;
    right: 20px;
    top: 15px;
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    .menuToggleBtn {
      display: block;
    }
  }
`;
const NavManu = styled.ul`
  list-style: none;
  display: flex;
  
  li {
    &:hover {
      cursor: pointer;
    }
  }
  .nav-menu-list {
    text-decoration: none;
    color: white;
    display: block;
    padding: 8px 10px;
  }
  @media screen and (max-width: 768px) {
    display: ${(props) => (props.isToggleOpen ? "flex" : "none")};
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;

const Header = () => {
  const {user, logoutUser} = useContext(AuthContext)
  const token = localStorage.getItem("authTokens")
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  const handleToggleOpen = () => {
    setIsToggleOpen(!isToggleOpen);
  };

  return (
    <>
      <StyledHeader>
      <div className="nav_logo">
          <Link to={"/"} className="nav-logo-link">
            <img src={Logo} className='logo' alt='logo' />
          </Link>
        </div>
        

        <NavManu isToggleOpen={isToggleOpen}>
        <li>
          <Link to={"/"} className="nav-menu-list">
            Home
          </Link>
        </li>
        <li>
          <Link to={"/learning"} className="nav-menu-list">
            My Learning
          </Link>
        </li>

        { token === null ?
        <>
          <li>
            <Link to={"/login"} className="nav-menu-list">
              Login
            </Link>
          </li>
          <li>
            <Link to={"/register"} className="nav-menu-list">
              Register
            </Link>
          </li>
        </>
          :
          <>
            <li>
              <Link to={'/'+user.username} className="nav-menu-list" >
              <div className="horizontal-container">
                  {user.username}
              </div>
              </Link>
            </li>
            <li onClick={logoutUser}>
              <Link to={"/logout"} className="nav-menu-list logout-btn">
                Logout
              </Link>
            </li>
          </>
        }
        </NavManu>
        <FaBars className="menuToggleBtn" onClick={handleToggleOpen} />
      </StyledHeader>
    </>
  )
}

export default Header