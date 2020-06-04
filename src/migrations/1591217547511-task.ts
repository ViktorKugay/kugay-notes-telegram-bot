import {MigrationInterface, QueryRunner} from 'typeorm';

export class task1591217547511 implements MigrationInterface {
  name = 'task1591217547511';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tasks" ADD "content" character varying NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "content"`);
  }
}
