-- Create RLS policy for INSERT on user_roles
-- Only admins can assign roles to users
CREATE POLICY "Only admins can assign roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));