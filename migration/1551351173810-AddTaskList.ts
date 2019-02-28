import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTaskList1551351173810 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL,
       "password" character varying(100) NOT NULL, "email" character varying(100) NOT NULL,
        CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "taskList" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL,
       "authorId" integer, CONSTRAINT "PK_27d740f0baf101d7f90ce404eca" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "task" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL,
      "date" TIMESTAMP NOT NULL, "taskListId" integer, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "taskList" ADD CONSTRAINT "FK_a351476ce66aae0158e143f4027" FOREIGN KEY ("authorId")
       REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_47fc40cc98de35bf7aaaaaeeac5" FOREIGN KEY ("taskListId")
       REFERENCES "taskList"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_47fc40cc98de35bf7aaaaaeeac5"`);
    await queryRunner.query(
      `ALTER TABLE "taskList" DROP CONSTRAINT "FK_a351476ce66aae0158e143f4027"`,
    );
    await queryRunner.query(`DROP TABLE "task"`);
    await queryRunner.query(`DROP TABLE "taskList"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
