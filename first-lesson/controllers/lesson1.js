const homeRoute = (req, res) => {
    res.send('Levi Savage');
};

const tillRoute = (req, res) => {
    res.send('Till Lindemann');
};

module.exports = {
    homeRoute,
    tillRoute
};