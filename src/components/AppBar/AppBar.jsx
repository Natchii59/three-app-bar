import { Canvas } from '@react-three/fiber';
import { useState } from 'react';
import styled from 'styled-components';
import Menu from './Menu';

export default function AppBar() {
  const [closeMenu, setCloseMenu] = useState(false);

  return (
    <AppBarBody>
      <h1>App Name</h1>

      <MenuBody onClick={() => setCloseMenu(!closeMenu)}>
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight />
          <Menu closeMenu={closeMenu} />
        </Canvas>

        <MenuContainer close={!closeMenu}>
          <MenuLink>Home</MenuLink>
          <MenuLink>Works</MenuLink>
          <MenuLink>About</MenuLink>
        </MenuContainer>
      </MenuBody>
    </AppBarBody>
  );
}

const AppBarBody = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  padding: 1rem;
`;

const MenuBody = styled.button`
  width: 100px;
  height: 4rem;
  border: none;
  outline: none;
  background: none;
  position: relative;

  & canvas {
    cursor: pointer;
  }
`;

const MenuContainer = styled.ul`
  position: absolute;
  right: ${({ close }) => (close ? '-15rem' : '0')};
  width: 10rem;
  border-radius: 0.2rem;
  border: solid 1px #18181c7d;
  background-color: white;
  box-shadow: 0 0 8px #18181c7d;
  transition: right 0.3s ease-in-out;
`;

const MenuLink = styled.li`
  list-style: none;
  text-align: start;
  padding: 0.3rem 0.6rem;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
