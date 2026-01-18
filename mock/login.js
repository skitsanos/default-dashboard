export default {
    'POST /api-local/auth/login': (req, res) =>
    {
        const {password} = req.body;

        if (password === 'demodemo')
        {
            res.status(200).json({
                result: {
                    session: {
                        token: 'demo-token',
                        user: {
                            _key: '123456',
                            email: req.body.username || 'demo@example.com',
                            name: 'Demo User',
                            createdOn: Date.now(),
                            lastLogin: Date.now()
                        }
                    }
                }
            });
        }
        else
        {
            res.status(401).json({
                message: 'Invalid password'
            });
        }
    }
};