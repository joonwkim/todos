'use client'
import { Container, Nav, Navbar } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { NextRequest } from 'next/server';
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useSession, signIn, signOut } from 'next-auth/react'

interface Props {

}

const Header = () => {

  const { data: session } = useSession()
  const isLogin = false;

  const onClick = (e: any) => {
    e.preventDefault()
    signIn()
  }

  return (
    <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Brand href="/">
          {'AmiAiLab '}
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">Todos</Nav.Link>
            <Nav.Link href="/categories">Categories</Nav.Link>
            <Nav.Link href="/userstodos">User and Todos</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header