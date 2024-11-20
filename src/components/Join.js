import React, { useState, useRef } from "react";

function Join({ goToLogin }) {
  const inputId = useRef();
  const inputPass = useRef();
  const inputPass2 = useRef();
  const inputName = useRef();
  const inputEmail1 = useRef();
  const inputEmail2 = useRef();
  const inputPh1 = useRef();
  const inputPh2 = useRef();
  const inputPh3 = useRef();
  const inputAddr = useRef();
  const inputJumin1 = useRef();
  const inputJumin2 = useRef();

  const [gender, setGender] = useState(""); // 성별을 관리하는 상태 변수

  const idCheck = async () => {
    const id = inputId.current.value;

    if (!id) {
      alert("아이디를 입력해주세요.");
      inputId.current.focus();
      return;
    }

    try {
      const response = await fetch("http://localhost:84/idCheck", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error(`서버 응답 오류: ${response.status}`);
      }

      const result = await response.json();

      if (result) {
        alert("사용 가능한 아이디 입니다.");
        inputPass.current.focus();
      } else {
        alert("이미 사용중인 아이디 입니다.");
        inputId.current.value = ""; // 아이디 입력창 비우기
        inputId.current.focus(); // 포커스를 아이디 입력창으로 이동
      }
    } catch (error) {
      console.error("아이디 중복 확인 오류:", error);
    }
  };

  const handleGenderClick = (selectedGender) => {
    // 성별 토글 처리
    if (gender === selectedGender) {
      setGender(""); // 선택 취소
    } else {
      setGender(selectedGender); // 선택된 성별로 설정
    }
  };

  const JoinProc = () => {
    const userData = {
      id: inputId.current.value,
      password: inputPass.current.value,
      confirmPassword: inputPass2.current.value,
      name: inputName.current.value,
      email: `${inputEmail1.current.value}@${inputEmail2.current.value}`,
      phone: `${inputPh1.current.value}-${inputPh2.current.value}-${inputPh3.current.value}`,
      address: inputAddr.current.value,
      gender: gender, // 성별 값
      jumin: `${inputJumin1.current.value}-${inputJumin2.current.value}`,
    };

    // 공백 필드 체크
    if (!userData.id) {
      alert("아이디를 입력해주세요.");
      inputId.current.focus(); // 아이디 필드로 포커스 이동
      return;
    } else if (!userData.password) {
      alert("비밀번호를 입력해주세요.");
      inputPass.current.focus(); // 비밀번호 필드로 포커스 이동
      return;
    } else if (!userData.confirmPassword) {
      alert("비밀번호 확인을 입력해주세요.");
      inputPass2.current.focus(); // 비밀번호 확인 필드로 포커스 이동
      return;
    } else if (!userData.name) {
      alert("이름을 입력해주세요.");
      inputName.current.focus(); // 이름 필드로 포커스 이동
      return;
    } else if (!userData.email || !inputEmail1.current.value) {
      alert("이메일1을 입력해주세요.");
      inputEmail1.current.focus(); // 이메일1 필드로 포커스 이동
      return;
    } else if (!userData.email || !inputEmail2.current.value) {
      alert("이메일2를 입력해주세요.");
      inputEmail2.current.focus(); // 이메일2 필드로 포커스 이동
      return;
    } else if (
      !userData.phone ||
      !inputPh1.current.value ||
      !inputPh2.current.value ||
      !inputPh3.current.value
    ) {
      alert("휴대폰 번호를 입력해주세요.");
      if (!inputPh1.current.value) {
        inputPh1.current.focus(); // 전화번호 첫 번째 부분에 포커스
      } else if (!inputPh2.current.value) {
        inputPh2.current.focus(); // 전화번호 두 번째 부분에 포커스
      } else if (!inputPh3.current.value) {
        inputPh3.current.focus(); // 전화번호 세 번째 부분에 포커스
      }
      return;
    } else if (!userData.gender) {
      alert("성별을 선택해주세요.");
      return;
    } else if (
      !userData.jumin ||
      !inputJumin1.current.value ||
      !inputJumin2.current.value
    ) {
      alert("주민번호를 입력해주세요.");
      if (!inputJumin1.current.value) {
        inputJumin1.current.focus(); // 주민번호 첫 번째 부분에 포커스
      } else if (!inputJumin2.current.value) {
        inputJumin2.current.focus(); // 주민번호 두 번째 부분에 포커스
      }
      return;
    } else if (!userData.address) {
      alert("주소를 입력해주세요.");
      inputAddr.current.focus(); // 주소 필드로 포커스 이동
      return;
    }

    // 모든 필드가 채워졌으면, 회원가입 진행
    fetch("http://localhost:84/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("회원가입 성공:", result);
      })
      .catch((error) => {
        console.error("회원가입 오류:", error);
      });

    alert("회원가입 완료!");
    goToLogin();
  };

  return (
    <div>
      <table width="1400" height="650">
        <tbody>
          <tr>
            <td width="100%" height="10%">
              회원가입
            </td>
          </tr>
          <tr>
            <td height="60%" align="center" valign="top">
              <hr />
              <br />
              <p align="left" style={{ paddingLeft: "160px" }}>
                ID : <input type="text" ref={inputId} />
                <input
                  type="button"
                  name="idChk"
                  value="중복체크"
                  onClick={idCheck}
                />
                <br />
                <br />
                비밀번호 : <input type="password" ref={inputPass} />
                <br />
                <br />
                비밀번호 확인 :{" "}
                <input
                  type="password"
                  size="15"
                  maxLength="20"
                  ref={inputPass2}
                  id="pass2"
                />
                <br />
                <br />
                이름 : <input type="text" size="13" ref={inputName} id="name" />
                <br />
                <br />
                이메일 :{" "}
                <input type="text" size="15" ref={inputEmail1} id="email1" />
                @
                <input type="text" size="15" ref={inputEmail2} id="email2" />
                <br />
                <br />
                휴대폰 :{" "}
                <select name="ph1" ref={inputPh1}>
                  <option value="010">010</option>
                  <option value="011">011</option>
                  <option value="016">016</option>
                  <option value="017">017</option>
                  <option value="019">019</option>
                </select>
                -{" "}
                <input
                  type="text"
                  ref={inputPh2}
                  size="5"
                  maxLength="4"
                  id="ph2"
                />{" "}
                -{" "}
                <input
                  type="text"
                  ref={inputPh3}
                  size="5"
                  maxLength="4"
                  id="ph3"
                />
                <br />
                <br />
                성별 :
                <input
                  type="radio"
                  checked={gender === "male"}
                  onClick={() => handleGenderClick("male")}
                />{" "}
                남자&nbsp;&nbsp;
                <input
                  type="radio"
                  checked={gender === "female"}
                  onClick={() => handleGenderClick("female")}
                />{" "}
                여자
                <br />
                <br />
                주민번호 : <input
                  type="text"
                  ref={inputJumin1}
                  id="jumin1"
                /> - <input type="password" ref={inputJumin2} />
                <br />
                <br />
                주소 :{" "}
                <input type="text" ref={inputAddr} size="15" maxLength="15" />
                <br />
                *주소는 (시/도)만 입력해주세요 (예: 경기도, 서울특별시, 경상남도
                등)
              </p>
            </td>
          </tr>
          <tr>
            <td align="center">
              <hr />
              <br />
              <input
                type="button"
                id="regi_btn"
                value="가입신청"
                onClick={() => JoinProc()}
              />
              &nbsp;
              <input type="reset" value="다시입력" />
              &nbsp;
              <input type="button" value="취소" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Join;
