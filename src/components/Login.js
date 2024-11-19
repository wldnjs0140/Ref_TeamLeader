import { useRef } from "react";

function Login({ goToHome }) {
  const inputId = useRef();
  const inputPass = useRef();

  const handleMemChk = () => {
    const idRef = inputId.current.value.trim();
    const passRef = inputPass.current.value.trim();
    if (!idRef || !passRef) {
      alert("공백을 확인해주세요!");
    } else {
      goToHome();
    }
  };

  return (
    <div>
      <h1>로그인</h1>
      <label>
        아이디
        <input ref={inputId} type="text"></input>
      </label>
      <label>
        비밀번호
        <input ref={inputPass} type="password"></input>
      </label>
      <button onClick={handleMemChk}>로그인</button>
    </div>
  );
}

export default Login;
