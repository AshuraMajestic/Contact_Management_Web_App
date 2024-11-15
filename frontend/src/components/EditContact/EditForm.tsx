import { useEffect, useState } from 'react';
import {
    Box,
    TextField,
    FormControl,
    InputLabel,
    OutlinedInput,
    Button,
} from '@mui/material';

interface FormProps {
    data: {
        _id: string;
        firstname: string;
        lastname: string;
        email: string;
        phone: string;
        company: string;
        jobtitle: string;
    };
}
export default function EditForm({ data }: FormProps) {
    const [formData, setFormData] = useState({
        eid: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        jobTitle: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (data) {
            setFormData({
                eid: data._id,
                firstName: data.firstname,
                lastName: data.lastname,
                email: data.email,
                phone: data.phone,
                company: data.company,
                jobTitle: data.jobtitle,
            });
        }
    }, [data]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const data = {
            eid: formData.eid,
            firstname: formData.firstName,
            lastname: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            company: formData.company,
            jobtitle: formData.jobTitle,
        };

        try {
            const response = await fetch(`http://localhost:5000/edit-contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to update the contact');
            }

            window.location.href = '/';
        } catch (error) {
            console.error('Error updating contact:', error);
            setError('Error updating contact. Please try again later.');
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
