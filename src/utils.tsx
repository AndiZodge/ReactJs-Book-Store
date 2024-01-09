
export const checkTokenExpiry = () =>{
    try {
      let token = localStorage.getItem("jwt");
      if (!token) {
        return false
      }
      let parse_token = JSON.parse(token);
      if (parse_token.exp) {
        const currentTime = Math.floor(Date.now() / 1000);
        if (parse_token.exp < currentTime) {
          console.log("Session over");
          localStorage.removeItem("jwt");
          localStorage.removeItem("og_jwt");

          return false
        }else{
            return parse_token;
        }
      }
    } catch (error) {
      localStorage.removeItem("og_jwt");
      localStorage.removeItem("jwt");
      return false
    }
};


export const getJWT = () =>{
  const jwt = checkTokenExpiry();
  const og_jwt = localStorage.getItem("og_jwt");

  if (jwt === false){
    return false
  }
  else{
    return og_jwt
  }
};