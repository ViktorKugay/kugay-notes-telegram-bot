import {MigrationInterface, QueryRunner} from 'typeorm';

export class uuid1591218223891 implements MigrationInterface {
  name = 'uuid1591218223891';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772"`);
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "tasks" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
    await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772"`);
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "tasks" ADD "id" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id")`);
  }
}
