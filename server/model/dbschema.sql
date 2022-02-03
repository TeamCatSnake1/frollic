CREATE TABLE "public.user" (
	"username" VARCHAR(255) NOT NULL UNIQUE,
	"password" VARCHAR(255) NOT NULL,
	"displayName" VARCHAR(255) NOT NULL,
	"defaultLocation" VARCHAR(255) NOT NULL,
	"sessionId" VARCHAR(255) NOT NULL,
	"sessionExpiration" integer NOT NULL,
	CONSTRAINT "user_pk" PRIMARY KEY ("username")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.user_accommodations" (
	"id" serial NOT NULL,
	"username" VARCHAR(255) NOT NULL,
	"accommodation" VARCHAR(255) NOT NULL,
	CONSTRAINT "user_accommodations_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.venue" (
	"venueId" VARCHAR(255) NOT NULL,
	"venueName" VARCHAR(255) NOT NULL,
	CONSTRAINT "venue_pk" PRIMARY KEY ("venueId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.accommodation" (
	"accommodation" VARCHAR(255) NOT NULL,
	"accommodationType" VARCHAR(255) NOT NULL,
	CONSTRAINT "accommodation_pk" PRIMARY KEY ("accommodation")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.venue_accommodation" (
	"id" serial NOT NULL,
	"accommodation" VARCHAR(255) NOT NULL,
	"venueId" VARCHAR(255) NOT NULL,
	CONSTRAINT "venue_accommodation_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "user_accommodations" ADD CONSTRAINT "user_accommodations_fk0" FOREIGN KEY ("username") REFERENCES "user"("username");
ALTER TABLE "user_accommodations" ADD CONSTRAINT "user_accommodations_fk1" FOREIGN KEY ("accommodation") REFERENCES "accommodation"("accommodation");



ALTER TABLE "venue_accommodation" ADD CONSTRAINT "venue_accommodation_fk0" FOREIGN KEY ("accommodation") REFERENCES "accommodation"("accommodation");
ALTER TABLE "venue_accommodation" ADD CONSTRAINT "venue_accommodation_fk1" FOREIGN KEY ("venueId") REFERENCES "venue"("venueId");





