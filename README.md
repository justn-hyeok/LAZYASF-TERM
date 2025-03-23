# LazyASF - 터미널 명령어 단축어 관리자

터미널에서 자주 사용하는 긴 명령어들을 짧은 단축어(alias)로 만들어 사용할 수 있게 해주는 CLI 도구입니다.

## 사전 요구사항

- [Bun](https://bun.sh) 설치 (v1.0.0 이상)
- zsh 셸 사용

## 설치 방법

### 전역 설치

```bash
bun install -g lazyasf
```

### 로컬 설치

````bash
# 프로젝트 클론
git clone https://github.com/yourusername/lazyasf.git
cd lazyasf

# 의존성 설치
bun install

# 전역으로 링크
bun link
```ㅠㅕ

## 사용법

### 기본 사용법

```bash
lazyasf add
````

이 명령어를 실행하면 다음과 같은 대화형 프롬프트가 시작됩니다:

1. 줄이고 싶은 명령어 입력 (예: `git init`)
2. 사용할 단축어 입력 (예: `gii`)
3. 작업 확인

### 상세 로그 모드

```bash
lazyasf add --verbose
```

`-v` 또는 `--verbose` 옵션을 사용하면 자세한 로그를 확인할 수 있습니다.

## 기능

- 🚀 대화형 CLI 인터페이스
- 🔍 자동 백업 (.zshrc.bak)
- ✅ 입력값 유효성 검사
- 🔄 기존 alias 자동 덮어쓰기
- 📝 상세 로그 모드

## 예시

```bash
# git init 명령어를 gii로 단축하기
$ lazyasf add
? 줄이고 싶은 명령어를 입력하세요 (예: git init): git init
? 어떤 단축어(alias)로 만들까요?: (예: gii) gii
? 이 단축어(alias)를 추가할까요? Yes
✅ alias 'gii'가 성공적으로 저장되었습니다.
👉 'source ~/.zshrc' 실행해서 적용하세요.

# 이제 gii 명령어로 git init을 실행할 수 있습니다
$ gii
```

## 주의사항

- 단축어는 영문자, 숫자, 언더스코어만 사용 가능합니다.
- 기존에 동일한 단축어가 있다면 자동으로 덮어씁니다.
- 변경사항을 적용하려면 `source ~/.zshrc` 명령어를 실행해야 합니다.

## 개발

```bash
# 의존성 설치
bun install

# 개발 모드로 실행
bun run bin/lazyasf.ts add
```

## 라이선스

MIT License
