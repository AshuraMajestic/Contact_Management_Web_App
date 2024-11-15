import React from 'react'
import Header from '../ui/Header'
import { Container } from '@mui/material'
import AddForm from './AddForm'

export default function AddContact() {
    return (
        <>
            <Container >
                <Header text='Add Contact' />
                <AddForm />
            </Container>
        </>
    )
}
