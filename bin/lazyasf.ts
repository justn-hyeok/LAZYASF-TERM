#!/usr/bin/env bun

import { CommandManager } from '../lib/cli/CommandManager';
import { ExitHandler } from '../lib/cli/ExitHandler';
import { setupErrorHandlers } from '../lib/errorHandler';

/**
 * CLI 프로그램의 진입점
 *
 * 주요 기능:
 * 1. 전역 에러 핸들러 설정
 * 2. 프로그램 종료 처리
 * 3. CLI 명령어 및 옵션 정의
 * 4. verbose 모드 로깅
 */

// 에러 핸들러 설정
setupErrorHandlers();

// 종료 핸들러 설정
ExitHandler.setup();

// CLI 프로그램 실행
const commandManager = new CommandManager();
commandManager.run();
