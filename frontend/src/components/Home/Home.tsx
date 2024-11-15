import React from 'react'
import ShowTable from './ShowTable'
import Header from '../ui/Header'
import { Container } from '@mui/material'

export default function Home() {
    return (
        <>
            <Container>
                <Header text='Contact Table' />
                <ShowTable />
            </Container>
        </>
    )
}
