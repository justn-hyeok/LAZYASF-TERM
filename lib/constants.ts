import path from 'path';
import os from 'os';

/**
 * 파일 시스템 관련 경로 상수
 * - ZSHRC: 사용자의 .zshrc 파일 경로
 * - BACKUP: .zshrc 파일 백업 경로
 */
export const PATHS = {
  ZSHRC: path.join(os.homedir(), '.zshrc'),
  BACKUP: path.join(os.homedir(), '.zshrc.bak'),
};

/**
 * 정규식 패턴 상수
 * - ALIAS_PATTERN: alias 정의를 찾기 위한 패턴
 * - ALIAS_VALIDATION: alias 이름 유효성 검사를 위한 패턴
 */
export const REGEX = {
  ALIAS_PATTERN: '^alias\\s+{alias}=.*$',
  ALIAS_VALIDATION: /[^a-zA-Z0-9_가-힣.]/, // 한글 유니코드 범위 (가-힣) 추가
};

/**
 * CLI 프롬프트 메시지 상수
 * - FULL_CMD: 전체 명령어 입력 프롬프트
 * - SHORT_ALIAS: 단축어 입력 프롬프트
 * - CONFIRM: 작업 확인 프롬프트
 */
export const PROMPTS = {
  FULL_CMD: '줄이고 싶은 명령어를 입력하세요 (예: git init):',
  SHORT_ALIAS: '어떤 단축어(alias)로 만들까요?: (예: gii)',
  CONFIRM: '이 단축어(alias)를 추가할까요?',
};

/**
 * CLI 프로그램 옵션 인터페이스
 * - verbose: 상세 로그 출력 여부
 */
export interface ProgramOptions {
  verbose?: boolean;
}

/**
 * Inquirer 프롬프트 응답 인터페이스
 * - fullCmd: 사용자가 입력한 전체 명령어
 * - shortAlias: 사용자가 입력한 단축어
 * - confirm: 작업 실행 여부 확인
 */
export interface InquirerResponses {
  fullCmd: string;
  shortAlias: string;
  confirm: boolean;
}
