import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress for loading spinner
import { useNavigate } from 'react-router-dom';

interface Column {
    id: 'firstname' | 'lastname' | 'email' | 'phone' | 'company' | 'jobtitle' | 'actions';
    label: string;
    minWidth?: number;
    align?: 'right' | 'center';
}

const columns: readonly Column[] = [
    { id: 'firstname', label: 'First Name', minWidth: 170 },
    { id: 'lastname', label: 'Last Name', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 170 },
    { id: 'phone', label: 'Phone', minWidth: 170, align: 'right' },
    { id: 'company', label: 'Company', minWidth: 170 },
    { id: 'jobtitle', label: 'Job Title', minWidth: 170 },
    { id: 'actions', label: 'Actions', minWidth: 50, align: 'center' },
];

interface Data {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    company: string;
    jobtitle: string;
}

export default function ShowTable() {
    const [rows, setRows] = useState<Data[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true); // State for loading
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedRow, setSelectedRow] = useState<Data | null>(null);

    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/all-contact')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setRows(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    }, []);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>, row: Data) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(row);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedRow(null);
    };

    const handleEdit = () => {
        if (selectedRow) {
            navigate(`/edit-contact/${selectedRow._id}`);
        }
        handleMenuClose();
    };

    const handleDelete = async () => {
        if (selectedRow) {
            try {
                const response = await fetch('http://localhost:5000/delete-contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ eid: selectedRow._id }),
                });

                if (!response.ok) {
                    throw new Error('Failed to delete the contact');
                }

                setRows((prevRows) => prevRows.filter((row) => row._id !== selectedRow._id));
                console.log('Contact deleted successfully');
            } catch (error) {
                console.error('Error deleting contact:', error);
            }
        }
        handleMenuClose();
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            {isLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                    <CircularProgress /> {/* Loading spinner */}
                </div>
            ) : (
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                        {columns.map((column) => {
                                            if (column.id === 'actions') {
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        <IconButton
                                                            onClick={(event) => handleMenuClick(event, row)}
                                                        >
                                                            <MoreVertIcon />
                                                        </IconButton>
                                                        <Menu
                                                            anchorEl={anchorEl}
                                                            open={open}
                                                            onClose={handleMenuClose}
                                                        >
                                                            <MenuItem onClick={handleEdit}>Edit</MenuItem>
                                                            <MenuItem onClick={handleDelete}>Delete</MenuItem>
                                                        </Menu>
                                                    </TableCell>
                                                );
                                            }
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Paper>
    );
}
