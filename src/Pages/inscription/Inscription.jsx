import React from 'react'
import { Box, Stack, Typography, TextField, Button } from '@mui/material'
import { useForm } from "react-hook-form"
import {toast} from 'react-hot-toast'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard'


export default function Inscription() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const onSubmit = (data) => {
        if(data.motDePasse !== data.motDePasseConfirmation){
            toast.error('Les mots de passe ne corresponde pas')
        }
        else{
            axios.get(`http://localhost:3000/utilisateurs?mailUtilisateur=${data.mailUtilisateur}`).then((res) => {
                if (res.data.length > 0) {
                    toast.error('Un Compte existe deja avec cette adresse mail')
                }
                else{
                    // axios est utilise pour recuperer les donnees et mettre dans le fichier db.json
            axios.post('http://localhost:3000/utilisateurs', data).then((res) => {
                console.log(res);
                toast.success('Inscription reussie')
                // navigate est utilise pour ouvrir la page connexion lorsque l'utilisateur reussie son inscription
                navigate('/connexion');
                
            }).catch((err) => {
                console.log(err);
                toast.error('Une errreur est survenue')
                
            })
                }
            });
            
            
        }
      };
      
    
    // stack est une div ayant un positionnement flex
  return (
        <Stack alignItems={'center'}
            justifyContent={'center'} width={'100%'} height={'100vh'}
             backgroundColor={'#f5f5f5'}>
            <Box width={400} sx={
                {
                    backgroundColor: '#fff',
                    padding: 3,
                }
            }>
                {/* register c'est pour enregistre les valeurs des inputs */}
                <Typography
                variant='h5'>
                    Inscription
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} style={
                    {
                        marginTop: '20px'
                    }
                }>
                    <Stack direction={'column'} gap={2}>
                            {/* Textfield est pour mettre les import provenant de material ui et il faut importer tout cela */}

                            <TextField id="outlined-basic" label="Veuillez saisir votre nom" variant="outlined" 
                            fullWidth size='small'
                            {...register("nomUtilisateur", { required: 'Veuillez saisir un nom', minLength:{
                                value: 5, message: 'Veuillez saisir un nom de plus de 5 caracteres'
                            } })}/>
                            <TextField id="outlined-basic" label="Veuillez saisir votre adresse mail" variant="outlined" 
                            fullWidth size='small' type='email'
                                {...register("mailUtilisateur", { required: 'Veuillez saisir un nom', pattern: "/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*\.\w{2,3}$/" })}/> 

                   

                     <TextField id="outlined-basic" type='password' label="Veuillez saisir un mot de passe" variant="outlined" 
                     fullWidth size='small'
                     {...register("motDePasse", { required: 'Veuillez saisir un mot de passe', minLength:{
                        value: 6, message: 'Veuillez saisir un mot de passe de plus de 6 caracteres'
                     } })}/> 

                     <TextField id="outlined-basic" type='password' label="Veuillez confirmer votre mot de passe" variant="outlined" 
                     fullWidth size='small' 
                     {...register("motDePasseConfirmation", { required: 'Veuillez confirmer mot de passe', minLength:{
                        value: 6, message: 'Veuillez saisir un mot de passe de plus de 6 caracteres'
                     } })}/> 

                    </Stack>
                    <Button variant="contained" type='submit'
                    sx={
                        {
                            marginTop: 2
                        }
                    }>Inscription</Button>
                </form>
            </Box>
            
        </Stack>
      )
}
