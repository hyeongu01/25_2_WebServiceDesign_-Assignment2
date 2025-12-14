## API Documentation (Swagger)

You can view generated API documentation using Swagger UI.

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm start
```

3. Open the docs in your browser: http://localhost:3000/api-docs

Optional: Generate a static swagger.json file:

```bash
node ./src/utils/generate-swagger.js
```

# 25_2_WebServiceDesign_-Assignment2
25_2 웹서비스 설계: 과제 2



| 역할           | 설명                       |
| ------------ | ------------------------ |
| models       | DB 테이블 구조 정의             |
| repositories | DB CRUD를 수행하는 계층     |
| services     | 비즈니스 로직 (토큰 발급, 암호 비교 등) |
| controllers  | HTTP 요청 처리               |
| routes       | URL → Controller 연결      |
| config       | Sequelize 설정 같은 전역 설정    |
| middlewares  | 미들웨어 모음  |
| errors       | 에러들을 정의                  |
