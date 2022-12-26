const axios = require('axios');

exports.homeRoutes = (req, res) => {
    const token = req.body.token;
    axios.get("http://localhost:4000/items")
    .then(function (response) {
      console.log(token);
      res.render("index", { data: response.data, token: token });
    })
    .catch((err) => {
      res.send(err);
    });
}

exports.cartRoutes = (req, res) => {
    // Make a get request to /api/users
    axios.post('http://localhost:4000/cart')
        .then(function(response){
            res.render('cart', { data : response.data });
        })
        .catch(err =>{
            res.send(err);
        })

    
}

exports.loginRoutes = (req, res) => {
    res.render("login")
}

exports.signupRoutes = (req, res) => {
    res.render("signup")
}

exports.errorRoutes = (req, res) => {
    res.status(400).send('Invalid Request please Check URL');
}