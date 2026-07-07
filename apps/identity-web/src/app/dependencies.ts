import {
  GetCurrentUserUseCase,
  RequestPasswordResetUseCase,
  SignInUseCase,
  SignOutUseCase
} from '@sso/auth-application';
import { createSupabaseBrowserClient, SupabaseAuthRepository } from '@sso/auth-infrastructure';
import { getEnvironment } from '@sso/shared-config';

const environment = getEnvironment();
const supabaseClient = createSupabaseBrowserClient(environment);
const authRepository = new SupabaseAuthRepository(supabaseClient);

const signInUseCase = new SignInUseCase(authRepository);
const signOutUseCase = new SignOutUseCase(authRepository);
const getCurrentUserUseCase = new GetCurrentUserUseCase(authRepository);
const requestPasswordResetUseCase = new RequestPasswordResetUseCase(authRepository);

export const authDependencies = {
  signIn: signInUseCase.execute.bind(signInUseCase),
  signOut: signOutUseCase.execute.bind(signOutUseCase),
  getCurrentUser: getCurrentUserUseCase.execute.bind(getCurrentUserUseCase),
  requestPasswordReset: requestPasswordResetUseCase.execute.bind(requestPasswordResetUseCase),
  subscribeToAuthChanges: authRepository.subscribeToAuthChanges.bind(authRepository)
};
