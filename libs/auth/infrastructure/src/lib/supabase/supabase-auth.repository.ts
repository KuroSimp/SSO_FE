import type { SupabaseClient } from '@supabase/supabase-js';
import type {
  AuthProvider,
  AuthRepository,
  AuthStateListener,
  AuthSubscription,
  AuthUser,
  SignInCredentials
} from '@sso/auth-domain';
import { SupabaseAuthErrorMapper } from './supabase-auth-error.mapper';
import { SupabaseAuthMapper } from './supabase-auth.mapper';

export class SupabaseAuthRepository implements AuthRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async signInWithPassword(credentials: SignInCredentials): Promise<AuthUser> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password
    });

    if (error || !data.user) {
      throw SupabaseAuthErrorMapper.toDomainError(error);
    }

    return SupabaseAuthMapper.toDomainUser(data.user);
  }

  async signInWithProvider(provider: AuthProvider): Promise<void> {
    const { error } = await this.supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });

    if (error) {
      throw SupabaseAuthErrorMapper.toDomainError(error);
    }
  }

  async signOut(): Promise<void> {
    const { error } = await this.supabase.auth.signOut();

    if (error) {
      throw SupabaseAuthErrorMapper.toDomainError(error);
    }
  }

  async getCurrentUser(): Promise<AuthUser | null> {
    const { data, error } = await this.supabase.auth.getUser();

    if (error) {
      return null;
    }

    return data.user ? SupabaseAuthMapper.toDomainUser(data.user) : null;
  }

  subscribeToAuthChanges(listener: AuthStateListener): AuthSubscription {
    const {
      data: { subscription }
    } = this.supabase.auth.onAuthStateChange((_event, session) => {
      listener({
        status: session?.user ? 'authenticated' : 'unauthenticated',
        user: session?.user ? SupabaseAuthMapper.toDomainUser(session.user) : null
      });
    });

    return {
      unsubscribe: () => subscription.unsubscribe()
    };
  }

  async requestPasswordReset(email: string): Promise<void> {
    const { error } = await this.supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`
    });

    if (error) {
      throw SupabaseAuthErrorMapper.toDomainError(error);
    }
  }
}
