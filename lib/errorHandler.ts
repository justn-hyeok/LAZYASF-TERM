/**
 * 애플리케이션 전용 에러 클래스
 * - message: 에러 메시지
 * - code: 에러 코드 (에러 타입 식별용)
 */
export class AppError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'AppError';
  }
}

/**
 * 전역 에러 처리 함수
 * - AppError: 커스텀 에러 클래스 인스턴스 처리
 * - Error: 일반 Error 인스턴스 처리
 * - unknown: 기타 알 수 없는 에러 처리
 * @param error - 처리할 에러 객체
 */
export function handleError(error: unknown): never {
  if (error instanceof AppError) {
    console.error(`❌ ${error.message}`);
  } else if (error instanceof Error) {
    console.error('❌ 예기치 못한 오류가 발생했습니다:', error.message);
  } else {
    console.error('❌ 알 수 없는 오류가 발생했습니다:', error);
  }
  process.exit(1);
}

/**
 * 전역 에러 핸들러 설정 함수
 * - uncaughtException: 처리되지 않은 예외 처리
 * - unhandledRejection: 처리되지 않은 Promise rejection 처리
 */
export function setupErrorHandlers() {
  process.on('uncaughtException', handleError);
  process.on('unhandledRejection', handleError);
}
