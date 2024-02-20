import React, { useEffect } from "react";
import styles from "./Navbar.module.scss";

import { logo1, loop } from "../../assets/svgs/index";

import MainContainer from "../../components/Containers/MainContainer";
import Flex from "../../components/Flex/Flex";
import { NavLink, Navigate, useLocation, useNavigate } from "react-router-dom";
import UseIsContainUrl from "../../hooks/UseIsContainUrl";
import { P14, P16 } from "../../components/TXT/TXT";

import Button from "../../components/Buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import { open_auth } from "../../store/popups.reducer";

import bell from '../../assets/svgs/icons/Vector.svg'
import love from '../../assets/svgs/icons/Vector-1.svg'
import users from '../../assets/svgs/icons/Vector-2.svg'
import { selectIsConnected, selectUser, setTypeUser } from "../../store/userSlice";
import DropDownELement from "../../components/Auth-dropdown/auth-Navbar";

import company_blue from '../../assets/svgs/arrows/company_blue.svg'
import company_white from '../../assets/svgs/arrows/company_white.svg'
import people_blue from '../../assets/svgs/arrows/people_blue.svg'
import people_white from '../../assets/svgs/arrows/people_white.svg'
import { Box, Drawer, Menu, MenuItem } from "@mui/material";
import styled from "@emotion/styled";
import useResponsive from "../../hooks/UseResponsive";
import { searchBid } from "../../api/bid";

function Navbar() {


  const isConnceted = useSelector(selectIsConnected)
  const user = useSelector(selectUser)
  const isMobile = useResponsive()
  return (
    <MainContainer className={styles.main}>
      {!isMobile.lt.md ? 
      <Flex flex="between" className={styles.content}>
      <Logo />
      <Search />
      <Links />
      {isConnceted ? <AuthUser user={user} /> : <Login /> }
      
    </Flex>
      : 
      <Flex flex="between" className={styles.content}>
      <Logo />
      <DrawerResponsive/>
      
    </Flex>
      }
      
    </MainContainer>
  );
}


const DrawerResponsive = () =>{
  
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const isConnceted = useSelector(selectIsConnected)
  const user = useSelector(selectUser)

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  
  const location = useLocation();

  useEffect(() => {
    
    toggleDrawer("right", true);  
    console.log(location);
  }, [location]);

  const list = (anchor) => (
    <Box
      sx={{ width:250 }}
      role="presentation"

    >

        <Search />
        <LinksMobile />
        {isConnceted ? <AuthUser user={user} /> : 
        <>
        <LoginMobile text={"Individual"} 
/> 
        <LoginMobile text={"Company"}/> 
        </>
        }
    </Box>
  );

  return(
    <div className={styles.drawer}>
        <div onClick={toggleDrawer("right", true)} className={styles.burger}>
        <i class="fa-solid fa-bars"></i>
        </div>
        <Drawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          {list("right")}
        </Drawer>
    
  </div>
  )
}
/** 
        */
const Logo = () => {
  return (
    <div className={styles.logo}>
      <NavLink to="/home">
        <img src={logo1} alt="" />
      </NavLink>
    </div>
  );
};

const Search = () => {

  function handleKeyPress (event){
    if (event.key === 'Enter') {
      // Handle the Enter key press here
      window.location.href ="/departments/"+event.target.value
    }
  };

  return (
    <Flex flex="start" className={styles.search}>
      <img src={loop} alt="" />
      <input type="text" placeholder="Search" onKeyDown={handleKeyPress} />
    </Flex>
  );
};

const Links = () => {

  const isConnceted = useSelector(selectIsConnected)


  const links = [
    {
      name: "Live auctions",
      link: "/live-auctions",
    },
    {
      name: "Auctions closed",
      link: "/auctions-closed",
    },
    {
      name: "Ending soon",
      link: "/ending-soon",
    },
    {
      name: "Coming soon",
      link: "/auctions-coming",
    },
    isConnceted && 
    {
      name: "Create Bid",
      link: "/add-product",
    },
  ];

  return (
    <Flex flex="start" className={styles.links}>
      {links.map((link, key) => (
        <Link link={link} key={key} />
      ))}
    </Flex>
  );
};

const LinksMobile = () => {
  const links = [
    {
      name: "Live auctions",
      link: "/live-auctions",
    },
    {
      name: "Auctions closed",
      link: "/auctions-closed",
    },
    {
      name: "Ending soon",
      link: "/ending-soon",
    },
    {
      name: "Coming soon",
      link: "/auctions-coming",
    },
    {
      name: "Create Bid",
      link: "/add-product",
    },
  ];

  return (
    <Flex flex="start" className={styles.linksMobile}>
      {links.map((link, key) => (
        <Link link={link} key={key} />
      ))}
    </Flex>
  );
};

const Link = ({ link = { name: "", link: "" } }) => {
  const current = UseIsContainUrl(link.link) ? styles.current : "";

  return (
    <P14 className={`${styles.link} ${current}`}>
      <NavLink to={link.link}>{link.name}</NavLink>
    </P14>
  );
};

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: 1,
    marginBottom: 1,
    minWidth: 250,
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    
  },
}));

const Login = () => {
  const dispatch = useDispatch();
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (data) => {
    dispatch(setTypeUser(data))
    dispatch(open_auth());
    setAnchorEl(null);
  };
  
  return (
    <div className={styles.login}>
      <Button type="outlined"         
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick} >
          Login
        </Button>
        <StyledMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ width: '500px' }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        
        <MenuItem onClick={e => handleClose('individual')}>
          <img src={people_blue} alt="pope_blue" style={{paddingRight:'1rem'}} />
          <P14>Individual</P14>
        </MenuItem>
        <MenuItem onClick={e => handleClose('company')} >
          <img src={company_blue} alt="company_blue" style={{paddingRight:'1rem'}}/> 
          <P14>Company</P14>
        </MenuItem>
      </StyledMenu>
     
    </div>
  );
};

const LoginMobile = ({text}) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    if(text=="Individual"){
      dispatch(setTypeUser("individual"))
      dispatch(open_auth());
    }else if(text=="Company"){
      dispatch(setTypeUser("company"))
      dispatch(open_auth());
    }

  };
  
  return (
    <div className={styles.login}>
      <Button type={text=="Individual" ? "filled" : "outlined" }        
        onClick={handleClose} >
          Login as {text}
           </Button>

     
    </div>
  );
};

const AuthUser = ({user}) =>{
  const navigate = useNavigate()
  return(
    <div className={styles.auth}>
      <Flex   className={styles.gapFlex}>

        <P14>€{user.balance}</P14>
        <div className={styles.bar}></div>
        <img src={bell}alt={bell} />
        <img src={users}alt={users} />
        <Flex>
          <P14 className={styles.dec} onClick={e => navigate('/user/'+user._id)}>{user.username}</P14>
       
        <DropDownELement></DropDownELement>
        </Flex>
        


      </Flex>
    </div>
  )
}

export default Navbar;
