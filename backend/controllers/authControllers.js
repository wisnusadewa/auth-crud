const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModels');
const { secretKey } = require('../config/jwtConfig');

// REGISTER
exports.signup = async (req, res, next) => {
  try {
    // MENCARI USER PADA DATABASE
    const user = await User.findOne({ email: req.body.email });

    // JIKA USER SUDAH TERSEDIA
    if (user) {
      throw new Error('User sudah melakukan registrasi');
    }
    // HASHED PASS
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    // JIKA USER BELUM TERSEDIA MAKA CREATE
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    // JWT
    const token = jwt.sign({ _id: newUser._id }, secretKey);

    res.status(201).json({
      status: 'success',
      message: 'User Berhasil Registrasi',
      token,
      secretKey,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

// LOGIN //

exports.login = async (req, res, next) => {
  try {
    // MENGIRIMKAN KAN EMAIL DAN PASSWORD = REQUEST USER DI FE
    const { email, password } = req.body;

    // MENCARI EMAIL USER APAKAH SUDAH ADA DI DATABASE
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User tidak ditemukan!');
    }

    // MENGKOMPARE APAKAH PASSWORD YANG DIKIRIMKAN USER SAMA DENGAN PASSWORD PADA DATABASE
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new Error('Password Salah!');
    }

    // JWT
    const payload = {
      id: user._id,
      email: user.email,
    };
    const token = jwt.sign(payload, secretKey, {
      expiresIn: '1h',
    });

    res.status(201).json({
      status: 'berhasil',
      message: 'user berhasil login',
      token,
      secretKey,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

// PRODUCT

//

// const refreshToken = async (req, res) => {
//   try {
//     const { token } = req.body;

//     const decodedToken = await verifyToken(token);
//     const user = await User.findById(decodedToken._id);
//     if (!user) {
//       throw new Error('Invalid token');
//     }
//     const newToken = generateToken(user);
//     // return newToken;
//     res.json({ newToken: newToken });
//   } catch (error) {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// };

// module.exports = { refreshToken };
