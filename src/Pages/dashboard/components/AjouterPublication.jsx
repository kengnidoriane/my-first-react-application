import React from 'react';
import { Stack, TextField, Button } from '@mui/material'
import { useForm } from "react-hook-form"
import {toast} from 'react-hot-toast'
import axios from 'axios';



export default function AjouterPublication() {

    // recuperer les donnees de l'utilisateur

    const user = JSON.parse(localStorage.getItem('utilisateur'));

    const {
        register,
        handleSubmit,
        reset, //reset permet de 
        formState: { errors },
      } = useForm();

      const onSubmit = (data) => {
        //  la constante publication est faite pour attribuer les di
        const publication = {
            ...data, // ...data est la pour copier le contenu de la table data qui est constituer du texte de la publication et de l'url de l'image
            idUtilisateur: user.id,
            datePublication: new Date(),
            likePublication: 0,
            auteur: user.nomUtilisateur,
        }
        
        axios.post('http://localhost:3000/publications', publication).then((res) =>{
            console.log(data);
            toast.success('publication ajouter');
            reset();
            
        }).catch((err) =>{
            console.log(err);
            toast.error('Une erreur est survenue')
            
        })
      }
  return (
    <div>
        <Stack width={'60%'} margin={'auto'}>
            <h1>Ajouter une publication</h1>

            <form style={{
                marginTop:4
            }}
            onSubmit={handleSubmit(onSubmit)}
            >
                <Stack gap={2}>
                    <TextField 
                    id="filled-basic"
                    label="Parlez nous de votre journee" 
                    variant="outlined"
                    fullWidth
                    size='small'
                    type='text' 
                    multiline
                        rows={4}
                        {...register('textePublication',{
                            required: 'Veuillez saisir un texte',
                            minLength:{
                                value:10,
                                message: 'Veuillez saisir un texte de plus de 5 carateres'
                            }
                        })}/>
                    
                    <TextField 
                    id="filled-basic"
                    label="Saisir l'url de votre image" 
                    variant="outlined"
                    fullWidth
                    size='small'
                    type='text' 
                    {...register('imagePublication',{
                        required: 'Veuillez saisir une url',
                        
                    })}/>
                    <Button variant='contained' type='submit'>Publier</Button>
                </Stack>
            

            </form>
        </Stack>
    </div>
  )
}
