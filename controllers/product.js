const Product = require('../models/product');

/**
 * Method used for retrieve all the offers
 * @param req
 * @param res
 * @param next
 */
exports.getAll = (req, res, next) => {
    let cb;

    if(req.originalUrl.includes(process.env.API_PATH)) {
        cb = (err, products) => {

            if (err) {
                console.error(err);
                return res.status(400).json(err);
            }

            return res.status(200).json({products});
        };
    }
    else {
        cb = (err, products) => {

            if (err) {
                console.error(err);
                return res.redirect('/errors');
            }

            return res.render('index', {products});
        };
    }
    Product
        .find()
        .limit(5)
        .populate('creatorId')
        .exec((err, products) => {

            if(err) {
                console.error(err);
                return res.redirect('/errors');
            }

            return res.render('index', {products});
        });

};

/**
 * Method used for retrieve an offer by his id
 * @param req
 * @param res
 * @param next
 */
exports.getById = (req, res, next) => {

    if (req.path.includes('new') || req.path.includes('edit') ) {
        return next();
    }
    let cb;

    if(req.originalUrl.includes(process.env.API_PATH)) {
        cb = (err, product) => {

            if (err) {
                console.error(err);
                return res.status(400).json(err);
            }

            return res.status(200).json({product});
        };
    }
    else {
        cb = (err, product) => {

            if (err) {
                console.error(err);
                return res.redirect('/errors');
            }

            return res.render('offers/single', {product});
        };
    }
    Product
        .findById(req.params.id)
        .populate('creatorId')
        .exec((err, product) => {
            if(err) {
                console.error(err);
                return res.redirect('/errors');
            }

            return res.render('product', {product});
        });

};

/**
 * Method used for add a new offer or show the new page
 * @param req
 * @param res
 * @param next
 */
exports.new = (req, res, next) => {
    if(req.method === 'POST') {

        let cb;

        if(req.originalUrl.includes(process.env.API_PATH)) {
            cb = (err, users) => {

                if (err) {
                    console.error(err);
                    return res.status(400).json(err);
                }

                req.body.creatorId = users[0]._id;
                req.body.status = req.body.status !== undefined;
                new Product(req.body).save((err, product) => {

                    if (err) {
                        console.error(err);
                        return res.status(400).json(err);
                    }

                    return res.status(201).json({product});
                });
            };
        }
        else {
            cb = (err, users) => {

                if (err) {
                    console.error(err);
                    return res.redirect('/errors');
                }

                req.body.creatorId = users[0]._id;
                req.body.status = req.body.status !== undefined;
                new Product(req.body).save((err, product) => {

                    if (err) {
                        console.error(err);
                        return res.redirect('/errors');
                    }

                    return res.redirect('/products');
                });
            };
        }
        // Retrieve the user in DB for add his id to the offer
        const User = require('../models/user');
        User
            .find()
            .exec(cb)
        /*.exec((err, users) => {
            if(err) {
                console.error(err);
                return res.redirect('/errors');
            }
            req.body.creatorId = users[0]._id;
            req.body.status = req.body.status !== undefined;
            console.log('req send', req.body)
            new Product(req.body).save((err, product) => {
                console.log('req send status save', req.body.status)
                if(err) {
                    console.error(err);
                    return res.redirect('/errors');
                }
                return res.redirect('/index');
            });
        });*/
    }
    else {
        if(req.originalUrl.includes(process.env.API_PATH)) {
            return res.status(200).json({});
        }
        else {
            return res.render('new');
        }
        //return res.render('new');
    }
};

/**
 * Method used for update an offer or retrieve the offer to edit and display it
 * @param req
 * @param res
 * @param next
 */
exports.edit = (req, res, next) => {
    let cb;
    if(req.method === 'POST') {
        if(req.originalUrl.includes(process.env.API_PATH)) {
            cb = (err, product) => {
                if (err) {
                    console.error(err);
                    return res.status(400).json(err);
                }
                return res.status(200).json({product});
            }
        }
        else {
            cb = (err, product) => {
                if (err) {
                    console.error(err);
                    return res.redirect('/errors');
                }

                return res.redirect('/index');
            };
        }
        req.body.status = req.body.status !== undefined;
        Product
            .findByIdAndUpdate(req.params.id, req.body, {new: true})
            .exec(cb)
        /*  .exec((err, product) => {
                if(err) {
                    console.error(err);
                    return res.redirect('/errors');
                }
                return res.redirect('/index');
            });*/
    } else {
        if(req.originalUrl.includes(process.env.API_PATH)) {
            cb = (err, product) => {

                if (err) {
                    console.error(err);
                    return res.status(400).json(err);
                }

                return res.status(200).json({product});
            };
        }
        else {
            cb = (err, product) => {
                if (err) {
                    console.error(err);
                    return res.redirect('/errors');
                }

                return res.render('edit', {product});
            };
        }
        req.body.status = req.body.status !== undefined;
        Product
            .findById(req.params.id)
            .exec(cb)
        /*       .exec((err, product) => {

                if (err) {
                    console.error(err);
                    return res.redirect('/errors');
                }

                return res.render('edit', {product});
            });*/
    }
};


/**
 * Method used for update an offer or retrieve the offer to edit and display it
 * @param req
 * @param res
 * @param next
 */
exports.editStatus = (req, res, next) => {
    let cb;
    if(req.method === 'POST') {
        if(req.originalUrl.includes(process.env.API_PATH)) {
            cb = (err, product) => {
                if (err) {
                    console.error(err);
                    return res.status(400).json(err);
                }

                return res.status(200).json({product});
            }

        }
        else {

            cb = (err, product) => {

                if (err) {
                    console.error(err);
                    return res.redirect('/errors');
                }

                return res.redirect('/index');
            };
        }

        let status;
        switch (req.params.status){
            case 'true':
                status = false;
                break
            case 'false':
                status = true;
                break
            default:
                status = true
        }
        Product
            .updateOne({_id: req.params.id},{ $set: { status: status  }})
            .exec(cb)
        /*  .exec((err, product) => {
                if(err) {
                    console.error(err);
                    return res.redirect('/errors');
                }
                return res.redirect('/index');
            });*/
    } else {
        if(req.originalUrl.includes(process.env.API_PATH)) {
            cb = (err, product) => {

                if (err) {
                    console.error(err);
                    return res.status(400).json(err);
                }

                return res.status(200).json({product});
            };
        }
        else {
            cb = (err, product) => {
                if (err) {
                    console.error(err);
                    return res.redirect('/errors');
                }

                return res.render('index', {product});
            };
        }
        //req.body.status = req.body.status !== undefined;
        Product
            .findById(req.params.id)
            .exec(cb)
        /*       .exec((err, product) => {

                if (err) {
                    console.error(err);
                    return res.redirect('/errors');
                }

                return res.render('edit', {product});
            });*/
    }
};
/**
 * Method used for delete an offer by his id
 * @param req
 * @param res
 * @param next
 */
exports.deleteById = (req, res, next) => {
    let cb;

    if(req.originalUrl.includes(process.env.API_PATH)) {
        cb = (err, product) => {

            if (err) {
                console.error(err);
                return res.status(400).json(err);
            }

            return res.status(200).json({product});
        };
    }
    else {
        cb = (err, product) => {

            if (err) {
                console.error(err);
                return res.redirect('/errors');
            }

            return res.redirect('/index');
        };
    }

    Product
        .findByIdAndDelete(req.params.id)
        .exec(cb)
    /*.exec((err, offer) => {
            if (err) {
                console.error(err);
                return res.redirect('/errors');
            }
            return res.redirect('/products');
        });*/
};
