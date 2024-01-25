import { FilterAlt, Edit, DeleteForever } from '@mui/icons-material';

import {
    Box,
    Checkbox,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Alert,
    AlertTitle,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    CircularProgress
} from '@mui/material';

import React, { useEffect, useState } from 'react';
import { filter, remove } from '../../services/customerService';
import LoadingComponent from '../../components/loading';

const columns = [
    { id: 'select', label: '', minWidth: 50 },
    { id: 'name', label: 'Nome', minWidth: 100 },
    { id: 'email', label: 'Email', minWidth: 150 },
    { id: 'gender', label: 'Gênero', minWidth: 100 },
    { id: 'edit', label: '', minWidth: 5 },
];

const CustomerList = ({ onEdit }) => {
    const alertMessageInitState = { success: false, message: '' }

    const filterValueInitState = {
        name: '',
        email: '',
        gender: '',
        city: '',
        state: '',
    };

    const [selectedRows, setSelectedRows] = useState([]);

    const [alertMessage, setAlertMessage] = useState(alertMessageInitState)

    const [customers, setCustomers] = useState([])

    const [open, setOpen] = useState(false);

    const [filterValues, setFilterValues] = useState(filterValueInitState);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCustomers()
    }, [])

    const fetchCustomers = (params) => {

        try {
            setLoading(true)

            filter(params).then(response => {

                if (response.success) {
                    setCustomers(response.customers)
                }
            })
        } finally {
            setLoading(false)
        }
    }

    const handleCheckboxChange = (event, id) => {
        if (event.target.checked) {
            setSelectedRows([...selectedRows, id]);
        } else {
            setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
        }
    };

    const handleDeleteSelected = () => {

        remove(selectedRows).then((response) => {
            setAlertMessage(response);
            fetchCustomers()
        })
    };

    const handleEdit = (customer) => {
        onEdit(customer);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;

        setFilterValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleClear = () => {
        setFilterValues(filterValueInitState)

        handleClose();

        fetchCustomers(filterValueInitState)

    }

    const handleApplyFilter = () => {
        fetchCustomers(filterValues)

        handleClose();
    };

    return (
        <>
            {
                (
                    !alertMessage.success && alertMessage.message &&
                    <Alert severity="error" onClose={() => {
                        setAlertMessage(alertMessageInitState);
                    }}>
                        {alertMessage.message}
                    </Alert>
                )
            }

            {
                alertMessage.success && alertMessage.message &&
                <Alert
                    severity="success" onClose={() => {
                        setAlertMessage(alertMessageInitState);
                    }}>
                    <AlertTitle>Sucesso</AlertTitle>
                    {alertMessage.message}
                </Alert>
            }

            {loading && <LoadingComponent />}

            <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between' }}>
                {
                    customers.length > 0 &&
                    <IconButton
                        color="primary"
                        onClick={handleDeleteSelected}
                        disabled={selectedRows.length === 0}
                    >
                        <DeleteForever />
                    </IconButton>
                }

                {
                    <IconButton
                        color="primary"
                        onClick={handleOpen}
                    >
                        <FilterAlt />
                    </IconButton>
                }
            </div>

            <Paper>
                <Box style={{ marginTop: '10px' }}></Box>
                {
                    customers.length > 0
                        ? <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell key={column.id} style={{ minWidth: column.minWidth, fontWeight: 'bold' }}>
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {customers.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell>
                                                <Checkbox
                                                    checked={selectedRows.includes(row.id)}
                                                    onChange={(event) => handleCheckboxChange(event, row.id)}
                                                />
                                            </TableCell>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.email}</TableCell>
                                            <TableCell>{row.gender == 'M' ? 'Masculino' : 'Feminimo'}</TableCell>
                                            <TableCell>
                                                <IconButton
                                                    color="secondary"
                                                    onClick={() => handleEdit(row)}>
                                                    <Edit />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        : <center style={{ padding: 8 }}><h3>Não há clientes cadastrados</h3></center>
                }
            </Paper>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Filtros do cliente</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Nome"
                        name="name"
                        value={filterValues.name}
                        onChange={handleFilterChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={filterValues.email}
                        onChange={handleFilterChange}
                        fullWidth
                        margin="normal"
                    />
                    <RadioGroup
                        aria-label="Gênero"
                        name="gender"
                        value={filterValues.gender}
                        onChange={handleFilterChange}
                    >
                        <FormControlLabel value="M" control={<Radio />} label="Masculino" />
                        <FormControlLabel value="F" control={<Radio />} label="Feminino" />
                    </RadioGroup>
                    <TextField
                        label="Cidade"
                        name="city"
                        value={filterValues.city}
                        onChange={handleFilterChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Estado"
                        name="state"
                        value={filterValues.state}
                        onChange={handleFilterChange}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClear} color="primary" style={{ marginRight: 172 }}>
                        Limpar
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Fechar
                    </Button>
                    <Button onClick={handleApplyFilter} color="primary">
                        Aplicar
                    </Button>
                </DialogActions>
            </Dialog >
        </>
    );
};

export default CustomerList;
