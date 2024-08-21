import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './components/Navbar';
import {  Box } from '@mui/material';
import AjouterPublication from './components/AjouterPublication';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
// import { DeleteForeverOutlined } from '@mui/icons-material';
// import DeleteIcon from '@mui/icons-material/Delete';
import CartePub from './components/CartePub';


export default function Dashboard() {

const [publications, setPublications] = React.useState([])

// console.log('publications: ', publications);


  const navigate = useNavigate()
  // useEffect est utiliser pour qu'un utilisateur deja connecte ne puisse plus acceder a la page connexion
  useEffect(() => {
    if(!localStorage.getItem('utilisateur')){
      navigate('/connexion');
    }
    
  }, [navigate]) //le square vide permet a l'application de ne pas effectuer de requetes inutiles

    console.log('publications: ', publications);
    
   
  // const queryClient = useQueryClient();
  // creation de requete pour mettre a jour chaque requete pour augmenter la performance de notre appli
  const { data,error,
        isLoading
      } = useQuery({ //je n'ai pas mis publications parcqu'on me dit qu'il a dejea ete cree
    queryKey: ['publications'],
    queryFn: () => axios.get('http://localhost:3000/publications').then((res) => res.data),
    onerror: (error) => console.log(error),
    
  });

  // Mettre à jour l'état des publications lorsque les données sont chargées
   useEffect(() => {
    if (data) {
        setPublications(data);
    }
}, [data]);


if (isLoading){
  return <>Chargement...</>
}

if (error) {
  return <>Une erreur est survenue lors du chargement des publications.</>;
}

// Trier les publications par date
let pubTrier = publications.sort((a , b) => {
  return new Date(b.datePublication) - new Date(a.datePublication);
});


//////////////////////////////////

  return (
     <Box bgcolor={'#eef4ff'}>
        <NavBar />
        <AjouterPublication/>
        <Box  width={'60%'} margin={'auto'} marginTop={4}>
          {publications && pubTrier.map((publication) => 

            // Lorsque vous utilisez .map() pour rendre des éléments, chaque élément doit avoir une clé unique pour aider React à identifier quels éléments ont changé, ont été ajoutés ou supprimés. Ajoutez une prop key à l'élément racine de chaque itération.
          
              <CartePub key={publication.id} publication ={publication}/>
          )}

        </Box>
     </Box>
  
  )
}
