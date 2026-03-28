import { pgTable, uuid, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey(), // References auth.users.id
  name: text("name").notNull(),
  avatar_url: text("avatar_url"),
  bio: text("bio"),
  updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const posts = pgTable("posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  categoryId: uuid("category_id").references(() => categories.id, { onDelete: 'set null' }),
  authorId: uuid("author_id").references(() => profiles.id, { onDelete: 'set null' }),
  isFeatured: boolean("is_featured").default(false),
  status: text("status").default('published'),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});
