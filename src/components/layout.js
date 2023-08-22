import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import * as icons from 'react-icons/ri';
import * as md_icons from "react-icons/md";
import { Link } from 'gatsby';
import Sidebar from '../components/sidebar';

const Layout = ({ pageTitle, children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef();

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
  }, []);

  const handleToggleDarkMode = () => {
    const newMode = !darkMode;
    localStorage.setItem('darkMode', newMode);
    setDarkMode(newMode);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  // Close menu when window width grows above sm=640px
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 640 && isOpen) {
        setIsOpen(false);
      }
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  

  return ( 
    <div className={`flex flex-col w-full min-h-screen h-full ${darkMode ? 'dark bg-slate-800' : 'light bg-slate-50'} transition ease-in-out duration-500`}>
      <header className="3xl:w-[1792px] 3xl:mx-auto text-slate-500 bg-slate-50 dark:bg-slate-800 dark:text-white pt-2 sticky top-0 z-50 transition ease-in-out duration-500">
        <div className="container mx-auto w-5/6">
          <div className="flex justify-between items-center">
            {/* Home button and name */}
            <Link to="/" className="flex flex-row font-bold">
              <button type="button" className="py-2 text-center" aria-label='go to home page'>
                <icons.RiHome3Fill className="text-slate-800 dark:text-white hover:scale-150 duration-300" size={18} />
              </button>
              <div className="font-bold hover:underline p-2 text-center">
                Author
              </div>
            </Link>
            {/* Big screens: links and dark mode button*/}
            <div className='hidden sm:flex'>
              <nav className="flex justify-end items-center">
                <ul className="flex flex-row justify-end items-center list-none space-x-4 font-bold">
                  <li><Link to="/" className='hover:underline'>About</Link></li>
                  <li><Link to="/projects" className='hover:underline'>Projects</Link></li>
                  <li><Link to="/blog" className='hover:underline'>Blog</Link></li>
                  <li><Link href="https://drive.google.com/" target='_blank' rel="noreferrer" className='hover:underline'>CV</Link></li>
                  <div className="cursor-pointer inset-x-0 inset-y-0" onClick={handleToggleDarkMode}>
                    {darkMode ? <icons.RiSunFill className="text-slate-800 dark:text-white hover:scale-150 duration-300" size={18}/> : <icons.RiMoonFill className="text-slate-800 dark:text-white hover:scale-150 duration-300" size={18} />}
                  </div>
                </ul>
              </nav>
            </div>
            {/* Small screens: sidebar menu*/}
            <div className={`sm:hidden flex flex-row space-x-4 items-center`}>
              {/* Sidebar Menu */}
              <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}>
                <div className={`flex flex-col h-full w-48 ${darkMode ? 'dark bg-slate-100' : 'light bg-slate-800'} transition ease-in-out duration-500`}>
                  <div className="pl-4 pt-4 pb-2 inset-x-0 inset-y-0">
                    <md_icons.MdArrowForwardIos className="cursor-pointer text-white dark:text-slate-500 hover:scale-150 duration-300" size={18} onClick={()=>setIsOpen(false)}/>
                  </div>
                  <Link to="/" className={`flex w-full justify-center text-center px-4 py-2 text-white dark:text-slate-500 hover:bg-slate-700 dark:hover:bg-slate-200 hover:underline`} onClick={()=>setIsOpen(false)}> About </Link>
                  <Link to="/projects" className={`flex w-full justify-center text-center px-4 py-2 text-white dark:text-slate-500 hover:bg-slate-700 dark:hover:bg-slate-200 hover:underline`} onClick={()=>setIsOpen(false)}> Projects </Link>
                  <Link to="/blog" className={`flex w-full justify-center text-center px-4 py-2 text-white dark:text-slate-500 hover:bg-slate-700 dark:hover:bg-slate-200 hover:underline`} onClick={()=>setIsOpen(false)}> Blog </Link>
                  <Link href="https://drive.google.com/" target='_blank' className={`flex w-full justify-center text-center px-4 py-2 text-white dark:text-slate-500 hover:bg-slate-700 dark:hover:bg-slate-200 hover:underline`} onClick={()=>setIsOpen(false)}> CV </Link>
                  <div className="flex justify-center text-center inset-x-0 inset-y-0 px-4 py-2" onClick={handleToggleDarkMode}>
                    {darkMode ? <icons.RiSunFill className="cursor-pointer text-white dark:text-slate-800 hover:scale-150 duration-300" size={18}/> : <icons.RiMoonFill className="cursor-pointer text-white dark:text-slate-800 hover:scale-150 duration-300" size={18} />}
                  </div>
                </div>
              </Sidebar>
            </div>
            
          </div>
        </div>

        <div>
          <hr className="mt-2 border-2 border-slate-800 dark:border-white"/>
        </div>

      </header>

      <main className="3xl:w-[1792px] 3xl:mx-auto flex flex-col flex-grow py-0 text-slate-800 dark:text-white z-0">
        <div className="flex flex-grow container mx-auto w-5/6">
          <header className='text-3xl'>{pageTitle}</header>
          {children}
        </div>

        <div className="py-4">
          <hr className="border-1 border-slate-800 dark:border-white"/>
        </div>

        <footer className="container mx-auto text-center text-sm pb-2">
        <p class="cp-text">
          © {new Date().getFullYear()} <span className="font-bold">Designed by Author. Inspired by <Link href='https://www.github.com/ibrahim-didi/elegant-portfolio'>elegant-portfolio</Link>.</span>
        </p>
        </footer>
      </main>
    </div>
  );
};

export default Layout;
