import {MigrationInterface, QueryRunner} from "typeorm";

export class resolved1592663583348 implements MigrationInterface {
    name = 'resolved1592663583348'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" RENAME COLUMN "isActiveTask" TO "isResolved"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" RENAME COLUMN "isResolved" TO "isActiveTask"`);
    }

}
