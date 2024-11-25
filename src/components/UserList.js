import React, { useState, useEffect } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [expandedUserId, setExpandedUserId] = useState(null);

  // 정렬 상태 추가
  const [sortBy, setSortBy] = useState(null); // 정렬 기준
  const [sortOrder, setSortOrder] = useState("asc"); // 정렬 순서 (asc 또는 desc)

  // 회원 목록 조회
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:84/userList");
        const data = await response.json();
        setUsers(data); // 데이터를 그대로 설정
        console.log(data); // 변환된 데이터 확인
      } catch (error) {
        console.error("회원 목록 조회 오류:", error);
      }
    };

    fetchUsers();
  }, []);

  // 등급 일괄 업데이트
  const handleBulkUpdate = async () => {
    try {
      const updatedUsers = users.map((user) => ({
        memberId: user.memberId,
        memberGrade: user.memberGrade, // 이미 변환된 값 사용
      }));

      const response = await fetch("http://localhost:84/updateGrades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUsers),
      });

      if (response.ok) {
        alert("회원 등급이 업데이트되었습니다.");
      } else {
        alert("업데이트 실패");
      }
    } catch (error) {
      console.error("등급 업데이트 오류:", error);
    }
  };

  // 회원 상세정보 토글
  const toggleDetail = (userId) => {
    setExpandedUserId(expandedUserId === userId ? null : userId);
  };

  // 정렬 함수
  const handleSort = (column) => {
    const newSortOrder =
      sortBy === column && sortOrder === "asc" ? "desc" : "asc";
    setSortBy(column);
    setSortOrder(newSortOrder);

    // 정렬 적용
    const sortedUsers = [...users].sort((a, b) => {
      if (a[column] < b[column]) {
        return newSortOrder === "asc" ? -1 : 1;
      }
      if (a[column] > b[column]) {
        return newSortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });

    setUsers(sortedUsers);
  };
  // 화살표 렌더링 함수
  const renderSortIcon = (column) => {
    if (sortBy === column) {
      return sortOrder === "asc" ? " ▲" : " ▼";
    }
    return ""; // 정렬 상태가 아닐 때 빈 값
  };

  // 테이블 렌더링
  return (
    <div className="user-management">
      <h1>회원 관리</h1>
      <button onClick={handleBulkUpdate} className="bulk-update-btn">
        등록
      </button>
      <table className="user-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("memberId")}>
              아이디{renderSortIcon("memberId")}
            </th>
            <th onClick={() => handleSort("memberName")}>
              이름{renderSortIcon("memberName")}
            </th>
            <th>비밀번호</th>
            <th onClick={() => handleSort("memberGrade")}>등급</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <React.Fragment key={user.memberId}>
              <tr
                onClick={() => toggleDetail(user.memberId)}
                className={`user-row ${
                  expandedUserId === user.memberId ? "expanded" : ""
                }`}
              >
                <td>{user.memberId}</td>
                <td>{user.memberName}</td>
                <td>{user.memberPassword}</td>
                <td>
                  <select
                    value={user.memberGrade}
                    onClick={(e) => e.stopPropagation()} // 클릭 전파 방지
                    onChange={(e) =>
                      setUsers((prev) =>
                        prev.map((u) =>
                          u.memberId === user.memberId
                            ? { ...u, memberGrade: e.target.value }
                            : u
                        )
                      )
                    }
                  >
                    <option value="Silver">Silver</option>
                    <option value="Gold">Gold</option>
                    <option value="Diamond">Diamond</option>
                  </select>
                </td>
              </tr>
              {expandedUserId === user.memberId && (
                <tr className="detail-row">
                  <td colSpan="4">
                    <div className="user-detail">
                      <p>이메일: {user.memberEmail}</p>
                      <p>전화번호: {user.memberPhone}</p>
                      <p>성별: {user.memberGender}</p>
                      <p>주민번호: {user.memberJumin}</p>
                      <p>주소: {user.memberAddr}</p>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
