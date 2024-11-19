import React, { useEffect, useState } from "react";
import "./FoodMenu.css"; // 스타일 파일 추가

function FoodMenu() {
  const [fetchDataFoods, setFetchDataFoods] = useState([]);

  useEffect(() => {
    const fetchSelect = async () => {
      try {
        const res = await fetch("http://localhost:84/foodList");
        const rs = await res.json();
        setFetchDataFoods(
          rs.map((item) => ({
            ...item,
            GOOD: parseInt(item.GOOD, 10), // 좋아요 수를 정수로 변환
          }))
        );
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
      }
    };
    fetchSelect();
  }, []);

  const handleLike = (id) => {
    setFetchDataFoods((prevFoods) =>
      prevFoods.map((food) =>
        food.ID === id ? { ...food, GOOD: food.GOOD + 1 } : food
      )
    );
  };

  const handleDislike = (id) => {
    setFetchDataFoods((prevFoods) =>
      prevFoods.map((food) =>
        food.ID === id && food.GOOD > 0
          ? { ...food, GOOD: food.GOOD - 1 }
          : food
      )
    );
  };

  const categories = {
    kor: "한식",
    cha: "중식",
    jpa: "일식",
  };

  const categorizedFoods = Object.entries(categories).map(([code, label]) => ({
    label,
    foods: fetchDataFoods.filter((food) => food.CODE === code),
  }));

  return (
    <div className="menu-container">
      {fetchDataFoods.length > 0 ? (
        <div>
          {categorizedFoods.map((category) => (
            <div key={category.label} className="category-section">
              <h3 className="category-title">{category.label}</h3>
              {category.foods.map((food, index) => (
                <div key={food.ID} className="food-item">
                  <p className="food-info">
                    {index + 1}. {food.FOOD}{" "}
                    <span className="like-count">좋아요 {food.GOOD} </span>
                    <button
                      className="like-button"
                      onClick={() => handleLike(food.ID)}
                    >
                      👍
                    </button>
                    <button
                      className="dislike-button"
                      onClick={() => handleDislike(food.ID)}
                    >
                      👎
                    </button>{" "}
                    --- {food.PRICE} 원
                  </p>
                  <p className="food-description">- {food.DESCRIPTION}</p>
                  <div className="button-container"></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p>데이터를 불러오는 중입니다...</p>
      )}
    </div>
  );
}

export default FoodMenu;
