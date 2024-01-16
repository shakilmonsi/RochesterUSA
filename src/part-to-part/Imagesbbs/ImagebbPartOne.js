import React from 'react';

const ImagebbPartOne = () => {
    return (
        <div>
            {/* part one   imagebb de img patanoo*/}
            const handleAddDoctors = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(res=>res.json())
    .then(imgData=>{
        console.log('images console sdata ',imgData)
    })
      
    }

            {/* part one  */}

            // add doctors collection and part one server 
         app.post('/doctors',async(req,res)=>{
            const doctor=req.body;
            const result =await doctorCollextion.insertOne(doctor)
            res.send(result)
         })




{/* part two  */}


            
        </div>
    );
};

export default ImagebbPartOne;