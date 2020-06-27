import {MigrationInterface, QueryRunner} from "typeorm";

export class default1592663919421 implements MigrationInterface {
    name = 'default1592663919421'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "isResolved" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "isResolved" SET DEFAULT true`);
    }

}
