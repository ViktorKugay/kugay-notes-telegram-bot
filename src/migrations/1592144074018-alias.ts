import {MigrationInterface, QueryRunner} from 'typeorm';

export class alias1592144074018 implements MigrationInterface {
  name = 'alias1592144074018';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "aliases" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "alias" character varying, "scene" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_491dee804efb858cdf15a44371d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "aliases" ADD CONSTRAINT "FK_3b8c750a6494056fc51cd856466" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "aliases" DROP CONSTRAINT "FK_3b8c750a6494056fc51cd856466"`);
    await queryRunner.query(`DROP TABLE "aliases"`);
  }
}
