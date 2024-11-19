import { useRef } from 'react';

export function Modal(props) {
  const { setShowModal, setFoods, modalMode, detailData } = props;
  const inputFoodType = useRef();
  const inputFoodMenu = useRef();

  const handleInsert = () => {
    const foodTypeRef = inputFoodType.current.value.trim();
    const foodMenuRef = inputFoodMenu.current.value.trim();

    if (!foodTypeRef || !foodMenuRef) {
      alert('음식 타입과 메뉴를 입력해주세요!');
      return;
    }

    setFoods((prev) => {
      if (modalMode === 'add') {
        // Check if the food type already exists
        const checkType = prev.find((food) => food.foodType === foodTypeRef);

        if (checkType) {
          // Add menu only if it does not already exist
          if (checkType.foodMenu.includes(foodMenuRef)) {
            alert('이미 존재하는 메뉴입니다!');
            return prev;
          }
          return prev.map((food) =>
            food.foodType === foodTypeRef
              ? { ...food, foodMenu: [...food.foodMenu, foodMenuRef] }
              : food
          );
        } else {
          // Add new food type with menu
          return [...prev, { foodType: foodTypeRef, foodMenu: [foodMenuRef] }];
        }
      } else if (modalMode === 'upt') {
        // Update existing menu in the specified food type
        return prev.map((food) =>
          food.foodType === detailData.foodType
            ? {
                ...food,
                foodMenu: food.foodMenu.map((menu) =>
                  menu === detailData.foodMenu ? foodMenuRef : menu
                ),
              }
            : food
        );
      }
      return prev; // Default case (no changes)
    });

    setShowModal(false);
  };

  return (
    <div className="modalOverlay">
      <div className="modal">
        <div>
          <label>음식 타입</label>
          <input
            type="text"
            ref={inputFoodType}
            defaultValue={modalMode === 'upt' ? detailData.foodType : ''}
            readOnly={modalMode === 'upt'}
          />
        </div>
        <div>
          <label>음식 메뉴</label>
          <input
            type="text"
            ref={inputFoodMenu}
            defaultValue={modalMode === 'upt' ? detailData.foodMenu : ''}
          />
        </div>
        <div>
          <button onClick={handleInsert}>등록</button>
          <button onClick={() => setShowModal(false)}>닫기</button>
        </div>
      </div>
    </div>
  );
}
