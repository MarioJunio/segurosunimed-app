import React, { useEffect, useState } from 'react';
import Add from '@mui/icons-material/Add';
import {
    TextField,
    Button,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Chip,
    Box,
    Alert,
    AlertTitle,
    IconButton,
    CircularProgress
} from '@mui/material';

import { create, edit } from '../../services/customerService';

const CreateCustomer = ({ customerEditing, onClearEditing }) => {

    const alertMessageInitState = { success: false, message: '' }

    const formDataInitState = {
        name: '',
        email: '',
        gender: 'M',
        cep: '',
    }

    const [formData, setFormData] = useState(formDataInitState);

    const [ceps, setCeps] = useState([]);

    const [alertMessage, setAlertMessage] = useState(alertMessageInitState)

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (customerEditing) {
            console.log('useEffect: Customer editing: ', customerEditing);

            setFormData(customerEditing);
            setCeps(customerEditing.addresses.map(address => address.cep))
        }
    }, [customerEditing]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleAddChip = () => {
        if (formData.cep.trim() !== '') {
            setCeps([...ceps, formData.cep.trim()]);

            setFormData({
                ...formData,
                cep: '',
            });
        }
    };

    const handleDeleteChip = (index) => {
        const newCeps = [...ceps];

        newCeps.splice(index, 1);

        setCeps(newCeps);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        var response = null;

        try {
            setLoading(true)

            if (formData.id) {
                response = await edit(formData.id, { ...formData, ceps: ceps })
            } else {
                response = await create({
                    name: formData.name,
                    email: formData.email,
                    gender: formData.gender,
                    ceps: ceps
                })
            }

        } finally {
            setLoading(false)
        }


        setAlertMessage(response)

        // reset fields
        if (response.success) {
            setFormData(formDataInitState)
            setCeps([])
            onClearEditing()
        }
    };

    return (
        <Box>
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

            <div>
                {loading && <CircularProgress color="primary" size={15} />}
                <span style={{ marginLeft: loading ? 16 : 0 }}>{formData.id ? 'Editando cliente' : 'Novo cliente'}</span>
            </div>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Nome"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />

                <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />

                <FormControl component="fieldset" margin="normal">
                    <FormLabel component="legend">Gênero</FormLabel>
                    <RadioGroup name="gender" value={formData.gender} onChange={handleInputChange} row>
                        <FormControlLabel value="M" control={<Radio />} label="Masculino" />
                        <FormControlLabel value="F" control={<Radio />} label="Feminino" />
                    </RadioGroup>
                </FormControl>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <TextField
                        label="Adicionar CEP"
                        name="cep"
                        type='number'
                        value={formData.cep}
                        onChange={handleInputChange}
                        variant="outlined"
                    />
                    <IconButton
                        style={{ marginLeft: 8 }}
                        color="primary"
                        onClick={handleAddChip}
                        disabled={loading}
                    >
                        <Add />
                    </IconButton>
                </div>

                <div>
                    {ceps.map((chip, index) => (
                        <Chip
                            key={index}
                            label={chip}
                            style={{ marginRight: 8, marginBottom: 8 }}
                            onDelete={() => handleDeleteChip(index)}
                        />
                    ))}
                </div>

                <Button type="submit" variant="contained" color="primary" disabled={loading}>
                    Salvar
                </Button>
            </form>
        </Box>
    );
};

export default CreateCustomer;
