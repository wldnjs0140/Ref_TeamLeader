import "./App.css";
import { Header } from "./components/Header";
import Menu from "./components/Menu";
import { useState } from "react";
import { Modal } from "./components/Modal";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Login";

function App() {
  const [foods, setFoods] = useState([
    { foodType: "한식", foodMenu: ["김밥", "라면", "불고기"] },
    { foodType: "중식", foodMenu: ["짜장", "짬뽕", "탕수육"] },
    { foodType: "일식", foodMenu: ["우동", "스시", "돈카츠"] },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [detailData, setDetailData] = useState({});
  const [modalMode, setModalMode] = useState();

  const navigate = useNavigate(); // useNavigate 훅 사용

  // 로그인 화면으로 이동
  const goToLogin = () => {
    navigate("/login");
  };

  // 기본 화면으로 이동
  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="app">
      {/* 상단 헤더 */}
      <Header
        goToHome={goToHome}
        goToLogin={goToLogin}
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
        <Route path="/login" element={TestRoute}></Route>
        <Route></Route>
        <Route path="/login" element={<Login goToHome={goToHome} />} />
      </Routes>
    </div>
  );
}

export default App;
