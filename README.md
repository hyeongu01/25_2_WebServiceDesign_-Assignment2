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

## 프로젝트 개요

간단한 도서 쇼핑 API 서버(Express + Sequelize 기반)입니다. 주요 책임 영역은 다음과 같습니다:

- 모델(`src/models`): Sequelize 모델 정의
- 레포지토리(`src/repositories`): DB CRUD 추상화
- 서비스(`src/services`): 비즈니스 로직, 트랜잭션 관리
- 컨트롤러(`src/controllers`): HTTP 요청 처리 및 응답 포맷 통일
- 라우트(`src/routes`): 엔드포인트 정의 및 Swagger JSDoc
- 미들웨어(`src/middlewares`): 인증, 권한 체크 등

프로젝트에서 사용되는 주요 기능 예시: JWT 인증, 사용자/도서/카트/주문/리뷰 관리, Swagger 문서 자동 생성 등

## 로컬 설치 및 실행 (개발)

사전 요구사항:
- Node.js (권장: v16 이상)
- MySQL 데이터베이스

설치 및 실행 예시:

```bash
# 저장소 루트에서
npm install

# 환경변수 설정: 프로젝트 루트에 `.env` 파일 생성
# 예시 .env 항목
# DB_NAME=your_db_name
# DB_USER=your_db_user
# DB_PASSWORD=your_db_password
# DB_HOST=localhost
# DB_PORT=3306
# ACCESS_SECRET=your_access_token_secret
# REFRESH_SECRET=your_refresh_token_secret
# SALT=10

# 서버 시작
node src/server.js

# Swagger JSON 생성 (선택)
node src/utils/generate-swagger.js
```

## API 루트 (기본)

- 서버 기본 호스트: http://localhost:3000/
- Swagger UI: http://localhost:3000/api-docs

## 환경변수 (주요)

- `DB_NAME`, `DB_USER`, `DB_PASSWORD` : MySQL 연결 정보
- `DB_HOST`, `DB_PORT` : DB 호스트/포트 (기본: localhost / 3306)
- `ACCESS_SECRET`, `REFRESH_SECRET` : JWT 시크릿
- `SALT` : bcrypt salt rounds (기본: 10)

## 코드 구조 간단 설명

프로젝트는 `controllers -> services -> repositories -> models`의 흐름을 따릅니다. 모든 응답은 기본적으로 다음 형태로 통일되어 반환됩니다:

```json
{
	"data": ..., 
	"meta": { "timestamp": "ISO timestamp" }
}
```

---
