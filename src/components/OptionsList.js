import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Switch, FormControlLabel, Typography} from '@mui/material';
import { updateStatusOption } from '../api/Api';

const OptionsList = ({ options, onUpdateOptions }) => {
    const [activeOptions, setActiveOptions] = useState([]);

    useEffect(() => {
        setActiveOptions(options);
    }, [options]);
    // Función para activar/desactivar una opción
    const handleToggleOption = async (option) => {
        const updatedOptions = activeOptions.map((opt) => {
        if (opt.id === option.id) {
            return { ...opt, status: !option.status };
        }
        return opt;
        });
        setActiveOptions(updatedOptions);

        // Realizar la petición PUT para actualizar el estado en el backend
        try {
        //await axios.put(`http://localhost:3010/api/options/${option.id}`, { status: !option.status });   
        await updateStatusOption(option.id, { status: !option.status });
        
        onUpdateOptions(updatedOptions);
        } catch (error) {
        console.error('Error al actualizar el estado de la opción:', error);
        // Si hay un error, deshacer el cambio en el estado local
        setActiveOptions(options);
        }
    };
    return (
        <div style={{ width: '80%', padding: '20px', }}>
            <Typography variant="h4" gutterBottom>
                Lista de Opciones
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Estado</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {activeOptions.map((option) => (
                        <TableRow key={option.id}>
                        <TableCell>{option.id}</TableCell>
                        <TableCell>{option.name}</TableCell>
                        <TableCell>
                            <FormControlLabel
                            control={<Switch checked={option.status}  onChange={() => handleToggleOption(option)}/>}
                            label={option.status ? 'Activo' : 'Inactivo'}
                            />
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>        
    );
};

export default OptionsList;
