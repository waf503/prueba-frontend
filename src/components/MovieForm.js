//import React, { useState } from "react";
import styled from "styled-components";
import { handleFormSubmit } from "../api/Api";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 
import { useForm, Controller } from "react-hook-form";

const FormWrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

const FormField = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const MovieForm = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (formData) => {
        try {
            //para probar escenario de error
            //throw new Error('Test error');
            await handleFormSubmit(formData);
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };

    const validateDate = (value) => {
        const currentDate = new Date();
        if (!value) {
            return "La fecha es requerida";
        } else if (value > currentDate) {
            return "La fecha no puede ser mayor que la fecha actual";
        }
        return true;
    };

    return (
        <div style={{ width: '80%', padding: '20px', }}>
            <h1 className='header'>Películas</h1>
            <FormWrapper>
                <FormField>
                    <Label>Nombre:</Label>
                    <Controller
                        name="name"
                        defaultValue={""}
                        control={control}
                        rules={{ required: "El campo es requerido" }}
                        render={({ field }) => <Input type="text" {...field} />}
                    />
                    {errors.name && <p>{errors.name.message}</p>}
                </FormField>
                <FormField>
                    <Label>Fecha de estreno:</Label>
                    <Controller
                        name="date"
                        control={control}
                        rules={{ required: "La fecha es requerida", validate: validateDate }}
                        render={({ field }) => (
                            <DatePicker
                                selected={field.value} 
                                onChange={(date) => field.onChange(date)}
                                dateFormat="dd/MM/yyyy" 
                                placeholderText="Seleccione una fecha"
                            />
                        )}
                    />
                    {errors.date && <p>{errors.date.message}</p>}
                </FormField>
                <FormField>
                    <Label>Duración (minutos):</Label>
                    <Controller
                        name="duration"
                        control={control}
                        defaultValue={''}
                        rules={{ required: "El campo es requerido", min: { value: 1, message: "La duración no puede ser menor que uno" } }}
                        render={({ field }) => <Input type="number" {...field} />}
                    />
                    {errors.duration && <p>{errors.duration.message}</p>}
                </FormField>
                <FormField>
                    <Label>Presupuesto:</Label>
                    <Controller
                        name="budget"
                        defaultValue={''}
                        control={control}
                        rules={{ required: "El campo es requerido", min: { value: 1, message: "El presupuesto no puede ser menor que uno" } }}
                        render={({ field }) => <Input type="number" {...field} />}
                    />
                    {errors.budget && <p>{errors.budget.message}</p>}
                </FormField>
                <Button onClick={handleSubmit(onSubmit)}>Guardar</Button>
            </FormWrapper>

        </div>        
    );
};

export default MovieForm;