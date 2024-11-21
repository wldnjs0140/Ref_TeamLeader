import { useRef } from "react";

function Login({ setIsLoggedIn, goToHome }) {
  const inputId = useRef();
  const inputPass = useRef();

  const handleMemChk = async () => {
    const idRef = inputId.current.value.trim();
    const passRef = inputPass.current.value.trim();

    if (!idRef || !passRef) {
      alert("공백을 확인해주세요!");
      return;
    }

    try {
      const response = await fetch("http://localhost:84/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idRef,
          passRef,
        }),
      });

      const result = await response.text(); // 서버에서 보내는 응답 메시지
      if (response.ok) {
        alert(result); // "로그인 성공!" 출력
        setIsLoggedIn(true); // 로그인 성공 시 부모로 상태 전달
        goToHome(); // 홈으로 이동
      } else {
        alert(result); // 오류 메시지 출력
      }
    } catch (error) {
      console.error("로그인 요청 중 오류 발생:", error);
      alert("로그인 요청에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div>
      <h1>로그인</h1>
      <label>
        아이디
        <input ref={inputId} type="text" placeholder="아이디를 입력하세요" />
      </label>
      <label>
        비밀번호
        <input
          ref={inputPass}
          type="password"
          placeholder="비밀번호를 입력하세요"
        />
      </label>
      <button onClick={handleMemChk}>로그인</button>
    </div>
  );
}

export default Login;
