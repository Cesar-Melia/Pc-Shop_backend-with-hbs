const indexGet = (req, res) => {
    return res.status(200).render("index", { user: req.user, isAdmin: req.isAdmin });
};

module.exports = { indexGet };
