import {MigrationInterface, QueryRunner} from 'typeorm';

export class PgBoss1561473310963 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    // version 10;
    await queryRunner.query(`

    CREATE SCHEMA IF NOT EXISTS public
  ;


    CREATE EXTENSION IF NOT EXISTS pgcrypto
  ;


    CREATE TABLE public.version (
      version text primary key
    )
  ;


    CREATE TYPE public.job_state AS ENUM (
      'created',
      'retry',
      'active',
      'completed',
      'expired',
      'cancelled',
      'failed'
    )
  ;


    CREATE TABLE public.job (
      id uuid primary key not null default gen_random_uuid(),
      name text not null,
      priority integer not null default(0),
      data jsonb,
      state public.job_state not null default('created'),
      retryLimit integer not null default(0),
      retryCount integer not null default(0),
      retryDelay integer not null default(0),
      retryBackoff boolean not null default false,
      startAfter timestamp with time zone not null default now(),
      startedOn timestamp with time zone,
      singletonKey text,
      singletonOn timestamp without time zone,
      expireIn interval not null default interval '15 minutes',
      createdOn timestamp with time zone not null default now(),
      completedOn timestamp with time zone
    )
  ;

CREATE TABLE public.archive (LIKE public.job);

CREATE INDEX archive_id_idx ON public.archive(id);

ALTER TABLE public.archive ADD archivedOn timestamptz NOT NULL DEFAULT now();


    CREATE INDEX job_name ON public.job (name text_pattern_ops)
  ;


    CREATE UNIQUE INDEX job_singletonOn ON public.job (name, singletonOn) WHERE state < 'expired' AND singletonKey IS NULL
  ;


    CREATE UNIQUE INDEX job_singletonKeyOn ON public.job (name, singletonOn, singletonKey) WHERE state < 'expired'
  ;


    CREATE UNIQUE INDEX job_singletonKey ON public.job (name, singletonKey) WHERE state < 'completed' AND singletonOn IS NULL
  ;


    INSERT INTO public.version(version) VALUES ('10')
  ;

        `);
  }

  public async down(): Promise<any> {}
}
