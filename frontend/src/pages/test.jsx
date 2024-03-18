import { useTheme } from "next-themes";

export default function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <h1 className=" bg-white dark:bg-slate-500 text-red-500 dark:text-white">Test Page</h1>
      <h1 className=" dark">Test Page</h1>

      <div>
        <p
          
        >
          The current theme is: {theme}
          <br />
        </p>
        <button
          onClick={() => setTheme("light")}
          style={{
            backgroundColor: theme === "dark" ? "black" : "white",
          }}
        >
          Light Mode
        </button>
        <button
          onClick={() => setTheme("dark")}
          style={{
            backgroundColor: theme === "light" ? "black" : "white",
            text: theme === "light" ? "white" : "black",
          }}
        >
          Dark Mode 
        </button>
      </div>
    </>
  );
}
