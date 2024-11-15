import { AppBar, Container, Toolbar } from '@mui/material'
import React from 'react'

export default function Nav() {
    return (
        <AppBar position='static' color='secondary' >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <h1 className='heading'>Contact Management System</h1>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
