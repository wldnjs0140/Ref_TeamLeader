import { useLocation } from "react-router-dom";

export const Header = (props) => {
  const {
    setShowModal,
    setModalMode,
    goToJoin,
    goToHome,
    goToLogin,
    goToMenu,
  } = props;
  const location = useLocation(); // 현재 경로 확인

  const handleAdd = () => {
    setModalMode("add");
    setShowModal(true);
  };

  return (
    <div className="header">
      {/* 현재 경로가 '/login'이 아닐 때만 추가 버튼을 표시 */}
      {location.pathname === "/" && (
        <div>
          <h1>음식블로그</h1>
          <button onClick={() => handleAdd()}>추가</button>
          <button onClick={goToMenu}>메뉴판</button>
          <button onClick={goToJoin}>회원가입</button>
          <button onClick={goToLogin}>로그인</button>
        </div>
      )}
      {/* 상단에 로그인 버튼 */}
      {location.pathname === "/Join" && (
        <div className="memberArea">
          <h1>회원가입</h1>
          <button onClick={goToHome}>블로그</button>
        </div>
      )}
      {/* 상단에 로그인 버튼 */}
      {location.pathname === "/Login" && (
        <div className="memberArea">
          <h1>로그인</h1>
          <button onClick={goToHome}>블로그</button>
        </div>
      )}
      {location.pathname === "/foodMenu" && (
        <div className="memberArea">
          <h1>메뉴판</h1>
          <button onClick={goToHome}>블로그</button>
          <button onClick={goToJoin}>회원가입</button>
          <button onClick={goToLogin}>로그인</button>
        </div>
      )}
    </div>
  );
};
