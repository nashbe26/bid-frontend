import customAxios from "../axios/custom";

export async function getUser() {
  const res = await customAxios.get("/api/v1/user/get-user");
  return res.data;
}
export async function getUserId(id) {
  const res = await customAxios.get("/api/v1/user/"+id);
  return res.data;
}

export async function updateUser(data) {
    const res = await customAxios.put("/api/v1/user/update-user",data);
    return res.data;
  }

  export async function sendEmailToken(data) {
    const res = await customAxios.post("/api/v1/user/send-email-token",data);
    return res.data;
  }

  export async function verifEmailToken(data) {
    const res = await customAxios.post("/api/v1/user/verif-email-token",data);
    return res.data;
  }

  export async function chnagePassword(data) {
    const res = await customAxios.post("/api/v1/user/change-password",data);
    return res.data;
  }

  export async function addToFav(data) {
    const res = await customAxios.post("/api/v1/user/add-fav",data);
    return res.data;
  }

  export async function deleteToFav(data) {
    const res = await customAxios.post("/api/v1/user/delete-fav",data);
    return res.data;
  }