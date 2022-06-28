import axios from "axios";

//권한이 필요한 요청을 하는 경우 axios에 기본 설정을 해주게 되면,
//모든 요청의 헤더에 액세스 토큰이 자동으로 넣어져 보내지게 된다.

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};
export default setAuthToken;
