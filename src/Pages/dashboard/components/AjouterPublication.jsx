// import React from 'react';
import { Stack, TextField, Button } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query';
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

      const useQuery = useQueryClient();
       // fonction mutation

       const mutation = useMutation({
        mutationFn: (pub) => {
          return axios.post('http://localhost:3000/publications', pub)
        },
        onError: (error) => {
            toast.error(`Une erreur est survenue :${error.message}`)
        },
        onSuccess: () => {
            // reset est utilise pour supprimer les donnees entre
            reset();
            // usequery est utilise pour recharge de nouvelles donnees sur la page
            useQuery.invalidateQueries('publications')
            toast.success('publication ajoutee avec success')
        }
      })

      const onSubmit = (data) => {
        //  la constante publication est faite pour attribuer les di
        const publication = {
            ...data, // ...data est la pour copier le contenu de la table data qui est constituer du texte de la publication et de l'url de l'image
            idUtilisateur: user.id,
            datePublication: new Date(),
            likePublication: 0,
            auteur: user.nomUtilisateur,
        };
        mutation.mutate(publication);
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
                            },
                        })}/>
                     {errors.textePublication && <span>{errors.textePublication.message}</span>} {/* Affichage de l'erreur */}
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
                    <Button variant='contained' type='submit'>
                        Publier
                    </Button>
                </Stack>
            </form>
        </Stack>
    </div>
  );
}
