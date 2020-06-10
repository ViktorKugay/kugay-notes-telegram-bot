import {MigrationInterface, QueryRunner} from "typeorm";

export class taskDate1591532750300 implements MigrationInterface {
    name = 'taskDate1591532750300'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "dateExpiration"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "date" date`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "time" TIME`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "time"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "dateExpiration" character varying`);
    }

}
