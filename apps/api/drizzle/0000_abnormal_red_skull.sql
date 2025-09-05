CREATE TABLE "workers" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "workers_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"skills" text[] NOT NULL,
	"hourly_rate" numeric(10, 2),
	"is_available" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "workers_email_unique" UNIQUE("email")
);
