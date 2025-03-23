# 🐢 LazyASF - 터미널 명령어 단축어 관리자

> 자주 쓰는 긴 명령어를 짧은 alias로 저장해 터미널 생산성을 극대화하는 CLI 도구

---

## 🔧 사전 요구사항

- [Bun](https://bun.sh) 설치 (v1.0.0 이상)
- zsh 셸 사용 (Oh My Zsh 호환 보장)

---

## 📦 설치 방법

### 📍 npm (Bun 기반 CLI 전역 설치)

```bash
bun install -g lazyasf
```

### 🍺 Homebrew (빌드된 바이너리 설치)

```bash
brew tap justn-hyeok/lazyasf-term
brew install lazyasf
```

> Homebrew 설치 시 `bun`이 필요하지 않습니다.

---

## 🚀 사용법

### ▶️ 기본 명령

```bash
lazyasf add
```

> 대화형 CLI를 통해 아래 순서로 진행됩니다:
>
> 1. 줄이고 싶은 명령어 입력 (예: `git init`)
> 2. 사용할 단축어 입력 (예: `gii`)
> 3. alias 추가 여부 확인

---

### 🔍 상세 로그 모드

```bash
lazyasf add --verbose
```

> `-v` 또는 `--verbose` 옵션으로 실행 로그를 자세히 볼 수 있습니다.

---

## 🛠 기능 요약

- ✅ 대화형 CLI 인터페이스
- ✏️ `.zshrc` 자동 수정 및 백업 (.zshrc.bak)
- 🧠 입력 유효성 검사 및 포맷 체크
- ⚠️ 기존 alias가 있으면 자동 덮어쓰기
- 📄 상세 로그 모드 지원

---

## 💡 사용 예시

```bash
$ lazyasf add
? 줄이고 싶은 명령어를 입력하세요: git init
? 어떤 단축어(alias)로 만들까요?: gii
? 이 단축어를 추가할까요? Yes

✅ alias 'gii'가 성공적으로 저장되었습니다.
👉 적용을 위해 'source ~/.zshrc' 실행
```

```bash
$ gii
# → git init 실행됨
```

---

## ⚠️ 주의사항

- 단축어는 **영문자, 숫자, 언더스코어(\_)**만 사용 가능
- `.zshrc`에 동일한 alias가 있을 경우 자동 덮어씀
- alias 반영을 위해 `source ~/.zshrc` 실행 필요

---

## 🧪 개발 및 실행

```bash
# 개발용 실행
bun run bin/lazyasf.ts add

# 전역 링크 후 테스트
bun link
lazyasf add
```

---

## 📜 라이선스

MIT License © 2025 Hwang Junhyeok
