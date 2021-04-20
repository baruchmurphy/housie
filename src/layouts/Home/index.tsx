import React, { useState, useEffect } from "react";
import { 
    AppBar, 
    Toolbar, 
    Typography, 
    MenuItem, 
    Menu, 
    Drawer, 
    Avatar, 
    IconButton, 
    createStyles, 
    makeStyles, 
    Theme,
    Divider,
    List,
    ListItem,
    ListItemText,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useHistory } from "react-router-dom";
import Finance from '../../views/Pages/finance/finance';
import Planning from '../../views/Pages/planning/planning';
import Chores from '../../views/Pages/chores/chores';
import Lists from '../../views/Pages/lists/lists';
import Grocerylist from '../../views/Pages/lists/grocerylist/grocerylist';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        root: {
            flexGrow: 1,
        },
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
        width: drawerWidth,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        avatarmenu: {
            marginTop: theme.spacing(5),
        },
        avatar: {
            cursor: 'pointer',
        },
        list: {
            width: 250,
        },
        fullList: {
            width: 'auto',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: -drawerWidth,
          },
          contentShift: {
            transition: theme.transitions.create('margin', {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
          },
    })
);

const Home = ({ children }: {children: any}) => {
    const [error, setError] = useState("");
    const [anchorEl, setAnchorEl] = useState<any>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [content, setContent] = useState<any>(null)
    const { logout, profile, currentUser } = useAuth();
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        if(history.location.pathname !== '/home') {
            switch(history.location.pathname) {
                case '/home/finance':
                    setContent(<Finance />)
                    break;
                case '/home/chores':
                    setContent(<Chores />)
                    break;
                case '/home/planning':
                    setContent(<Planning />)
                    break;
                case '/home/lists':
                    setContent(<Lists />)
                    break;
                case '/home/lists/grocerylist':
                    setContent(<Grocerylist />)
                    break;
                default: 
                    setContent(null)
            }
        }
    },[history.location.pathname])

    const handleLogout = async () => {
        setError('')
        handleClose()
        try {
            await logout()
            history.push('/login')
        }   catch {
            setError('failed to logout')
            console.log(error)
        }
    };

    const drawerItems = [
        {
            name: 'Finance',
            to: '/home/finance'
        },
        {
            name: 'Chores',
            to: '/home/chores'
        },
        {
            name: 'Planning',
            to: '/home/planning'
        },
        {
            name: 'Lists',
            to: '/home/lists'
        }
    ];

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget)
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const renderDrawerList = () => {
        return drawerItems.map(item => {
            return (
                <div onClick={() => setDrawerOpen(false)} key={item.name}>
                    <Link to={item.to} style={{ textDecoration: 'none' }}>
                        <ListItem button>
                            <ListItemText primary={item.name} />
                        </ListItem>
                    </Link>
                </div>
            );
        });
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton 
                        edge="start" 
                        className={classes.menuButton} 
                        color="inherit" 
                        aria-label="menu"
                        onClick={() => setDrawerOpen(true)}
                    >
                        
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" className={classes.title}>
                        Housie
                    </Typography>
                    
                    <Avatar className={classes.avatar} alt="Guy McDude" src="profile.jpg" aria-haspopup="true" onClick={handleClick} />
                    <Menu
                        className={classes.avatarmenu}
                        id="profilemenu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={() => {
                            history.push('home/settings')
                            handleClose()
                        }}>My Account</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={drawerOpen}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={() => setDrawerOpen(false)} >
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {renderDrawerList()}
                    </List>
                    <Divider />
                </Drawer>
            </AppBar>
            <main>{content}</main>
        </div>
    );
};

export default Home;