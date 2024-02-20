import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { createUser } from '../../../store/userSlice';
import { getUser, getUserId } from '../../../api/user';


export const useUser = () => {
    const dispatch = useDispatch();
  
    const getUsers = async () => {
      try {
        const response = await getUser();
        if (!response) {
          throw new Error('Failed to get user');
        }
        dispatch(createUser(response));
        return response;
      } catch (error) {
        // Handle errors appropriately
        console.error('Error fetching user:', error);
        throw error;
      }
    };
  
    return useQuery({ queryKey: ['get-user'], queryFn: getUsers,refetchOnWindowFocus:false,enabled:true });
  };
  
  export const useUserToken = () => {
    const dispatch = useDispatch();
  
    const getUsers = async () => {
      try {
        const response = await getUser();
        if (!response) {
          throw new Error('Failed to get user');
        }
        dispatch(createUser(response));
        return response;
      } catch (error) {
        // Handle errors appropriately
        console.error('Error fetching user:', error);
        throw error;
      }
    };
  
    return useQuery({ queryKey: ['get-user'], queryFn: getUsers,refetchOnWindowFocus:false,enabled:false });
  };

    
  export const useUserId = (id) => {
  
    const getUsers = async () => {
      try {
        const response = await getUserId(id);
        if (!response) {
          throw new Error('Failed to get user');
        }
        return response;
      } catch (error) {
        // Handle errors appropriately
        console.error('Error fetching user:', error);
        throw error;
      }
    };
  
    return useQuery({ queryKey: ['get-userbyid'], queryFn: getUsers,refetchOnWindowFocus:false,enabled:true });
  };