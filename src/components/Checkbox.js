import { useState } from "react";

function Checkbox() {
  const fruitItems = [
    "사과",
    "멜론",
    "바나나",
    "포도",
    "수박",
    "딸기",
    "복숭아",
  ];

  const [allCheck, setAllCheck] = useState(false);
  const [checkItem, setCheckItem] = useState([]);

  const handleAll = () => {
    if (allCheck) {
      setCheckItem([]);
    } else {
      setCheckItem(fruitItems);
    }

    setAllCheck(!allCheck);
  };

  const handleItem = () => {};
  return (
    <div>
      <div>
        <label>
          <input type="checkbox" checked={allCheck} onChange={handleAll} />
          전체
        </label>
      </div>
      <div>
        {fruitItems.map((item, index) => (
          <label key={index}>
            <input
              type="checkbox"
              checked={checkItem.includes(item)}
              onChange={handleItem}
            />
            {item}
          </label>
        ))}
      </div>
    </div>
  );
}

export default Checkbox;
