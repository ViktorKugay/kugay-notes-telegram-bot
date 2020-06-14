import {MigrationInterface, QueryRunner} from "typeorm";

export class userAlias1592145787037 implements MigrationInterface {
    name = 'userAlias1592145787037'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aliases" ADD CONSTRAINT "user_alias" UNIQUE ("userId", "scene")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aliases" DROP CONSTRAINT "user_alias"`);
    }

}
