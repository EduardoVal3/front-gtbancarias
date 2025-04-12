import React, { useState } from 'react';
import { MyRoutes } from './src/routers/routes';
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { Sidebar } from './src/components/Sidebar';
import { Light,Dark } from './src/styles/Themes';

export const ThemeContext = React.
createContext(null);
function App() {
  const [theme, setTheme]= useState("light");
  const themeStyle=theme==="light"?Light:Dark;

const [sidebarOpen, setSidebarOpen]=useState(false);
  return (
    <>
    <ThemeContext.Provider value={{setTheme,theme}}>
      <ThemeProvider theme={themeStyle}>
      <BrowserRouter>
        <Container className={sidebarOpen?"sidebarState active":""}>
              <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
              <MyRoutes />
        </Container>
      </BrowserRouter>
      </ThemeProvider>
    </ThemeContext.Provider>
    </>
  );
}
const Container = styled.div`
  min-height: 100vh;
  padding-left: ${({ className }) =>
    className?.includes("active") ? "300px" : "90px"};
  background: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
  transition: padding-left 0.3s;
`;
export default App;