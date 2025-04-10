// App.jsx
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
  height:100vh;
  display: grid;
  grid-template-columns: 90px auto;
  background: ${({ theme }) => theme.bgtotal};
  transition:all 0.3s ;
  &.active {
    grid-template-columns: 300px auto;
  }
  color:${({theme})=>theme.text};
`;
export default App;