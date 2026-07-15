# 🌌 동서양이 알려주는 마지막 존엄의 지도

> **"두 장의 지도로 만나는 존엄한 마지막 여정"**  
> 롤란트 슐츠의 《우리는 어떻게 죽는가》와 파드마삼바바의 《티베트 사자의 서》가 그리는 두 개의 죽음 지도를 3D Carousel 인터랙션으로 시각화한 프리미엄 정적 웹 뷰어 프로젝트입니다.

---

## ✨ Key Features

- **Premium Mystical Aesthetic**: 깊이 있는 다크 모드 배경에 은은하게 유영하는 라이트 오브(Light Orbs) 애니메이션 및 골드/퍼플의 그라데이션 광원을 배치하여 신비로운 영적 분위기를 선사합니다.
- **Dynamic 3D Carousel**: 3D Perspective 및 3D Transform을 활용하여 중앙의 현재 슬라이드를 강조하고, 양옆의 슬라이드들은 깊이와 회전각, 블러 효과를 주어 입체적으로 배치합니다.
- **Full Interactive Controls**:
  - **마우스 휠(Mouse Wheel)** 및 모바일 **스와이프 터치(Touch Swipe)** 드래그를 감지해 부드러운 슬라이드 전환 지원
  - **키보드 방향키(←, →)** 및 화면 좌우 화살표 버튼 제어
- **Pure Web Stack**: 프레임워크나 외부 라이브러리(JQuery, Tailwind 등) 의존성 없이, 오직 바닐라 HTML, CSS, JavaScript로 구현되어 극도의 퍼포먼스와 최적화된 로딩 속도를 보장합니다.

---

## 🚀 Quick Start

로컬 환경에서 즉시 뷰어를 구동하여 감상할 수 있습니다.

```bash
# 1. 레포지토리를 클론합니다.
git clone <your-repository-url>
cd unbroken_thread_web

# 2. 로컬 웹 서버를 실행합니다. (파이썬 기본 모듈 사용)
python -m http.server 8000
```
서버가 켜지면 브라우저를 열어 **`http://localhost:8000`** 주소로 접속합니다.

---

## 📂 Project Structure

```bash
unbroken_thread_web/
├── index.html         # 메인 마크업 및 레이아웃
├── style.css          # 3D 카루셀, 라이트 오브 애니메이션 및 테마 스타일링
├── app.js             # 슬라이드 생성, 3D 트랜지션 로직 및 휠/키보드 이벤트 핸들러
├── .gitignore         # 버전 관리 제외 파일 설정
└── images/            # PDF에서 무손실로 추출된 20장의 슬라이드 이미지
```

---

## 📝 Credits

- 본 프로젝트의 원본 슬라이드 리소스는 **Google NotebookLM** RAG 기술을 통해 요약 및 텍스트 구조화 과정을 거쳐 제작되었습니다.
- PDF 리소스 이미지 추출 기술: **PyMuPDF (fitz)**
