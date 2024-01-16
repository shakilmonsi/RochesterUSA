import React from 'react';

const ImageUploadAndDeletFullSection = () => {
    return (
        <div className='manageDoctors-part'>
            
            
const Managedoctor = () => {

const [deletingDoctor, setDeletingDoctor] = useState(null);

   const closeModal = () => {
       setDeletingDoctor(null);
   }


   const { data: doctors, isLoading, refetch } = useQuery({
       queryKey: ['doctors'],
       queryFn: async () => {
           try {
               const res = await fetch('http://localhost:5000/doctors', {
                   headers: {
                       authorization: `bearer ${localStorage.getItem('accessToken')}`
                   }
               });
               const data = await res.json();
               return data;
           }
           catch (error) {

           }
       }
   });

   
   const handleDeleteDoctor = doctor => {
       fetch(`http://localhost:5000/doctors/${doctor._id}`, {
           method: 'DELETE', 
           headers: {
               authorization: `bearer ${localStorage.getItem('accessToken')}`
           }
       })
       .then(res => res.json())
       .then(data => {
           if(data.deletedCount > 0){
               refetch();
               toast.success(`Doctor ${doctor.name} deleted successfully`)
           }
       })
   }

   if (isLoading) {
       return <Loading></Loading>
   }

   return (
       <div>
           <h2 className="text-3xl">Manage Doctors: {doctors?.length}</h2>
           <div className="overflow-x-auto">
               <table className="table w-full">
                   <thead>
                       <tr>
                           <th></th>
                           <th>Avatar</th>
                           <th>Name</th>
                           <th>Email</th>
                           <th>Specialty</th>
                           <th>Action</th>
                       </tr>
                   </thead>
                   <tbody>
                       {
                           doctors.map((doctor, i) => <tr key={doctor._id}>
                               <th>{i + 1}</th>
                               <td><div className="avatar">
                                   <div className="w-24 rounded-full">
                                       <img src={doctor.image} alt="" />
                                   </div>
                               </div></td>
                               <td>{doctor.name}</td>
                               <td>{doctor.email}</td>
                               <td>{doctor.specialty}</td>
                               <td>
                                   <label onClick={() => setDeletingDoctor(doctor)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Delete</label>
                               </td>
                           </tr>)
                       }
                   </tbody>
               </table>
           </div>
           {
               deletingDoctor && <ConfirmationModal
                   title={`Are you sure you want to delete?`}
                   message={`If you delete ${deletingDoctor.name}. It cannot be undone.`}
                   successAction = {handleDeleteDoctor}
                   successButtonName="Delete"
                   modalData = {deletingDoctor}
                   closeModal = {closeModal}
               >
               </ConfirmationModal>
           }
       </div>
   );
};
export default Managedoctor;
        </div>
        <div>
            
        </div>
        <div>
            
        </div>
    );
};

export default ImageUploadAndDeletFullSection;
import React from 'react';

const ConfirmationModal = ({ title, message, successButtonName, closeModal, modalData, successAction }) => {
  return (
      <div>
          <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
          <div className="modal">
              <div className="modal-box">
                  <h3 className="font-bold text-lg">{title}</h3>
                  <p className="py-4">{message}</p>
                  <div className="modal-action">
                      <label 
                      onClick={() => successAction(modalData)} 
                      htmlFor="confirmation-modal" 
                      className="btn btn-primary">{successButtonName}</label>
                      <button onClick={closeModal} className='btn btn-outline'>cancel</button>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default ConfirmationModal;


 // manageDoctors  indisplay port One 
 app.get('/doctors', verifyJWT,async(req,res)=>{
    const query ={};

    const doctors= await doctorCollextion.find(query).toArray()
res.send(doctors);

})



// add doctors collection and part one server 
 app.post('/doctors',verifyJWT,async(req,res)=>{
    const doctor=req.body;
    const result =await doctorCollextion.insertOne(doctor)
    res.send(result)
 })


 // doctors delete class 76-8 server 
 app.delete('/doctors/:id',verifyJWT, async (req, res) => {
    const id = req.params.id;
    const filter = ({'_id':new ObjectId(id)});
    const result = await doctorCollextion.deleteOne(filter);
    res.send(result);
})
