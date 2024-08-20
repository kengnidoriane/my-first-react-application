import React, { useEffect } from 'react'
import { Box, Stack, Typography, TextField, Button } from '@mui/material'
import { useForm } from "react-hook-form"
import {toast} from 'react-hot-toast'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';


       

    export default function Connexion() {
        
        const navigate = useNavigate();

        useEffect(() =>{
            if(localStorage.getItem('utilisateur')){
                navigate('/')
            }
        }); 

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

    //   la fonction onSubmit() est s'execute lorsqu'om clique sur le bouton de type sumit su formulaire
      const onSubmit = (data) => {
        axios.get(`http://localhost:3000/utilisateurs?mailUtilisateur=${data.mailUtilisateur}&motDePasse=${data.motDePasse}`).then( res =>{
            if (res.data.length > 0) { //si la repose n'est pas vide alors l'utilisateur existe dans la base de donnne db.json
                //locaStorage permet de stocker les donnes dans le navigateur pour qu'ils restent present meme au rafraichissement de la page

                localStorage.setItem('utilisateur', JSON.stringify(res.data[0]));
                navigate('/'); //si il reussit la connexion il est rediriger vers la page d'acceill
                toast.success('Connexion reussie');

            } else {
                toast.error('Les identifiants sont incorrects');
            }
        });
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
                    Connexion
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} style={
                    {
                        marginTop: '20px'
                    }
                }>
                    <Stack direction={'column'} gap={2}>
                            {/* Textfield est pour mettre les import provenant de material ui et il faut importer tout cela */}

                            
                            <TextField id="outlined-basic" label="Veuillez saisir votre adresse mail" variant="outlined" 
                            fullWidth size='small' type='email'
                                {...register("mailUtilisateur", { required: 'Veuillez saisir un nom', pattern: "/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*\.\w{2,3}+$/" })}/> 

                   

                     <TextField id="outlined-basic" type='password' label="Veuillez saisir un mot de passe" variant="outlined" 
                     fullWidth size='small'
                     {...register("motDePasse", { required: 'Veuillez saisir un mot de passe', minLength:{
                        value: 6, message: 'Veuillez saisir un mot de passe de plus de 6 caracteres'
                     } })}/> 

                     

                    </Stack>
                    <Button variant="contained" type='submit'
                    sx={
                        {
                            marginTop: 2
                        }
                    }>Connexion</Button>
                    <Typography paddingTop={2}>Voulez-vous creer un compte? <Link to={'/inscription'}>Cliquez ici</Link></Typography>
                </form>
            </Box>
            
        </Stack>
      )
}