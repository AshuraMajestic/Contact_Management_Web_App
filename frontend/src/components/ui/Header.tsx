import { Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react';

interface HeaderProps {
    text: string;
}

export default function Header({ text }: HeaderProps) {
    const handleBack = () => {
        window.history.back(); // Navigate to the previous page
    };

    const handleAddContact = () => {
        window.location.href = '/addcontact'; // Navigate to the add contact page
    };

    return (
        <div className="header" style={styles.header}>
            <div style={styles.leftSection}>
                {text !== 'Contact Table' && (
                    <IconButton onClick={handleBack} style={styles.backButton}>
                        <ArrowBackIcon />
                    </IconButton>
                )}
                <div style={styles.title}>{text}</div>
            </div>
            {text === 'Contact Table' && (
                <Button variant="outlined" color="secondary" onClick={handleAddContact}>
                    Add New Contact
                </Button>
            )}
        </div>
    );
}

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid #ddd',
    },
    leftSection: {
        display: 'flex',
        alignItems: 'center',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginLeft: '10px',
    },
    backButton: {
        marginRight: '10px',
    },
};
