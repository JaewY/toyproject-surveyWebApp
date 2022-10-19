# 🛒 Consumption pattern survey

개인의 의류 소비패턴을 알아보기 위한 설문조사 웹 어플리케이션

<br>

## ⚙️ 기술 스택

- `TypeScript`, `React`, `SCSS`

<br>

## 📆 구현 기간

- 22.10.10 ~ 22.10.16

<br>

## 🖥 구현 페이지

### 1. 사용자 정보 입력 페이지

- 조건부 렌더링으로 단일 페이지 구현

**사용자 정보 입력 전**

- 사용자 이름 및 설문 id(설문 주제)를 입력하는 input

  <img width="300" alt="시작2" src="https://user-images.githubusercontent.com/89966610/196650514-3fac2d4e-856a-44cc-8e72-e993c3a4afb0.png">

**사용자 정보 입력 후**

- 사용자 이름 및 총 문항 수를 화면에 표시

  <img width="300" alt="시작 페이지" src="https://user-images.githubusercontent.com/89966610/196648298-03d6a7a2-60af-4d97-9800-b1650e9d53c9.png">

<br>

### 2. 설문 페이지

- 화면 구성
  - `홈 버튼`, `프로그래스바`, `진행 중인 설문 주제`, `진행 문항/총 문항`, `질문`, `답변`
- 단수형 및 복수형 질문
  - 각 질문 데이터에 mode 프로퍼티를 부여하여 단수, 복수 구분
  - 토글 방식으로 이미 선택한 답변 선택 시 선택 해제
- 프로그래스바
  - 총 문항 개수 대비 진행 문항의 진행 상태를 표시

<img width="300" alt="단수 질문" src="https://user-images.githubusercontent.com/89966610/196648670-a9beeb37-91c8-480b-81e3-2d9b769db5b4.png">

<img width="300" alt="복수 질문" src="https://user-images.githubusercontent.com/89966610/196648841-1e7e6964-50c2-41d5-bd92-fe3d0d745a01.png">

<br>

### 3. 결과 페이지

- `내 답변 보기` 버튼 클릭 시 사용자가 선택한 답변 리스트 alert 알림

<img width="300" alt="결과페이지" src="https://user-images.githubusercontent.com/89966610/196649012-744f6f8e-b9a0-45b1-a2ac-adebbffc2885.png">

<br>

## 📼 전체 녹화 영상

![전체 녹화](https://user-images.githubusercontent.com/89966610/196649246-910364b7-2d53-4d3f-a8c5-960b45220682.gif)
