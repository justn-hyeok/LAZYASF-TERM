import fs from 'fs';
import { PATHS, REGEX } from './constants';
import { AppError } from './errorHandler';

/**
 * .zshrc 파일에 새로운 alias를 추가하는 함수
 *
 * 처리 단계:
 * 1. 입력값 유효성 검사
 * 2. .zshrc 파일 읽기
 * 3. 기존 alias 존재 여부 확인
 * 4. 백업 파일 생성
 * 5. alias 추가 및 파일 저장
 *
 * @param alias - 추가할 alias 이름
 * @param command - alias에 매핑될 전체 명령어
 * @throws {AppError} 파일 처리 중 오류 발생 시
 */
export function addAlias(alias: string, command: string) {
  // 입력값 검증
  if (!alias || !command) {
    throw new AppError(
      'alias와 command는 비어 있을 수 없습니다.',
      'INVALID_INPUT'
    );
  }
  if (REGEX.ALIAS_VALIDATION.test(alias)) {
    throw new AppError(
      'alias는 영문자, 숫자, 언더스코어만 포함할 수 있습니다.',
      'INVALID_ALIAS'
    );
  }

  const newLine = `alias ${alias}='${command}'`;
  let zshrc: string;

  try {
    zshrc = fs.readFileSync(PATHS.ZSHRC, 'utf-8');
  } catch (error) {
    throw new AppError(
      '파일을 읽는 중 오류가 발생했습니다.',
      'FILE_READ_ERROR'
    );
  }

  const aliasRegex = new RegExp(
    REGEX.ALIAS_PATTERN.replace('{alias}', alias),
    'm'
  );
  const alreadyExists = aliasRegex.test(zshrc);

  if (alreadyExists) {
    console.log(`⚠️ 기존 alias '${alias}'가 존재합니다. 덮어씁니다.`);
    zshrc = zshrc.replace(aliasRegex, newLine);
  } else {
    zshrc += `\n${newLine}`;
  }

  // 백업 시도
  try {
    fs.copyFileSync(PATHS.ZSHRC, PATHS.BACKUP);
  } catch (error) {
    throw new AppError(
      '백업을 저장하는 중 오류가 발생했습니다.',
      'BACKUP_ERROR'
    );
  }

  // 파일 업데이트
  try {
    fs.writeFileSync(PATHS.ZSHRC, zshrc);
    console.log(`✅ alias '${alias}'가 성공적으로 저장되었습니다.`);
    console.log(`👉 'source ~/.zshrc' 실행해서 적용하세요.`);
  } catch (error) {
    throw new AppError(
      '파일을 저장하는 중 오류가 발생했습니다.',
      'FILE_WRITE_ERROR'
    );
  }
}
