import * as React from 'react';
import { Drawer } from '@mui/material';
import * as icons from 'react-icons/ri';

const Sidebar = ({isOpen, setIsOpen, children}) => {
  // const [open, setOpen] = useState(false);

  const toggleDrawer = (isOpen) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    // setOpen(open);
    setIsOpen(isOpen)
  };

  return (
    <>
      <button onClick={toggleDrawer(true)} aria-label='open menu'>
        <icons.RiMenuFill className="text-slate-800 dark:text-white hover:scale-150 duration-300" size={18}/>
      </button>
      <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)} style={{backgroundColor: 'rgba(0, 0, 0, 0.1)', boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.1)', backdropFilter: 'blur(2px)'}}>
        {children}
      </Drawer>
    </>
  );
};

export default Sidebar;