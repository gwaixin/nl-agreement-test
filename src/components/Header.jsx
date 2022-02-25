import { NavLink } from 'react-router-dom';
import {
  CNavbar,
  CContainer,
  CNavbarNav,
  CNavItem,
  CNavLink
} from '@coreui/react';

function Header() {
  return (
    <CNavbar expand="lg" colorScheme="light" className="bg-light mb-5">
      <CContainer fluid>
          <CNavbarNav className="w-100 d-flex justify-content-end">

            <CNavItem className="mr-1">
              <CNavLink  component={NavLink} to="/">Home</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink  component={NavLink} to="/consents">Consents</CNavLink>
            </CNavItem>
          </CNavbarNav>
      </CContainer>
    </CNavbar>
  )
}

export default Header;