import customAxios from "../axios/custom";

export async function CreateBid(data) {
  const res = await customAxios.post("/api/v1/bid/bids",data);
  return res.data;
}

export async function getClosed() {
    const res = await customAxios.get("/api/v1/bid/bids-closed");
    return res.data;
  }

  export async function endClosed() {
    const res = await customAxios.get("/api/v1/bid/bids-end");
    return res.data;
  }

  export async function getComing() {
    const res = await customAxios.get("/api/v1/bid/bids-comming");
    return res.data;
  }

  export async function getLive() {
    const res = await customAxios.get("/api/v1/bid/bids-live");
    return res.data;
  }

  export async function getBidById(id) {
    const res = await customAxios.get("/api/v1/bid/bids/"+id);
    return res.data;
  }

  export async function addMessgeToBid(data) {
    const res = await customAxios.put("/api/v1/bid/addMessgeToBid",data);
    return res.data;
  }

  export async function  setWinnerBid (data) {
    const res = await customAxios.put("/api/v1/bid/setWinnerBid/"+data.id,data);
    return res.data;
  }

  export async function  searchBid (data) {
    const res = await customAxios.post(`/api/v1/bid/search?price=${data.price}&search=${data.search}&type=${data.type}`);
    return res.data;
  }

  