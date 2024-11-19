import React from "react";
import { useRef } from "react";

function Join({ goToHome }) {
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
  const inputGender = useRef();
  const inputJumin1 = useRef();
  const inputJumin2 = useRef();

  const JoinProc = () => {
    const idRef = inputId.current.value.trim();
    const passRef1 = inputPass.current.value.trim();
    const passRef2 = inputPass2.current.value.trim();
    const nameRef = inputName.current.value.trim();
    const email1Ref = inputEmail1.current.value.trim();
    const email2Ref = inputEmail2.current.value.trim();
    const ph1Ref = inputPh1.current.value.trim();
    const ph2Ref = inputPh2.current.value.trim();
    const ph3Ref = inputPh3.current.value.trim();
    const addrRef = inputAddr.current.value.trim();
    const genderRef = inputGender.current.value.trim();
    const jumin1Ref = inputJumin1.current.value.trim();
    const jumin2Ref = inputJumin2.current.value.trim();

    if (
      !idRef ||
      !passRef1 ||
      !passRef2 ||
      !nameRef ||
      !email1Ref ||
      !email2Ref ||
      !ph1Ref ||
      !ph2Ref ||
      !ph3Ref ||
      !addrRef ||
      !genderRef ||
      !jumin1Ref ||
      !jumin2Ref
    ) {
      alert("공백을 채워주세요!");
    } else {
      alert("회원가입 완료!");
      goToHome();
    }
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
                <br />
                <br />
                ID : <input type="text" ref={inputId} />
                <input type="button" name="idChk" value="중복체크" />
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
                성별 : <input type="radio" ref={inputGender} /> 남자&nbsp;&nbsp;
                <input type="radio" name="gender" value="여자" /> 여자
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
