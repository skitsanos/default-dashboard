export default {
    'POST /api/auth/login': (req, res) =>
    {
        const {password} = req.body;

        if (password === 'demodemo')
        {
            res.status(200).json({
                result: {
                    token: 'demo-token',
                    user: {
                        name: 'Demo User'
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