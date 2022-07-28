import React, { useState, useEffect, useRef } from 'react'
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../Responsive";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import FlightIcon from '@mui/icons-material/Flight';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import HouseboatIcon from '@mui/icons-material/Houseboat';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BalconyIcon from '@mui/icons-material/Balcony';
import HomeIcon from '@mui/icons-material/Home';
import Fade from 'react-reveal/Fade';
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../redux/userSlice";
import PermissionCard from './PermissionCard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});
function TopBarTwo() {
    const currentUser = useSelector(selectUser);
    const dispatch = useDispatch();
    const [loggingOut, setLoggingOut] = useState(false)
    const clear = () => {
        setLoggingOut(false);
    }
    const show = () => {
        setLoggingOut(true);
    }
    const classes = useStyles();
    const [menu1, setMenu1] = useState(false);
    const [menu2, setMenu2] = useState(false);
    const [menu3, setMenu3] = useState(false);
    const onHover1 = () => {
        setMenu1(true);
    };
    const onHover2 = () => {
        setMenu2(true);
    };
    const onHover3 = () => {
        setMenu3(true);
    };
    const onLeave1 = () => {
        setMenu1(false);
    };
    const onLeave2 = () => {
        setMenu2(false);
    };
    const onLeave3 = () => {
        setMenu3(false);
    };


    const [state, setState] = React.useState({
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
    const list = (anchor) => (
        <div
            role="presentation"

            onKeyDown={toggleDrawer(anchor, false)}
            className={clsx(classes.list, {
                [classes.list]: anchor === 'right' || anchor === 'left',
            })}
        >
            <List>
                <Link className="link" to="/" >
                    <ListItem onClick={toggleDrawer(anchor, false)} button>
                        <div style={{ display: "flex", alignItems: "center" }} >
                            <ListItemIcon>
                                <HomeIcon style={{ transform: "scale(1.5)" }} />
                            </ListItemIcon>
                            <ListItemText>
                                <p style={{ fontSize: "16px" }} >Home</p>
                            </ListItemText>
                        </div>
                    </ListItem>
                </Link>
            </List>
            <List >
            <Link className="link" to="/Flights">
                <ListItem onClick={toggleDrawer(anchor, false)} button>
                    <div style={{ display: "flex", alignItems: "center" }} >
                        <ListItemIcon>
                            <BalconyIcon style={{ transform: "scale(1.5)" }} />
                        </ListItemIcon>
                        <ListItemText>
                            <p style={{ fontSize: "16px" }} >Flights</p>
                        </ListItemText>
                    </div>
                </ListItem>
                </Link>
            </List> 
            <List >
            <Link className="link" to="/hotels" >
                <ListItem onClick={toggleDrawer(anchor, false)} button>
                    <div style={{ display: "flex", alignItems: "center" }} >
                        <ListItemIcon>
                            <BalconyIcon style={{ transform: "scale(1.5)" }} />
                        </ListItemIcon>
                        <ListItemText>
                            <p style={{ fontSize: "16px" }} >Hotels</p>
                        </ListItemText>
                    </div>
                </ListItem>
                </Link>
            </List>  
             <List>
             <Link className="link" to="/" >
                <ListItem onClick={() => setMenu3(!menu3)} button>
                    <div style={{ display: "flex", alignItems: "center" }} >
                        <ListItemIcon>
                            <DirectionsCarIcon style={{ transform: "scale(1.5)" }} />
                        </ListItemIcon>
                        <ListItemText>
                            <p style={{ fontSize: "16px" }} >Cars</p>
                        </ListItemText>
                    </div>
                </ListItem>
                </Link>
            </List> 
            <List>
                <Link className="link" to="/" >
                    <ListItem onClick={toggleDrawer(anchor, false)} button>
                        <div style={{ display: "flex", alignItems: "center" }} >
                            <ListItemIcon>
                                <HouseboatIcon style={{ transform: "scale(1.5)" }} />
                            </ListItemIcon>
                            <ListItemText>
                                <p style={{ fontSize: "16px" }} >Holidays (Coming Soon)</p>
                            </ListItemText>
                        </div>
                    </ListItem>
                </Link>
            </List>
            <List>
                <Link className="link" to="/about" >
                    <ListItem onClick={toggleDrawer(anchor, false)} button>
                        <div style={{ display: "flex", alignItems: "center" }} >
                            <ListItemIcon>
                                <AddBusinessIcon style={{ transform: "scale(1.5)" }} />
                            </ListItemIcon>
                            <ListItemText>
                                <p style={{ fontSize: "16px" }} >About </p>
                            </ListItemText>
                        </div>
                    </ListItem>
                </Link>
            </List>
            <List>
                <Link className="link" to="/contact" >
                    <ListItem onClick={toggleDrawer(anchor, false)} button>
                        <div style={{ display: "flex", alignItems: "center" }} >
                            <ListItemIcon>
                                <AddBusinessIcon style={{ transform: "scale(1.5)" }} />
                            </ListItemIcon>
                            <ListItemText>
                                <p style={{ fontSize: "16px" }} >Contact </p>
                            </ListItemText>
                        </div>
                    </ListItem>
                </Link>
            </List>
            <List>
                <Link className="link" to="/faq" >
                    <ListItem onClick={toggleDrawer(anchor, false)} button>
                        <div style={{ display: "flex", alignItems: "center" }} >
                            <ListItemIcon>
                                <HelpOutlineIcon style={{ transform: "scale(1.5)" }} />
                            </ListItemIcon>
                            <ListItemText>
                                <p style={{ fontSize: "16px" }} >Help</p>
                            </ListItemText>
                        </div>
                    </ListItem>
                </Link>
            </List>
            {currentUser ?
                <List>
                    <ListItem onClick={toggleDrawer(anchor, false)} button>
                        <div onClick={show} style={{ display: "flex", alignItems: "center" }} >
                            <ListItemIcon>
                                <ExitToAppIcon style={{ transform: "scale(1.5)" }} />
                            </ListItemIcon>
                            <ListItemText>
                                <p style={{ fontSize: "16px" }} >Logout</p>
                            </ListItemText>
                        </div>
                    </ListItem>
                </List> :
                <List>
                    <Link className="link" to="/login" >
                        <ListItem onClick={toggleDrawer(anchor, false)} button>
                            <div style={{ display: "flex", alignItems: "center" }} >
                                <ListItemIcon>
                                    <PersonIcon style={{ transform: "scale(1.5)" }} />
                                </ListItemIcon>
                                <ListItemText>
                                    <p style={{ fontSize: "16px" }} >Login</p>
                                </ListItemText>
                            </div>
                        </ListItem>
                    </Link>
                </List>
            }
        </div>
    );

    const ctn = useRef();
    const ctn2 = useRef();
    const ctn3 = useRef();

    useEffect(() => {
        const handler = (event) => {
            if (!ctn.current?.contains(event.target)) {
                setMenu1(false);
            }
            if (!ctn2.current?.contains(event.target)) {
                setMenu2(false);
            }
            if (!ctn3.current?.contains(event.target)) {
                setMenu3(false);
            }
        };
        document.addEventListener("mouseover", handler);
        return () => {
            document.removeEventListener("mouseover", handler);
        };
    });
    return (
        <>
            <TopBarTwoWrpapper>
                <div className="topbar-two-wrapper">
                    <Fade top>
                        <Link className='link' to="/" >
                            <div className="border-b-3 border-teal-500 pb-1 transition-all hover:border-teal-300">
                                <img className='lg:h-36 lg:w-200 w-56 h-24' src="images/main_logo.png" alt="" />
                            </div>
                        </Link>
                    </Fade>
                    <Fade delay={200} right>


                        <div className="menu">
                            <div className="menues">
                                <Link className="link" to="/" ><p className="text">Home</p></Link>
                            </div>
                            <div className="menues">
                                <Link className="link" to="/flights" ><p className="text">Flights</p></Link>
                            </div>
                            <div className="menues">
                                <Link className="link" to="/hotels" ><p className="text">Hotels</p></Link>
                            </div>
                            <div className="menues">
                                <Link className="link" to="/" ><p className="text">Cars (Coming Soon)</p></Link>
                            </div>
                        
                            <div className="menues">
                                <Link className="link" to="/" ><p className="text">Holidays (Coming Soon)</p></Link>
                            </div>
                            <div className="menues">
                                <Link className="link" to="/about" ><p className="text">About</p></Link>
                            </div>
                            <div className="menues">
                                <Link className="link" to="/contact" ><p className="text">Contact</p></Link>
                            </div>
                            
                            <div className="menues">
                                <Link className="link" to="/faq" ><p className="text">Help</p></Link>
                            </div>
                            {currentUser ?
                                <div className="menues">
                                    <p onClick={show} className="text">Logout</p>
                                </div> :
                                <div className="menues">
                                    <Link className="link" to="/login" ><p className="text">Login</p></Link>
                                </div>
                            }
                        </div>
                    </Fade>
                    <Fade delay={200} right >
                        <div className='menuButton' >
                            <MenuIcon style={{ transform: "scale(3)", cursor: "pointer" }} onClick={toggleDrawer("right", true)} />
                        </div>
                    </Fade>
                    <SwipeableDrawer
                        anchor={"right"}
                        open={state["right"]}
                        onClose={toggleDrawer("right", false)}
                        onOpen={toggleDrawer("right", true)}
                    >
                        {list("right")}
                    </SwipeableDrawer>

                </div>
            </TopBarTwoWrpapper>
            <PermissionCard open={loggingOut} cancel={clear} />

        </>
    )
}



const TopBarTwoWrpapper = styled.div`
    padding: 10px  0;
    width: 100vw;
    height: 130px;
    display: flex;
    justify-content: center;
    z-index: 20000;
    // margin-bottom: 25px;
    ${mobile({ justifyContent: "flex-start" , height: "80px" })}
    .topbar-two-wrapper{
        display: flex;
        justify-content: space-between;
        width: 60vw;
        ${mobile({ width: "100%" })}
    }
    .header{
        display: flex;
        align-items: center;
        transition: all 250ms ease;
        cursor: pointer;
        ${mobile({ paddingLeft: "20px" })}
        ::before{
            content: "";
            right: 0;
            left: 0;
            height: 4px;
            background-color: #00a99d;
            position: absolute;
            bottom: -10px;
            transition: all 250ms ease-in-out;
        }
        &:hover::before{
            background-color: teal;
        }
    }
    
    .menu{
        display: flex;
        width: 80rem;
        justify-content: space-between;
        align-items: center;
        ${mobile({ display: "none" })}
    }
    .menues{
        text-align: center;
        padding: 0 6px;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        position: relative;
        z-index: 5000000;
        &::before{
            content: "";
            right: 0;
            left: 0;
            height: 2px;
            color: red;
            background-color: #00a99d;
            position: absolute;
            bottom: 0;
            display: none;
        }
        &:hover{
            ::before{
                display: block;
                transition: all 250ms ease;
            }
        }
    }
    .dropdown-menu1, .dropdown-menu2, .dropdown-menu3{
        position: relative;
    }
    .dd-menu1, .dd-menu2, .dd-menu3{
        position: absolute;
        top: 30px;
        left: -10px;
        white-space: nowrap;
        padding: 15px 20px 4px 20px;
        text-align: start;
        background-color: #fff;
        animation: showMenu 0.3s ease;
        z-index: 5000000;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        p{
            border-bottom: 1px solid #E2E2E2;
            padding-bottom: 2px;
        }
        @keyframes showMenu {
            from{
                transform: scaleZ(0.7) translateY(-10px);
            } 
            to{
                transform: scaleZ(1) translateY(0px);
            }
        }
    }
    .text{
        color: #8c8c8c;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
        user-select: none;
        font-size: 15px;
        white-space: nowrap;
        &:hover{
            color: #00a99d;
        }
    }
    .menuButton{
        display: none;
        ${mobile({ display: "flex", alignItems: "center", marginRight: "30px" })}
    }
    .link{
        color: inherit;
        text-decoration: none;
    }
`

export default TopBarTwo