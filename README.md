# lazyasf - Lazy As F\*\*\* Terminal

> **복잡한 명령어를 간결하게**.  
> `LazyASF`는 터미널 alias를 자동으로 등록하고 관리할 수 있도록 돕는 CLI 도구입니다.

## 사전 요구사항

- [Bun](https://bun.sh) (v1.0.0 이상)
- `zsh` 셸 환경 (Oh My Zsh 완전 호환)

## 설치 방법

### Bun (전역 설치)

```bash
bun install -g lazyasf
```

### Homebrew (Bun 미사용 환경용)

```bash
brew tap justn-hyeok/lazyasf-term
brew install lazyasf
```

> Homebrew를 통한 설치는 실행 바이너리를 사용하므로 **Bun이 없어도 작동**합니다.

## 명령어

| 명령어        | 설명                            |
| ------------- | ------------------------------- |
| `lazyasf add` | 새로운 단축어 등록 (대화형 CLI) |
| `laf add`     | 동일 기능 (축약형 명령어)       |
| `--verbose`   | 상세 실행 로그 표시             |

> 모든 명령은 `laf` 또는 `lazyasf` 중 원하는 형태로 사용 가능합니다.

## 사용 예시

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

## 주요 기능

- 대화형 CLI 기반 단축어 등록
- `.zshrc` 자동 수정 및 `.zshrc.bak` 백업 저장
- 기존 alias 자동 덮어쓰기
- 입력값 유효성 검사
- 상세 로그 모드 (`--verbose` 지원)
- 축약 명령어 `laf` 지원

## 주의사항

- 단축어는 **영문자, 숫자, 언더스코어(\_)만 허용**됩니다.
- 기존 alias가 있는 경우 자동으로 덮어쓰기 처리됩니다.
- 반영을 위해 `source ~/.zshrc` 명령어 실행이 필요합니다.

## 개발 실행

```bash
# 의존성 설치
bun install

# 개발용 실행
bun run bin/lazyasf.ts add

# 전역 테스트용 링크
bun link
laf add
```

## 향후 추가 예정 기능 (TODO)

- [ ] `laf list` – 등록된 alias 목록 출력
- [ ] `laf remove <alias>` – 등록된 단축어 삭제
- [ ] `laf export` / `laf import` – 설정 백업 및 복원
- [ ] `laf test <alias>` – alias 실행 테스트
- [ ] `laf config` – 기본 설정 경로 및 옵션 관리
- [ ] `.bashrc`, `fish` 등 다양한 셸 지원

## 라이선스

MIT License © 2025 Hwang Junhyeok

## 만든 놈

저 혼자 만들었습니다.
훈수는 깃헙에 연결된 인스타로 해주세요.
쓴 소리 환영
