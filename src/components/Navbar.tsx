import useDarkMode from "../Hooks/useDarkMode";

const Navbar = () => {
  const changeTheme = useDarkMode();

  return (
    <nav className="p-5 w-full bg-white dark:bg-slate-700 text-black dark:text-white shadow-lg flex justify-center sticky top-0">
      <div className="max-w-screen-xl w-full flex justify-between items-center">
        <h1 className="font-semibold text-base md:text-xl lg:px-5">Where in the world?</h1>
        <button className="font-medium text-sm md:pr-8" onClick={changeTheme}>
          Dark Mode
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
