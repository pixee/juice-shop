async function index(req, res) {
    const knex = req.app.get('knex');

    let loggedInUser = await knex('users')
        .whereRaw(`user = '${req.query.user}' and pass = '${req.query.pass}'`); // Noncompliant

    res.send(JSON.stringify(loggedInUser));
    res.end();
}