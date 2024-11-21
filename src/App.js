import "./App.css";
import { Header } from "./components/Header";
import Menu from "./components/Menu";
import { useState, useEffect } from "react";
import { Modal } from "./components/Modal";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Join from "./components/Join";
import FoodMenu from "./components/FoodMenu";
import Login from "./components/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const [memberId, setMemberId] = useState(null); // 로그인한 사용자 ID 저장
  const [showAlert, setShowAlert] = useState(false); // 경고창 표시 상태

  const navigate = useNavigate(); // useNavigate 훅 사용
  const location = useLocation(); // 현재 경로 확인

  // 초기 상태 복구
  useEffect(() => {
    const storedLoginStatus = sessionStorage.getItem("isLoggedIn") === "true";
    const storedMemberId = sessionStorage.getItem("memberId");

    if (storedLoginStatus) {
      setIsLoggedIn(true);
      setMemberId(storedMemberId);
    }
  }, []); // 컴포넌트 마운트 시 실행

  const handleLogin = (id) => {
    setIsLoggedIn(true);
    setMemberId(id);
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("memberId", id);
  };

  const [foods, setFoods] = useState([
    { foodType: "한식", foodMenu: ["김밥", "라면", "불고기"] },
    { foodType: "중식", foodMenu: ["짜장", "짬뽕", "탕수육"] },
    { foodType: "일식", foodMenu: ["우동", "스시", "돈카츠"] },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [detailData, setDetailData] = useState({});
  const [modalMode, setModalMode] = useState();

  // 라우팅 함수
  const goToJoin = () => navigate("/Join");
  const goToLogin = () => navigate("/Login");
  const goToHome = () => navigate("/");
  const goToMenu = () => navigate("/foodMenu");

  // 경고창 처리
  useEffect(() => {
    if (!isLoggedIn && location.pathname === "/") {
      setShowAlert(true); // 비로그인 상태에서만 경고창 표시
    } else {
      setShowAlert(false); // 다른 페이지나 로그인 상태에서는 경고창 숨기기
    }
  }, [isLoggedIn, location.pathname]); // 로그인 상태나 경로 변경 시 실행

  const handleAlertClose = () => {
    setShowAlert(false);
    goToLogin(); // 로그인 페이지로 이동
  };

  return (
    <div className="app">
      {/* 상단 헤더 */}
      <Header
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        goToHome={goToHome}
        goToJoin={goToJoin}
        goToLogin={goToLogin}
        goToMenu={goToMenu}
        setModalMode={setModalMode}
        setShowModal={setShowModal}
      />

      {/* 경고창 */}
      {showAlert && (
        <div className="alert-overlay">
          <div className="alert-box">
            <p>로그인 후 이용해주세요.</p>
            <button onClick={handleAlertClose}>확인</button>
          </div>
        </div>
      )}

      {/* 라우팅 처리 */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              {
                isLoggedIn ? (
                  <>
                    <Menu
                      memberId={memberId}
                      setDetailData={setDetailData}
                      foods={foods}
                      setFoods={setFoods}
                      setShowModal={setShowModal}
                      setModalMode={setModalMode}
                    />
                    {showModal && (
                      <Modal
                        detailData={detailData}
                        setShowModal={setShowModal}
                        setFoods={setFoods}
                        modalMode={modalMode}
                      />
                    )}
                  </>
                ) : null /* 로그인하지 않은 상태에서는 아무것도 렌더링하지 않음 */
              }
            </>
          }
        />
        <Route
          path="/Join"
          element={<Join goToHome={goToHome} goToLogin={goToLogin} />}
        />
        <Route
          path="/Login"
          element={<Login goToHome={goToHome} handleLogin={handleLogin} />}
        />
        <Route path="/foodMenu" element={<FoodMenu goToHome={goToHome} />} />
        <Route path="*" element={<>사용할 수 없는 URL입니다.</>} />
      </Routes>
    </div>
  );
}

export default App;
