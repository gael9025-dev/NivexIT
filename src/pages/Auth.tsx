import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Chrome } from 'lucide-react';
import type { User, Session } from '@supabase/supabase-js';

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Redirect authenticated users to NDA page
        if (session?.user) {
          navigate('/nda');
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        navigate('/nda');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleGoogleSignIn = async () => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
        },
      });

      if (error) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo iniciar sesión con Google',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-border/50">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Portal NDA</h1>
          <p className="text-muted-foreground">Acceso exclusivo para usuarios autorizados</p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={handleGoogleSignIn}
            className="w-full h-12 text-lg"
            variant="outline"
          >
            <Chrome className="w-5 h-5 mr-2" />
            Iniciar sesión con Google
          </Button>
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Solo usuarios autorizados pueden acceder al portal NDA.</p>
          <p className="mt-2">Si necesitas acceso, contacta al administrador.</p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
