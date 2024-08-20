import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './components/Navbar';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import AjouterPublication from './components/AjouterPublication';
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';


export default function Dashboard() {

const [publications, setPublications] = React.useState([])

  const navigate = useNavigate()
  // useEffect est utiliser pour qu'un utilisateur deja connecte ne puisse plus acceder a la page connexion
  useEffect(() => {
    if(!localStorage.getItem('utilisateur')){
      navigate('/connexion');
    }
    axios.get ('http://localhost:3000/publications', publications).then((res) =>{
      setPublications(res.data)
    })
  }) //le square vide permet a l'application de ne pas effectuer de requetes inutiles

    
   
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['publications'],
    queryFn: () => axios.get('http://localhost:3000/publications').then((res) => res.data),
    onerror: (error) => console.log(error),
    
  })
console.log(query);

  return (
     <Box bgcolor={'#eef4ff'}>
        <NavBar />
        <AjouterPublication/>
        <Box  width={'60%'} margin={'auto'}>
          {publications.map((publication) => (

            // Lorsque vous utilisez .map() pour rendre des éléments, chaque élément doit avoir une clé unique pour aider React à identifier quels éléments ont changé, ont été ajoutés ou supprimés. Ajoutez une prop key à l'élément racine de chaque itération.
          //  raison pour laquelle j'ai mis la cle key={publication.id}

           <Box key={publication.id} width={'100%'} bgcolor={'#fff'} borderRadius={4} marginBottom={3} padding={2}>
              <Stack flexDirection={'row'} alignItems={'center'} gap={2}>
                <Avatar src={publication.photoUtilisateur}/>
                <Typography>{publication.auteur}</Typography>
              </Stack>
              <Typography>{publication.textePublication}</Typography>
              <img src={publication.imagePublication} style={{
                width: '100%',
                borderRadius: 4,
              }}/>
            </Box>
          ))}

        </Box>
     </Box>
  
  )
}
