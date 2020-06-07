import {MigrationInterface, QueryRunner} from "typeorm";

export class tasks1591391194501 implements MigrationInterface {
    name = 'tasks1591391194501'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "isActiveTask" SET DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "isActiveTask" DROP DEFAULT`);
    }

}
