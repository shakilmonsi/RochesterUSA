import { useQuery } from '@tanstack/react-query';
import React from 'react';

const PaidPayment=() =>{
        const { data: paidpayment, isLoading } = useQuery({
                queryKey: ['doctors'],
                queryFn: async () => {
                    try {
                        const res = await fetch('http://localhost:5000/payments', {
                            headers: {
                                authorization: `bearer ${localStorage.getItem('accessToken')}`
                            }
                        });
                        const data = await res.json();
                        console.log('paidpaymentsmethod',data)
                        return data;
                    }
                    catch (error) {
        
                    }
                }
            });





        return (
                <div>
                  <h1 className='text-green-400 fond-bold text-2xl'>🅟🅐🅘🅓🅟🅐🅨🅜🅔🅝🅣</h1> 

                   <div className="overflow-x-auto mt-6">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>transactionId</th>
                            <th>MRP</th>
                            <th>Email</th>
                          
                        </tr>
                    </thead>
                    <tbody>


{

paidpayment?.map((paid,i)=><tr key={paid._id}>
        <th className='text-green-400 font-bold'>{i+1}</th>
        <td className='text-green-400 font-bold'>{paid.transactionId}</td>
        <td className='text-green-400 font-bold'>MRP-${paid.price}</td>
        <td className='text-green-400 font-bold'>{paid.email}</td>



</tr>  )
}          
                    </tbody>
                </table>
            </div>     




                        
                </div>
        );
}

export default PaidPayment;