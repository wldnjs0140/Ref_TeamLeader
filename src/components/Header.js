import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const Header = ({
  isLoggedIn,
  setIsLoggedIn,
  goToHome,
  goToJoin,
  goToLogin,
  goToMenu,
  setModalMode,
  setShowModal,
}) => {
  const location = useLocation(); // 현재 경로 확인
  const [isLoggedInState, setIsLoggedInState] = useState(isLoggedIn);

  const handleAdd = () => {
    if (!isLoggedIn) {
      alert("로그인 후 이용해주세요.");
      return;
    }
    setModalMode("add");
    setShowModal(true);
  };

  useEffect(() => {
    setIsLoggedInState(isLoggedIn); // 부모 컴포넌트에서 전달된 로그인 상태에 맞게 상태 업데이트
  }, [isLoggedIn]);

  const handleLogout = async () => {
    const confirmLogout = window.confirm("로그아웃 하시겠습니까?");
    if (!confirmLogout) return;

    try {
      const response = await fetch("http://localhost:84/logout", {
        method: "POST",
        credentials: "include", // 세션 쿠키 포함
      });

      if (response.ok) {
        alert("로그아웃 되었습니다.");
        setIsLoggedIn(false); // 부모 컴포넌트 상태 업데이트
        sessionStorage.clear(); // 세션 스토리지 초기화
        goToHome(); // 홈으로 이동
      } else {
        alert("로그아웃 실패");
      }
    } catch (error) {
      console.error("로그아웃 오류:", error);
      alert("로그아웃 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="header">
      {/* 로그인되지 않은 경우 */}
      {location.pathname === "/" && !isLoggedInState && (
        <div className="header-logged-out">
          <h1>음식블로그</h1>
          <div className="header-buttons">
            <button className="header-button" onClick={goToMenu}>
              메뉴판
            </button>
            <button className="header-button" onClick={goToJoin}>
              회원가입
            </button>
            <button className="header-button" onClick={goToLogin}>
              로그인
            </button>
          </div>
        </div>
      )}

      {/* 로그인 중일 때 */}
      {location.pathname === "/" && isLoggedInState && (
        <div className="header-logged-in">
          <h1>음식블로그</h1>
          <div className="header-buttons">
            <button onClick={() => handleAdd()}>추가</button>
            <button className="header-button" onClick={goToMenu}>
              메뉴판
            </button>
            <button className="header-button" onClick={handleLogout}>
              로그아웃
            </button>
          </div>
        </div>
      )}

      {/* foodMenu 화면 */}
      {location.pathname === "/foodMenu" && (
        <div className="header-food-menu">
          <h1>메뉴판</h1>
          <div className="header-buttons">
            <button className="header-button" onClick={goToHome}>
              홈
            </button>
            {isLoggedIn && (
              <button className="header-button" onClick={handleLogout}>
                로그아웃
              </button>
            )}
          </div>
        </div>
      )}

      {/* 회원가입 화면 */}
      {location.pathname === "/Join" && (
        <div className="memberArea">
          <h1>회원가입</h1>
          <button className="back-button" onClick={goToHome}>
            홈
          </button>
        </div>
      )}

      {/* 로그인 화면 */}
      {location.pathname === "/Login" && (
        <div className="memberArea">
          <h1>로그인</h1>
          <button className="back-button" onClick={goToHome}>
            홈
          </button>
        </div>
      )}
    </div>
  );
};
