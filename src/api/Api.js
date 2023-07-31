import Swal from 'sweetalert2';
const API_ENDPOINT_MOVIES = "http://localhost:3010/api/movies";
const API_ENDPOINT_OPTIONS = "http://localhost:3010/api/options";

export const handleFormSubmit = async (formData) => {
    try {
        const parsedFormData = {
            ...formData,
            duration: parseInt(formData.duration),
            budget: parseInt(formData.budget),
        };

        const response = await fetch(API_ENDPOINT_MOVIES, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(parsedFormData),
        }); 

        const data = await response; 

        if(data.status === 200 ){
            console.log("Data sent successfully:", data);
            Swal.fire({
                icon: 'success',
                title: 'Guardado exitoso',
                text: 'La película fue guardada correctamente',
            });
            return data.json();
        }
        else{
            console.error("Server Error:", data);
            Swal.fire({
                icon: 'error',
                title: 'Ups!',
                text: 'Le película no pude ser guardada',
            });
        }        
       
    } catch (error) {
        console.error("Error sending data:", error);
        Swal.fire({
            icon: 'error',
            title: 'Ups!',
            text: 'Le película no pude ser guardada',
        });
        throw error;
    }
};

export const handleGetOptions = async () => {
    try {
        const response = await fetch(API_ENDPOINT_OPTIONS, {
            method: "GET"
        });        
        const data = await response; 
        return data;      
       
    } catch (error) {
        console.error("Error en la peticion", error);
        throw error;
    }    
};

export const getMovies = async () => {
    try {
        const response = await fetch(API_ENDPOINT_MOVIES, {
            method: "GET"
        });        
        const data = await response; 
        return data.json();      
       
    } catch (error) {
        console.error("Error en la peticion", error);
        throw error;
    }    
};

export const updateStatusOption = async (id, formData) => {
    try 
    {       

        const response = await fetch(API_ENDPOINT_OPTIONS+"/"+id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        }); 

        const data = await response; 

        if(data.status === 200 ){
            console.log("Data sent successfully:", data);
            Swal.fire({
                icon: 'success',
                title: 'Actualización exitosa',
                text: 'La opción fue actualizada correctamente',
            });
            return data.json();
        }
        else{
            console.error("Server Error:", data);
            Swal.fire({
                icon: 'error',
                title: 'Ups!',
                text: 'Le opción no púdo ser actualizada',
            });
        }    
       
    } catch (error) {
        console.error("Error en la peticion", error);
        throw error;
    }    
};
