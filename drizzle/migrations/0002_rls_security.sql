-- Task: Enable RLS and define policies for categories and posts

-- [CATEGORIES]
ALTER TABLE "categories" ENABLE ROW LEVEL SECURITY;

-- Allow anyone (anon and authenticated) to read categories
-- This is needed for the Flutter app to show categories without login
CREATE POLICY "Categories are viewable by everyone" 
ON "categories" 
FOR SELECT 
USING (true);

-- Allow only authenticated admins to perform write operations
-- We verify the user via the auth.uid() linking to our public.users table
CREATE POLICY "Admins can manage categories" 
ON "categories" 
FOR ALL 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM "users" 
    WHERE "users"."id" = auth.uid() 
    AND "users"."role" = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM "users" 
    WHERE "users"."id" = auth.uid() 
    AND "users"."role" = 'admin'
  )
);

-- [POSTS]
ALTER TABLE "posts" ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read published posts
CREATE POLICY "Published posts are viewable by everyone" 
ON "posts" 
FOR SELECT 
USING (status = 'published');

-- Allow authenticated admins to manage all posts
CREATE POLICY "Admins can manage posts" 
ON "posts" 
FOR ALL 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM "users" 
    WHERE "users"."id" = auth.uid() 
    AND "users"."role" = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM "users" 
    WHERE "users"."id" = auth.uid() 
    AND "users"."role" = 'admin'
  )
);

-- [USERS & PROFILES]
-- We enable RLS but don't add public policies to keep user data private by default
ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "profiles" ENABLE ROW LEVEL SECURITY;

-- Allow users to see their own profile
CREATE POLICY "Users can view own profile" 
ON "profiles" 
FOR SELECT 
TO authenticated 
USING (auth.uid() = id);

-- Allow admins to see all profiles
CREATE POLICY "Admins can view all profiles" 
ON "profiles" 
FOR SELECT 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM "users" 
    WHERE "users"."id" = auth.uid() 
    AND "users"."role" = 'admin'
  )
);
