import { useState } from 'react';
import {
    Box,
    TextField,
    FormControl,
    InputLabel,
    OutlinedInput,
    Button,
} from '@mui/material';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        jobTitle: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);  // For error message

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null); // Reset error message before submission

        const data = {
            firstname: formData.firstName,
            lastname: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            company: formData.company,
            jobtitle: formData.jobTitle,
        };

        try {
            const response = await fetch('http://localhost:5000/add-contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to Add the contact');
            }
            window.location.href = '/';
        } catch (error) {
            console.error('Error Adding contact:', error);
            setError('Error adding contact. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <TextField
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    fullWidth
                    sx={styles.textField}
                />
                <TextField
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    fullWidth
                    sx={styles.textField}
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    sx={styles.textField}
                />
                <FormControl fullWidth sx={styles.formControl}>
                    <InputLabel htmlFor="outlined-adornment-phone">Phone</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        label="Phone"
                    />
                </FormControl>
                <TextField
                    label="Company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    fullWidth
                    sx={styles.textField}
                />
                <TextField
                    label="Job Title"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    fullWidth
                    sx={styles.textField}
                />

                {/* Show error message if there's an error */}
                {error && <p style={{ color: 'red' }}>{error}</p>}

                {/* Show loading state while submitting */}
                {loading ? (
                    <Button type="submit" variant="contained" color="primary" disabled sx={styles.submitButton}>
                        Submitting...
                    </Button>
                ) : (
                    <Button type="submit" variant="contained" color="primary" sx={styles.submitButton}>
                        Submit
                    </Button>
                )}
            </form>
        </Box>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',


    },
    form: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
    textField: {
        marginBottom: '20px',
    },
    formControl: {
        marginBottom: '20px',
    },
    submitButton: {
        padding: '10px 30px',
    },
};
