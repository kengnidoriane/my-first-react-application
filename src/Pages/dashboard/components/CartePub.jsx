// import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useQueryClient,useMutation } from '@tanstack/react-query';
import axios from 'axios';
import {toast} from 'react-hot-toast'



export default function CartePub({ publication }) {

    // pour voir l'utilisateur connecter

    const user = JSON.parse(localStorage.getItem('utilisateur'));

    // 
    const useQuery = useQueryClient();
    const mutation = useMutation({
        mutationFn: (id) =>{
            return axios.delete(` http://localhost:3000/publications/${id}`)
        },
        onError: (error) =>{
            toast.error(`Une erreur est survenu0: ${error}`)
        },
        onSuccess: () =>{
            useQuery.invalidateQueries('publications');
            toast.success('Publication supprimer avec success')
        }
    })
    const supprimerPublication = (id) =>{
        mutation.mutate(id);
    };
  return (
    <div>

        <Box  
            width={'100%'} 
            bgcolor={'#fff'} 
            borderRadius={4} 
            marginBottom={3} 
            padding={2}
        >
            <Stack direction={'row'} alignItems={'center'} gap={2}>
            <Avatar src={publication.photoUtilisateur}/>
            <Typography>{publication.auteur}</Typography>

                {/* Pour supprimer une publication */}

            {
            user.id === publication.idUtilisateur && (
               <IconButton aria-label='delete' onClick={() => supprimerPublication(publication.id)}>
                    <DeleteIcon/>
               </IconButton>
            )
        }
                {/* ***************** */}

        </Stack>
        <Typography>{publication.textePublication}</Typography>

       

        
        <img src={publication.imagePublication} style={{
            width: '100%',
            borderRadius: 4,
        }}/>
        </Box>
    </div>
  )
}

// Définir les PropTypes
CartePub.propTypes = {
    publication: PropTypes.shape({
        id: PropTypes.number.isRequired,
        auteur: PropTypes.string.isRequired,
        textePublication: PropTypes.string.isRequired,
        imagePublication: PropTypes.string,
        photoUtilisateur: PropTypes.string,
        idUtilisateur: PropTypes.number.isRequired,
    }).isRequired,
};