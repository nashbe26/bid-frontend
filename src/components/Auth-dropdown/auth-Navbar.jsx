import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import styles from './style.module.scss'
import cart from '../../assets/svgs/icons/cart 1.svg';
import cup from '../../assets/svgs/icons/002-cup 1.svg';
import ticket from '../../assets/svgs/icons/tickets 1.svg';
import auction from '../../assets/svgs/icons/auctions 1.svg';
import clock from '../../assets/svgs/icons/circular-clock 1.svg';
import settings from '../../assets/svgs/icons/user_settings_new 1.svg';
import caret from '../../assets/svgs/icons/Caret_Down_MD.svg';
import out from '../../assets/svgs/icons/logout 1.svg';
import Flex from '../Flex/Flex';
import { P12 } from '../TXT/TXT';
import { Divider, IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetUser } from '../../store/userSlice';

const options_1 = [
  { text: 'Buy Credit', img: cart, link: "/packs" },
  { text: 'Auctions Won', img: cup, link: "/my-auctions-won" },
  { text: 'Auctions Favs', img: cup, link: "/my-auctions-fav" },

];

const options_2 = [
  { text: 'Assistance - Tickets', img: ticket, link: "/contact-us" },
  { text: 'Go to Auctions', img: auction, link: "/home" },
  { text: 'Live auctions', img: clock, link: "/live-auctions" },
]

const options_3 = [
  { text: 'Account managemnet', img: settings, link: "/settings" },
  { text: 'Logout', img: out, link: "/logout" },
]

export default function DropDownELement() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const navigate = useNavigate()
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch()
  function logout(){
    dispatch(resetUser())
    localStorage.removeItem('token')
    window.location.href = "/"
  }

  return (
    <div className={styles.auth}>

      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <img src={caret} alt={caret} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            borderRadius: "20px",
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >

        {options_1.map((option, index) => (
          <MenuItem
            onClick={handleClose}
          >
            <div className={styles.list} onClick={e => navigate(option.link)}>
              <Flex className={styles.gapList}>
                <img src={option.img} alt={option.img} />
                <P12>{option.text}</P12>
              </Flex>
            </div>
          </MenuItem>
        ))}
        <Divider></Divider>
        {options_2.map((option, index) => (
          <MenuItem
            onClick={handleClose}
          >
            <div className={styles.list} onClick={e => navigate(option.link)}>
              <Flex className={styles.gapList}>
                <img src={option.img} alt={option.img} />
                <P12>{option.text}</P12>
              </Flex>
            </div>
          </MenuItem>
        ))}
        <Divider></Divider>
        {options_3.map((option, index) => (
          <MenuItem
            onClick={handleClose}
          >
            {option.text == "Logout" ?
             <div className={styles.list} onClick={e => logout()}>
             <Flex className={styles.gapList}>
               <img src={option.img} alt={option.img} />
               <P12>{option.text}</P12>
             </Flex>
           </div>
            :
            <div className={styles.list} onClick={e => navigate(option.link)}>
              <Flex className={styles.gapList}>
                <img src={option.img} alt={option.img} />
                <P12>{option.text}</P12>
              </Flex>
            </div>
            }
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
