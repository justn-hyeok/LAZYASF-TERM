import { Command } from 'commander';
import type { ProgramOptions } from '../constants';
import { runAddFlow } from '../cliFlow';

/**
 * CLI 명령어 관리자 클래스
 * - 명령어 등록 및 실행 관리
 * - 옵션 처리
 */
export class CommandManager {
  private program: Command;

  constructor() {
    this.program = new Command();
    this.setupCommands();
    this.setupOptions();
  }

  /**
   * CLI 명령어 설정
   */
  private setupCommands(): void {
    this.program
      .command('add')
      .description('단축어 추가')
      .action(async () => {
        try {
          await runAddFlow();
        } catch (err) {
          console.error('❗ runAddFlow 실행 중 에러:', err);
          process.exit(1);
        }
      });
  }

  /**
   * CLI 옵션 설정
   */
  private setupOptions(): void {
    this.program.option('-v, --verbose', '자세한 로그를 출력합니다.');
  }

  /**
   * CLI 프로그램 실행
   */
  public run(): void {
    this.program.parse(process.argv);
    const options = this.program.opts() as ProgramOptions;
    this.handleOptions(options);
  }

  /**
   * 옵션 처리
   */
  private handleOptions(options: ProgramOptions): void {
    if (options.verbose) {
      console.log('📝 상세 로그 모드: 활성화');
    }
  }
}
