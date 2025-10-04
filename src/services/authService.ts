// Mock auth service for demo purposes
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// Mock current user - in a real app this would come from your auth system
const mockUser: User = {
  id: '1',
  name: 'Marco Rossi',
  email: 'marco.rossi@example.com',
  avatar: undefined
};

export const getCurrentUser = (): User => {
  return mockUser;
};

export const isAuthenticated = (): boolean => {
  return true; // Mock implementation
};

export const login = async (email: string, password: string): Promise<User> => {
  // Mock login implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUser);
    }, 1000);
  });
};

export const logout = (): void => {
  // Mock logout implementation
  console.log('User logged out');
};

