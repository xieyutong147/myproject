import request from "@/utils/request";


export function login(username, password) {
  const data = {
    username,
    password
  }
  return request.post("/users/login",data)
}

export function logout(username) {
  return request.delete("/users/logoutByUserName/"+username)
}

export function getUserInfo(id) {
  return request.post("/users/getUserInfo/"+id)
}

export function register(username, password,email,vercode) {
  const data = {
    username,
    email,
    password,
    vercode,
  }
  return request.post("/users/registerByEmail",data)
}
export function sendvercode(email) {
  return request.post("/mails/sendEmail/"+email)
}
