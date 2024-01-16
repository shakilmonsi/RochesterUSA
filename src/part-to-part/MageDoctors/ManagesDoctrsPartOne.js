import React from 'react';

const ManagesDoctrsPartOne = () => {
    return (
        <div>

            // server  manage Doctor port One 
            // manageDoctors  indisplay port One 
        app.get('/doctors', async(req,res)=>{
            const query ={};
        
            const doctors= await doctorCollextion.find(query).toArray()
       res.send(doctors);
       
        })/// 
        /// manage a doctor cliend part one 
        const {data: doctors,isLoading}=useQuery({
        queryKey:['doctors'],
        queryFn: async ()=>{
            try{
                const res= await fetch ('http://localhost:5000/doctors',{
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json()
                return data

            }
            catch(error){

            }
        }
    })
    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div>
            <h3 className='text-3xl'> MANAGEdOCTORS{doctors?.length}</h3>
      
            <div className="overflow-x-auto">
  <table className="table">

    <thead>
      <tr>
        <th></th>
        <th>AVATAR</th>
        <th>NAME</th>
        <th>EMAIL </th>
        <th>SPECIALTY </th>
        <th>ACTION </th>

      </tr>
    </thead>
    <tbody>
   
     {
        doctors &&
        doctors?.map((doctor,i)=> <tr key={doctor._di}>
            <th>{i+1}</th>
            <td>
            <div className="avatar">
  <div className="w-24 rounded-full">
    <img src={doctor.image}/>
  </div>
</div>
            </td>
            <td className='text-primary'>{doctor.name}</td>
            <td className='text-red-500'>{doctor.email}</td>
            <td className='text-green'>{doctor.specialty}</td>
            <td ><button className='btn btn-sm btn-error'>Delete</button></td>
      
          </tr>)
     }
     
    </tbody>
  </table>
</div>
        </div>
    );
};
          
        </div>
    );
};

export default ManagesDoctrsPartOne;