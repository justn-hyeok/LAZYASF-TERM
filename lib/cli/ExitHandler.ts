/**
 * 프로그램 종료 처리 클래스
 * - 종료 코드에 따른 메시지 출력
 * - 종료 이벤트 리스너 관리
 */
export class ExitHandler {
  /**
   * 종료 핸들러 설정
   */
  public static setup(): void {
    process.on('exit', this.handleExit);
  }

  /**
   * 종료 이벤트 처리
   */
  private static handleExit(code: number): void {
    if (code === 0) {
      console.log('✔️ 프로그램이 정상적으로 종료되었습니다.');
    } else {
      console.log('❌ 프로그램이 오류로 종료되었습니다.');
    }
  }
}
