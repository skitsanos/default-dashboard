const Chance = require('chance');
const chance = new Chance();

// Mock user database
const mockUsers = [
    {
        username: 'admin',
        password: 'admin123',
        email: 'admin@example.com',
        _key: '177651341',
        gravatar: `https://www.gravatar.com/avatar/${chance.hash({length: 32})}?d=robohash&s=150`
    },
    {
        username: 'demo',
        password: 'demo123',
        email: 'demo@example.com',
        _key: '177651342',
        gravatar: `https://www.gravatar.com/avatar/${chance.hash({length: 32})}?d=retro&s=150`
    },
    {
        username: 'user',
        password: 'user123',
        email: 'user@example.com',
        _key: '177651343',
        gravatar: `https://www.gravatar.com/avatar/${chance.hash({length: 32})}?d=identicon&s=150`
    }
];

// Generate a mock JWT token
const generateMockToken = (userId) => {
    const header = btoa(JSON.stringify({typ: 'JWT', alg: 'HS512'}));
    const payload = btoa(JSON.stringify({
        userId,
        expiresOn: Date.now() + (24 * 60 * 60 * 1000), // 24 hours from now
        iat: Date.now()
    }));
    const signature = chance.hash({length: 64});
    return `${header}.${payload}.${signature}`;
};

export default {
    'POST /api/auth/login': (req, res) =>
    {
        const {username, password} = req.body;

        // Simulate network delay
        setTimeout(() => {
            // Find user by username
            const user = mockUsers.find(u => u.username === username);

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid username or password'
                });
            }

            // Check password
            if (user.password !== password) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid username or password'
                });
            }

            // Successful login
            const now = Date.now();
            res.status(200).json({
                success: true,
                result: {
                    session: {
                        user: {
                            _key: user._key,
                            email: user.email,
                            createdOn: now - (30 * 24 * 60 * 60 * 1000), // 30 days ago
                            lastLogin: now,
                            updatedOn: now,
                            gravatar: user.gravatar
                        },
                        token: generateMockToken(user._key),
                        createdOn: now
                    }
                }
            });
        }, 800); // 800ms delay to simulate network
    },

    'POST /api/auth/logout': (req, res) =>
    {
        // Simple logout endpoint
        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    },

    'GET /api/auth/me': (req, res) =>
    {
        // Check if user is authenticated
        const authHeader = req.headers['authorization'];
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            });
        }

        // Mock: return first user as current user
        const user = mockUsers[0];
        res.status(200).json({
            success: true,
            result: {
                _key: user._key,
                email: user.email,
                username: user.username,
                gravatar: user.gravatar
            }
        });
    }
};