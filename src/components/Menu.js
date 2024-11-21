import { useState } from "react";

const Menu = (props) => {
  const {
    memberId,
    foods,
    setFoods,
    setDetailData,
    setShowModal,
    setModalMode,
  } = props;
  const [searchType, setSearchType] = useState("전체");

  const Foodmenu = ({ menu, type }) => {
    const handleMenuDel = () => {
      if (!memberId) {
        alert("로그인 후 이용해주세요.");
        return;
      }
      setFoods((prev) =>
        prev.map((food) =>
          food.foodType === type
            ? {
                ...food,
                foodMenu: food.foodMenu.filter((item) => item !== menu),
              }
            : food
        )
      );
    };
    // 로그인 세션 없으면 메뉴수정 못하게 수정
    const handleDetail = () => {
      if (!memberId) {
        alert("로그인 후 이용해주세요.");
        return;
      }
      setDetailData({ foodType: type, foodMenu: menu });
      setModalMode("upt");
      setShowModal(true);
    };

    return (
      <li>
        <span onClick={handleDetail}>{menu}</span>
        <button onClick={handleMenuDel}>삭제</button>
      </li>
    );
  };

  const handleTypeDel = (type) => {
    if (!memberId) {
      alert("로그인 후 이용해주세요.");
      return;
    }
    setFoods((prev) => prev.filter((item) => item.foodType !== type));
  };

  const handleSearch = (type) => {
    setSearchType(type);
  };

  return (
    <div>
      <div className="menuBtn">
        <button onClick={() => handleSearch("전체")}>전체</button>
        {foods.map((food, idx) => (
          <button key={idx} onClick={() => handleSearch(food.foodType)}>
            {food.foodType}
          </button>
        ))}
      </div>

      {foods
        .filter((food) => searchType === "전체" || food.foodType === searchType)
        .map((food, idx) => (
          <div key={idx} className="menuDiv">
            <h3>
              {food.foodType}{" "}
              <button onClick={() => handleTypeDel(food.foodType)}>
                타입 삭제
              </button>
            </h3>
            <ul>
              {food.foodMenu.map((menu, idx) => (
                <Foodmenu key={menu + idx} menu={menu} type={food.foodType} />
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
};

export default Menu;
