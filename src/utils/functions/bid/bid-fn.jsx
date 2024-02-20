import { useQuery } from "@tanstack/react-query";
import { endClosed, getBidById, getClosed, getComing, getLive } from "../../../api/bid";

export const UseGetLive = () => {

    const getAuction = async () => {
        try {
            const response = await getLive();
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

    return useQuery({ queryKey: ['get-live'], queryFn: getAuction, refetchOnWindowFocus: false, enabled: false });
};

export const UseGetComing = () => {

    const getAuction = async () => {
        try {
            const response = await getComing();
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

    return useQuery({ queryKey: ['get-comming'], queryFn: getAuction, refetchOnWindowFocus: false, enabled: false });
};

export const UseGetClosed = () => {

    const getAuction = async () => {
        try {
            const response = await getClosed();
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

    return useQuery({ queryKey: ['get-closed'], queryFn: getAuction, refetchOnWindowFocus: false, enabled: false });
};
export const UseGetEnd = () => {

    const getAuction = async () => {
        try {
            const response = await endClosed();
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

    return useQuery({ queryKey: ['get-end'], queryFn: getAuction, refetchOnWindowFocus: false, enabled: false });
};



export const UseBidById = (id) => {

    const getAuction = async () => {
        try {
            const response = await getBidById(id);
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

    return useQuery({ queryKey: ['get-curr-live'], queryFn: getAuction, refetchOnWindowFocus: false, enabled: false });
};
