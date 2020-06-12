import {MigrationInterface, QueryRunner} from 'typeorm';

export class dateExpiration1591392772778 implements MigrationInterface {
  name = 'dateExpiration1591392772778';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "dateExpiration" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "dateExpiration" SET NOT NULL`);
  }
}
