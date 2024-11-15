import { useParams } from "react-router-dom";
import Header from "../ui/Header";
import { useEffect, useState } from "react";
import EditForm from "./EditForm";
import { Container } from "@mui/material";

export default function EditContact() {
    const { contactId } = useParams();
    const [data, setData] = useState<{
        _id: string;
        firstname: string;
        lastname: string;
        email: string;
        phone: string;
        company: string;
        jobtitle: string;
    } | null>(null); // Initialize as null

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch('http://localhost:5000/contact-detail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ eid: contactId }),
                });

                if (!response.ok) {
                    throw new Error('Failed to get Detail');
                }

                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        getData();
    }, [contactId]);

    return (
        <>
            <Container>
                <Header text="Edit Contact" />
                {data ? ( // Conditionally render EditForm
                    <EditForm data={data} />
                ) : (
                    <p>Loading contact details...</p>
                )}
            </Container>
        </>
    );
}
