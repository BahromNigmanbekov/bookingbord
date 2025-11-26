import api from "./api";

 export async function getUsers() {
    return await api
    .get("/users")
    .then(res => res.data)
    .catch((err) => {
        console.log("GET Eror:" , err);
    });

    
}


export async function postUsers(newUser) {
    return await api
    .post("/users" , newUser)
    .then(res => res.data)
    .catch((err) => {
        console.log("Post Eror:" , err);
    });

    
}

export async function deleteUsers(id){
    return await api
    .delete(`/users/${id}`)
    .then((res) => res.data)
    .catch((res) => {
        console.log("Delete Eror" , err); 
    });
}

export async function putUsers(id , updatedUsers){
    return await api
    .put(`/users/${id}` , updatedUsers)
    .then((res) => res.data)
    .catch(err => {
        console.log("PUT Eror" , err );
    })

}