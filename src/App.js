import "./App.css";
import { Header } from "./components/Header";
import Menu from "./components/Menu";
import { useState, useEffect } from "react";
import { Modal } from "./components/Modal";
import { Routes, Route, useNavigate } from "react-router-dom";
import Join from "./components/Join";
import FoodMenu from "./components/FoodMenu";
import Login from "./components/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const [memberId, setMemberId] = useState(null); // 로그인한 사용자 ID 저장
  console.log(memberId);
  const navigate = useNavigate(); // useNavigate 훅 사용

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

  return (
    <div className="app">
      {/* {JSON.stringify(fetchDataFoods)} */}

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
      {/* 라우팅 처리 */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Menu
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
        <Route path="*" element={<>사용할수 없는 URL입니다.</>}></Route>
        {/* <Route path="/test/:aa" element={<TestRoute></TestRoute>}>
          <Route path="test2" element={<TestRoute2></TestRoute2>}></Route>

          <Route></Route>
        </Route> */}
      </Routes>
    </div>
  );
}

export default App;
