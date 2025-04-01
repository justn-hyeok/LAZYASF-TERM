import inquirer from 'inquirer';
import { addAlias } from './zshrcEditor';
import { PROMPTS, REGEX } from './constants';
import type { InquirerResponses } from './constants';
import { AppError } from './errorHandler';

/**
 * CLI 인터랙션을 처리하는 메인 함수
 *
 * 처리 단계:
 * 1. 사용자로부터 전체 명령어 입력 받기
 * 2. 사용자로부터 단축어 입력 받기
 * 3. 작업 실행 여부 확인
 * 4. alias 추가 실행
 *
 * @throws {AppError} 입력값 검증 실패 또는 예상치 못한 오류 발생 시
 */
export async function runAddFlow(): Promise<void> {
  try {
    const responses = await promptUser();
    await handleUserResponses(responses);
  } catch (error) {
    handleError(error);
  }
}

/**
 * 사용자 입력 프롬프트 처리
 */
async function promptUser(): Promise<InquirerResponses> {
  return inquirer.prompt([
    {
      name: 'fullCmd',
      type: 'input',
      message: PROMPTS.FULL_CMD,
      validate: validateFullCommand,
    },
    {
      name: 'shortAlias',
      type: 'input',
      message: PROMPTS.SHORT_ALIAS,
      validate: validateShortAlias,
    },
    {
      name: 'confirm',
      type: 'confirm',
      message: (answers) =>
        `${PROMPTS.CONFIRM} (${answers.shortAlias}=${answers.fullCmd})`,
      default: true,
    },
  ]);
}

/**
 * 전체 명령어 유효성 검사
 */
function validateFullCommand(input: string): boolean | string {
  if (!input.trim()) return '명령어를 입력해야 합니다.';
  return true;
}

/**
 * 단축어 유효성 검사
 */
function validateShortAlias(input: string): boolean | string {
  if (!input.trim()) return '단축어를 입력해야 합니다.';

  // 정규표현식 로직 수정 - 유효하지 않은 문자가 있을 때 에러 메시지 반환
  if (!REGEX.ALIAS_VALIDATION.test(input)) {
    return '단축어는 알파벳, 숫자, 언더스코어만 사용할 수 있습니다.';
  }

  return true;
}

/**
 * 사용자 응답 처리
 */
async function handleUserResponses(
  responses: InquirerResponses
): Promise<void> {
  if (responses.confirm) {
    try {
      await addAlias(responses.shortAlias, responses.fullCmd);
      console.log(
        `✅ '${responses.shortAlias}' 단축어가 성공적으로 추가되었습니다.`
      );
    } catch (error) {
      throw new AppError(
        `단축어 추가 실패: ${
          error instanceof Error ? error.message : String(error)
        }`,
        'ALIAS_ADD_ERROR'
      );
    }
  } else {
    console.log('❌ 작업이 취소되었습니다.');
  }
  // TODO: alias list, remove 기능 추가
}

/**
 * 에러 처리
 */
function handleError(error: unknown): void {
  // TODO: 에러 로깅 및 리포팅 기능 추가
  if (error instanceof AppError) {
    console.error(`오류: ${error.message}`);
    process.exit(1);
  } else {
    console.error(
      '예상치 못한 오류가 발생했습니다:',
      error instanceof Error ? error.message : String(error)
    );
    process.exit(1);
  }
}
