import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api-client/api-client';
import { useAppContext } from '../contexts/AppContext';

export const LogOutButton = () => {
    const queryClient = useQueryClient();
    const { showToast } = useAppContext();


    const mutation = useMutation(apiClient.logOut, {
        onSuccess: async() => {
            //showToast
            await queryClient.invalidateQueries("validateToken");
            showToast({ message: 'Log Out Success', type: "SUCCESS" });
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" });
        }
    })

    const handleClick = () => {
        mutation.mutate();
    }

  return (
    <button onClick={handleClick} className="hidden rounded-md bg-[#181818] px-5 py-2.5 text-sm font-medium text-accent transition hover:text-accent sm:block">Log Out</button>
  )
}
