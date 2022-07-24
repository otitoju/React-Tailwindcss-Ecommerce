import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN = "ek6HCRGKftegyO7C6YW_Uy3xPKSTwxfX9aaC8SB0GM6FcJ2JZ_mPTSrw_w8KkRbTRFW0_5u5njlQFTmBrKxH-IMvE3gybpbtdh_vu3MZODuiUqwhVFPOW-qmp3X4Jn6kQfhdlOBiXY6C7km9aQEMSRJnGMP1ywzLZzH6kDFNCRJef2VV6AgSUET3LzXvQ6ucXjBkJzAK7wdYJqNYNK2H1IlVT29l5y_cLF-IykCW_Q3ezRflnil_GtAiEoOTUL2iLMPkDIsr9MqVznbpdGrXuEcZogf_Jcq7APSzTE9zhUfw-73TSDDhLgX543mrZgqypCpEv8aU4UDN6CYxmncYM3_ju1BKgF13b2xWV4tf_KMuS2iYDiRpiz3tn_umFoHKbMU1XXXaTLC5ZptqHIHJMyFi1IPxaAFPkoJ7gTv7p0WMqvRT7lgIyVqSKE5oLtX4PzFXBDM75P7GuJc_StNJqh6JkXOEa3_1vDT45-jsoWKilRODQykQEpZnpr7am8Zz"
//JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
