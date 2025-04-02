import fs from 'fs';
import { PATHS, REGEX } from './constants';
import { AppError } from './errorHandler';

/**
 * 파일 읽기 유틸리티 함수
 */
function readFile(filePath: string): string {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    throw new AppError(`파일 읽기 실패: ${filePath}`, 'FILE_READ_ERROR');
  }
}

/**
 * 파일 쓰기 유틸리티 함수
 */
function writeFile(filePath: string, content: string): void {
  try {
    fs.writeFileSync(filePath, content);
  } catch (error) {
    throw new AppError(`파일 쓰기 실패: ${filePath}`, 'FILE_WRITE_ERROR');
  }
}

/**
 * 백업 생성 유틸리티 함수
 */
function createBackup(): void {
  try {
    fs.copyFileSync(PATHS.ZSHRC, PATHS.BACKUP);
  } catch (error) {
    throw new AppError('백업 생성 실패', 'BACKUP_ERROR');
  }
}

/**
 * .zshrc 파일에 새로운 alias를 추가하는 함수
 */
export function addAlias(alias: string, command: string): void {
  if (!alias || !command) {
    throw new AppError(
      'alias와 command는 비어 있을 수 없습니다.',
      'INVALID_INPUT'
    );
  }

  if (!REGEX.ALIAS_VALIDATION.test(alias)) {
    throw new AppError(
      'alias는 영문자, 숫자, 언더스코어, 한글, 마침표만 포함할 수 있습니다.',
      'INVALID_ALIAS'
    );
  }

  const newLine = `alias ${alias}='${command}'`;
  let zshrc = readFile(PATHS.ZSHRC);

  const aliasRegex = new RegExp(
    REGEX.ALIAS_PATTERN.replace(
      '{alias}',
      alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    ),
    'm'
  );

  if (aliasRegex.test(zshrc)) {
    console.log(`기존 alias '${alias}'가 존재합니다. 덮어씁니다.`);
    zshrc = zshrc.replace(aliasRegex, newLine);
  } else {
    zshrc += `\n${newLine}`;
  }

  createBackup();
  writeFile(PATHS.ZSHRC, zshrc);

  console.log(`alias '${alias}'가 성공적으로 저장되었습니다!`);
  console.log(`'source ~/.zshrc'를 실행해서 적용하세요.`);
}

/**
 * .zshrc 파일에서 alias를 제거하는 함수
 */
export function removeAlias(alias: string): void {
  const aliasRegex = new RegExp(`^alias\\s+${alias}=.*$`, 'm');
  let zshrc = readFile(PATHS.ZSHRC);

  if (!aliasRegex.test(zshrc)) {
    console.log(`alias '${alias}'가 존재하지 않습니다.`);
    return;
  }

  createBackup();
  zshrc = zshrc.replace(aliasRegex, '');
  writeFile(PATHS.ZSHRC, zshrc);

  console.log(`alias '${alias}'가 성공적으로 삭제되었습니다!`);
  console.log(`'source ~/.zshrc'를 실행해서 적용하세요.`);
}

/**
 * .zshrc 파일에서 모든 alias를 추출하여 목록으로 표시하는 함수
 */
export function listAliases(): string[] {
  const zshrc = readFile(PATHS.ZSHRC);
  const aliasPattern = /^alias\s+([^=]+)=['"]?(.*?)['"]?$/gm;
  const aliases: string[] = [];
  let match;

  while ((match = aliasPattern.exec(zshrc)) !== null) {
    const aliasName = match[1].trim();
    const command = match[2].trim();
    aliases.push(`${aliasName} => ${command}`);
  }

  if (aliases.length === 0) {
    console.log('등록된 alias가 없습니다.');
  } else {
    console.log('등록된 alias 목록:');
    aliases.forEach((alias, index) => {
      console.log(`${index + 1}. ${alias}`);
    });
  }

  return aliases;
}
