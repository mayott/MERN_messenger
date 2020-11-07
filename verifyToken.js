const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const token = req.header('auth-token')
    if (!token) return res.status(401).json({ message: 'Доступ запрещен' })
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SERCRET_KEY)
        req.user = verified
    } catch (err) {
        res.status(400).json({ message: 'Проблемы с токеном' })
    }
    next()
}




//Код из интернета проверка рефреш токена базовый пример

// const jwt = require('jsonwebtoken');

// const secret = process.env.TOKEN_SECRET || 'some other secret as default';
// const tokenLife = +process.env.TOKEN_LIFE || 3600;

// module.exports = (req, res) => {
//   const { refreshToken } = req.body;

//   jwt.verify(refreshToken, secret, (err, decoded) => {
//     if (err) {
//       return res.status(401).send('Unauthorised');
//     }
//     if (decoded) {
//       const payload = {
//         id: decoded.id,
//         email: decoded.email,
//       };
//       jwt.sign(payload, secret, { expiresIn: tokenLife }, (Error, token) => {
//         if (Error) {
//           return res.status(401).send('Unauthorised');
//         }
//         res.send({
//           success: true,
//           accessToken: `Bearer ${token}`,
//         });
//       });
//     }
//   });
// };