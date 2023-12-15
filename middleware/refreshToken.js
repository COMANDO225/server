// create refresh token
const createRefreshToken = (user) => {
	return jwt.sign({ id: user._id }, config.refreshSecret, {
		expiresIn: 60 * 60 * 24 * 7,
	});
};
