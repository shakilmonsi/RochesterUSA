import React, { useContext } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const DisplayError=()=> {

        const error =useRouteError()
        const {logOut}=useContext(AuthContext)
        const navigate = useNavigate()
        const handleLogOut = () => {
                logOut()
                    .then(() => {
                        navigate('/login')
                     })
                    .catch(err => console.log(err));
            }
        return (
                <div>
<p className='text-red-500'>somethig went wrong !!</p>
<p className='text-red-400'>{error.statusText  || error.message}</p>
<h4 className='text-3xl'>pleasse<button onClick={handleLogOut}>Sign out</button>and log back in </h4>
                        
                </div>
        );
}

export default DisplayError;